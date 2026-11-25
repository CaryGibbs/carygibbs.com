"""Renders real Lobe Limpet pages with invented demo data, for press screenshots.
Firebase is replaced by in-memory stand-ins; nothing touches the live database.
Usage: python3 shoot.py <scenario> [<scenario> ...]"""
import asyncio, json, os, sys, glob
from playwright.async_api import async_playwright

HUB = 'http://localhost:8766'
HERE = os.path.dirname(os.path.abspath(__file__))
DEMO = open(f'{HERE}/demo.json').read()
STUB = {'firebase-firestore.js': open(f'{HERE}/stubs/firestore.js').read(),
        'firebase-auth.js': open(f'{HERE}/stubs/auth.js').read(),
        'firebase-app.js': open(f'{HERE}/stubs/other.js').read(),
        'firebase-storage.js': open(f'{HERE}/stubs/other.js').read()}
FONTS_CSS = open(f'{HERE}/fonts.css').read()
OUT = f'{HERE}/out'; os.makedirs(OUT, exist_ok=True)
# Plus marking (the quiz_marked shot gives Sam Plus): marks out of the question's 4, points got and missed, how to get full marks
MARK = {"score": 3, "outOf": 4,
        "feedback": "Good answer! You name two hazards Haiti faces and explain clearly how repeated disasters stop it recovering.",
        "covered": ["Haiti faces more than one hazard (earthquakes and hurricanes)", "Repeated disasters cause cumulative damage", "Recovery from one disaster is interrupted by the next"],
        "missed": ["Limited money and resources are spread across every hazard"],
        "toFull": "Add that Haiti's limited money and resources are stretched across every hazard, so it can't prepare well for any of them. That gets you 4/4."}

async def route(r):
    url = r.request.url
    if 'gstatic.com/firebasejs' in url:
        return await r.fulfill(status=200, content_type='application/javascript', body=STUB[url.split('/')[-1].split('?')[0]])
    if 'fonts.googleapis.com' in url:
        return await r.fulfill(status=200, content_type='text/css', body=FONTS_CSS)
    if 'fonts.gstatic.com/__local/' in url:
        name = url.split('/')[-1]
        path = glob.glob(f'{HERE}/fonts/node_modules/@fontsource/*/files/{name}')[0]
        return await r.fulfill(status=200, content_type='font/woff2', body=open(path, 'rb').read())
    if 'workers.dev' in url:
        body = r.request.post_data or ''
        if '"messages"' in body:
            return await r.fulfill(status=200, content_type='application/json', headers={'Access-Control-Allow-Origin': '*'},
                body=json.dumps({'model': 'claude-haiku-5-5', 'stop_reason': 'end_turn', 'content': [{'type': 'text', 'text': json.dumps(MARK)}]}))
        return await r.fulfill(status=200, content_type='application/json', headers={'Access-Control-Allow-Origin': '*'}, body='{"ok":true}')
    if 'dev-flag.js' in url:
        return await r.fulfill(status=200, content_type='application/javascript', body='')
    if url.startswith(HUB) or url.startswith('data:') or url.startswith('blob:'):
        return await r.continue_()
    return await r.fulfill(status=204, body='')

async def page_for(b, uid, w, h, mobile=False):
    ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2, is_mobile=mobile, has_touch=mobile)
    await ctx.add_init_script(f"window.__DEMO = {DEMO}; window.__DEMO_UID = {json.dumps(uid)};"
                              "try{localStorage.setItem('ll_lobey','all');localStorage.setItem('ll_install_dismissed', String(Date.now()));}catch(e){}")
    await ctx.route('**/*', route)
    pg = await ctx.new_page()
    pg.on('pageerror', lambda e: print('  pageerror:', str(e)[:200]))
    return ctx, pg

async def settle(pg, ms=1800):
    await pg.wait_for_timeout(ms)
    await pg.evaluate("document.querySelectorAll('#toast-container > *, .toast').forEach(e => e.remove())")

SCEN = {}
def scenario(f): SCEN[f.__name__] = f; return f

@scenario
async def parent_progress(b):
    ctx, pg = await page_for(b, 'demo-parent', 1280, 860)
    await pg.goto(f'{HUB}/parent.html'); await settle(pg)
    await pg.evaluate("window._openProgressModal && window._openProgressModal('demo-sam')"); await settle(pg, 1500)
    await pg.screenshot(path=f'{OUT}/parent-progress.png')
    for sec in ['time', 'subjects', 'badges']:
        el = await pg.query_selector(f'#progress-stats-root #{sec}')
        if el:
            await el.scroll_into_view_if_needed(); await pg.wait_for_timeout(600)
            await el.screenshot(path=f'{OUT}/parent-progress-{sec}.png')
        else: print('  no section', sec)
    await ctx.close()

@scenario
async def parent_home(b):
    ctx, pg = await page_for(b, 'demo-parent', 1280, 860)
    await pg.goto(f'{HUB}/parent.html'); await settle(pg, 2500)
    await pg.screenshot(path=f'{OUT}/parent-home.png'); await ctx.close()

@scenario
async def hub(b):
    ctx, pg = await page_for(b, 'demo-sam', 430, 932, mobile=True)
    await pg.goto(f'{HUB}/hub.html'); await settle(pg, 2500)
    await pg.screenshot(path=f'{OUT}/student-hub.png'); await ctx.close()

@scenario
async def quiz_written(b):
    ctx, pg = await page_for(b, 'demo-sam', 430, 932, mobile=True)
    geo = 'demo-y10'
    await pg.goto(f'{HUB}/quiz.html?groupId={geo}&subjectId=demo-geo-s&topicId=demo-geo-t0&types=short'); await settle(pg, 2500)
    await pg.screenshot(path=f'{OUT}/quiz-start.png'); await ctx.close()

@scenario
async def quiz_marked(b):
    ctx, pg = await page_for(b, 'demo-sam', 430, 932, mobile=True)
    await ctx.add_init_script("window.__DEMO['users/demo-sam'].tier = 'plus';")   # examiner-style marking is Plus
    geo = 'demo-y10'
    await pg.goto(f'{HUB}/quiz.html?groupId={geo}&subjectId=demo-geo-s&topicId=demo-geo-t0'); await settle(pg, 2500)
    await pg.evaluate("['mcq','tf'].forEach(t => toggleType(t)); toggleType('short')"); await pg.wait_for_timeout(300)
    await pg.evaluate("startQuiz()"); await settle(pg, 1500)
    for _ in range(30):   # questions are shuffled: go again until the Haiti question comes first
        if 'Haiti' in (await pg.inner_text('#q-text')): break
        await pg.evaluate("toggleType && 0"); await pg.goto(pg.url); await settle(pg, 2000)
        await pg.evaluate("['mcq','tf'].forEach(t => toggleType(t)); toggleType('short')"); await pg.wait_for_timeout(300)
        await pg.evaluate("startQuiz()"); await settle(pg, 1200)
    await pg.fill('#short-input', "Haiti gets earthquakes and hurricanes, and each disaster damages buildings and roads before it has recovered from the last one, so it never fully rebuilds.")
    await pg.screenshot(path=f'{OUT}/quiz-written-typed.png')
    await pg.evaluate("submitAnswer()"); await settle(pg, 2500)
    await pg.screenshot(path=f'{OUT}/quiz-written-marked.png', full_page=True); await ctx.close()

@scenario
async def hub_more(b):
    ctx, pg = await page_for(b, 'demo-sam', 430, 932, mobile=True)
    await pg.goto(f'{HUB}/hub.html'); await settle(pg, 2500)
    await pg.screenshot(path=f'{OUT}/_hub_full.png', full_page=True)
    box = await pg.evaluate("(() => { const r = document.getElementById('review-wrap').getBoundingClientRect(); return [r.top + scrollY, r.bottom + scrollY]; })()")
    from PIL import Image
    im = Image.open(f'{OUT}/_hub_full.png'); top = max(0, int((box[0] - 560) * 2)); im.crop((0, top, im.width, min(im.height, top + 932 * 2))).save(f'{OUT}/student-hub-review.png')
    await pg.evaluate("window.scrollTo(0,0); _openMyPlan()"); await settle(pg, 1500)
    await pg.screenshot(path=f'{OUT}/student-plan.png'); await ctx.close()

@scenario
async def learn(b):
    ctx, pg = await page_for(b, 'demo-sam', 1280, 900)
    geo = 'demo-y10'
    await pg.goto(f'{HUB}/mindmap.html?groupId={geo}&subjectId=demo-geo-s&topicId=demo-geo-t0&subjectName=Geography&topicName=The%20challenge%20of%20natural%20hazards'); await settle(pg, 3000)
    fit = await pg.query_selector('text=Fit')
    if fit: await fit.click(); await pg.wait_for_timeout(900)
    await pg.screenshot(path=f'{OUT}/learn-map.png'); await ctx.close()

@scenario
async def badge_video(b):
    import shutil
    ctx, pg = await page_for(b, 'demo-sam', 430, 760, mobile=True)
    await pg.goto(f'{HUB}/hub.html'); await settle(pg, 2500)
    fdir = f'{OUT}/_frames'; shutil.rmtree(fdir, ignore_errors=True); os.makedirs(fdir)
    await pg.evaluate("import('./badge-pop.js?v=20261115f').then(m => { m.showBadgePops(['streak_14']); })")
    await pg.wait_for_selector('.bp-card'); await pg.wait_for_timeout(60)
    fps, secs = 25, 4.4
    for i in range(int(fps * secs)):
        t = i * 1000 / fps
        await pg.evaluate(f"document.getAnimations().forEach(a => {{ a.pause(); a.currentTime = {t}; }})")
        await pg.screenshot(path=f'{fdir}/f{i:04d}.png')
    await ctx.close()

@scenario
async def badge(b):
    ctx, pg = await page_for(b, 'demo-sam', 430, 932, mobile=True)
    await pg.goto(f'{HUB}/hub.html'); await settle(pg, 2500)
    await pg.evaluate("import('./badge-pop.js?v=20261115f').then(m => { m.showBadgePops(['streak_14']); })"); 
    await pg.wait_for_timeout(2600)
    await pg.screenshot(path=f'{OUT}/badge-pop.png')
    await ctx.close()

async def main(names):
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for n in names:
            print('scenario', n)
            await SCEN[n](b)
        await b.close()

if __name__ == '__main__':
    asyncio.run(main(sys.argv[1:] or list(SCEN)))
