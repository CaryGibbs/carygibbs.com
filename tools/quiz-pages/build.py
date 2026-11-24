#!/usr/bin/env python3
"""
Lobe Limpet: builds the free revision quiz pages and the quiz index.

Run from the repo root:  python3 tools/quiz-pages/build.py
Writes hub/<slug>.html for every page in pages.py, plus
hub/free-revision-quizzes.html. The two Chemistry pages were written by
hand before this script existed; they're listed in INDEX_EXTRA so the index
includes them, but the script doesn't overwrite them.

To add a page: add a dict to PAGES in pages.py, run this, then add the
slug to hub/sitemap.xml and check it in a browser.
"""
import html, json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from pages import PAGES, INDEX_GROUPS, INDEX_EXTRA

V = '20261124t'          # shared cache tag used across the public pages
SITE = 'https://lobelimpet.com/'
HUB = os.path.join(os.path.dirname(__file__), '..', '..', 'hub')
TODAY = '2026-11-24'

ANALYTICS = """<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "03f4e033e3af48988266f6935bed3b9c"}'></script><!-- End Cloudflare Web Analytics -->"""

def esc(s): return html.escape(s, quote=True)

def head(title, desc, canonical, og_title, og_desc, og_type, ld):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <script src="dev-flag.js?v={V}"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} · Lobe Limpet</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{SITE}{canonical}">
  <meta property="og:type" content="{og_type}">
  <meta property="og:title" content="{esc(og_title)}">
  <meta property="og:description" content="{esc(og_desc)}">
  <meta property="og:url" content="{SITE}{canonical}">
  <meta property="og:image" content="{SITE}assets/images/brand/email-logo.png">
  <link rel="icon" type="image/svg+xml" href="assets/images/brand/favicon.svg?v={V}">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/brand/favicon-32.png?v={V}">
  <link rel="apple-touch-icon" href="assets/images/brand/apple-touch-icon.png?v={V}">
  <meta name="theme-color" content="#123a4a">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="site.css?v={V}">
  <script type="application/ld+json">
{json.dumps(ld, indent=2, ensure_ascii=False)}
  </script>
{ANALYTICS}
</head>
<body>
<div id="site-header"></div>
"""

PUBLISHER = {"@type": "Organization", "name": "Lobe Limpet", "url": SITE,
             "logo": {"@type": "ImageObject", "url": SITE + "assets/images/brand/email-logo.png"}}

def crumbs(*items):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(items)]}

def question(n, q):
    topic, stem, opts, ans, why = q
    keys = 'abcd'
    buttons = '\n'.join(f'      <button type="button" data-k="{keys[i]}">{o}</button>' for i, o in enumerate(opts))
    return f"""  <div class="tq-q" data-answer="{keys[ans]}">
    <p class="tq-topic">{topic}</p>
    <p class="tq-stem"><b>{n}.</b> {stem}</p>
    <div class="tq-opts">
{buttons}
    </div>
    <p class="tq-why">{why}</p>
  </div>
"""

def section(s):
    out = f'<h2 id="{s["id"]}">{s["h2"]}</h2>\n'
    if s.get('intro'): out += f'<p>{s["intro"]}</p>\n'
    out += '<ul>\n' + ''.join(f'  <li>{b}</li>\n' for b in s['bullets']) + '</ul>\n'
    if s.get('after'): out += f'<p>{s["after"]}</p>\n'
    return out

def build_page(p):
    slug = p['slug']
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "LearningResource", "name": p['h1'], "description": p['ld_desc'],
         "url": SITE + slug, "learningResourceType": ["Quiz", "Revision notes"],
         "educationalLevel": p['level'], "inLanguage": "en-GB", "isAccessibleForFree": True,
         "teaches": p['teaches'], "datePublished": TODAY, "dateModified": TODAY, "publisher": PUBLISHER},
        crumbs(("Lobe Limpet", ""), ("Free revision quizzes", "free-revision-quizzes.html"), (p['crumb'], slug))]}
    out = head(p['h1'] + p.get('title_extra', ' with key points'), p['desc'], slug, p['h1'], p['og_desc'], 'article', ld)
    out += f"""<div class="page-hero has-mascot"><div class="wrap"><p class="guide-kicker"><a href="free-revision-quizzes.html">Free revision quizzes</a> · {p['kicker']}</p><h1>{p['h1']}</h1><p>{p['hero']}</p><img class="page-mascot" src="assets/images/brand/mascot/{p['mascot']}.svg?v={V}" alt="" width="108" height="114"></div></div>
<main class="wrap"><div class="prose guide">

<p class="updated">{p['for_line']} · Updated November 2026</p>

<div class="guide-sum">
  <h2>{p['sum_h2']}</h2>
  <ol>
""" + ''.join(f'    <li>{li}</li>\n' for li in p['summary']) + """  </ol>
</div>

<nav class="guide-toc" aria-label="On this page">
  <p><strong>On this page</strong></p>
  <ul>
    <li><a href="#quiz">The quiz</a></li>
""" + ''.join(f'    <li><a href="#{s["id"]}">{s["toc"]}</a></li>\n' for s in p['sections']) + f"""    <li><a href="#tips">{p['tips']['toc']}</a></li>
    <li><a href="#faq">Common questions</a></li>
  </ul>
</nav>

<h2 id="quiz">The quiz</h2>
<p>Have a go before you look at the key points. Getting some wrong is fine: trying to remember is what makes it stick, and the answers show you what to go back over.</p>

<div class="tq" id="tq">
""" + ''.join(question(i + 1, q) for i, q in enumerate(p['questions'])) + """  <div class="tq-end" id="tq-end" hidden aria-live="polite">
    <p class="tq-score" id="tq-score"></p>
    <p id="tq-msg"></p>
    <p><a class="btn btn-coral" href="login.html?signup=student" style="color:#fff">Keep going in Lobe Limpet, free</a> <button type="button" class="btn btn-ghost" id="tq-again">Try again</button></p>
  </div>
</div>
<p class="note-small" id="tq-progress" aria-live="polite"></p>

""" + '\n'.join(section(s) for s in p['sections']) + '\n' + section(dict(p['tips'], id='tips')) + f"""
<div class="guide-cta">
  <h2>Keep going with Lobe Limpet</h2>
  <p>{p['cta']}</p>
  <p>You can also turn your own class notes or revision list into quizzes, in any subject.</p>
  <p><a class="btn btn-coral" href="login.html?signup=student" style="color:#fff">Sign up free as a student</a> <a class="btn btn-ghost" href="login.html?signup=parent">I'm a parent</a></p>
  <p class="note-small">Free to start. No card needed.</p>
</div>

<section class="faq" id="faq">
  <h2>Common questions</h2>
""" + ''.join(f'  <details><summary>{q}</summary><p>{a}</p></details>\n' for q, a in p['faq']) + f"""</section>

<p class="updated">{p['more']} Lobe Limpet isn't connected to any exam board. Always check your school's revision list and your exam board's specification.</p>

</div></main>
<div id="site-footer"></div>
<script src="site.js?v={V}"></script>
<script src="taster-quiz.js?v={V}"></script>
</body>
</html>
"""
    assert len(p['questions']) == 12, slug
    open(os.path.join(HUB, slug), 'w').write(out)

def build_index():
    meta = {p['slug']: p for p in PAGES}
    meta.update(INDEX_EXTRA)
    items, pos = [], 0
    body = ''
    for g in INDEX_GROUPS:
        body += f"""<section{' style="padding-top:0"' if body else ''} id="{g['id']}">
  <div class="wrap">
    <div class="sec-head"><h2>{g['h2']}</h2><p>{g['p']}</p></div>
    <div class="res-grid">
"""
        for slug in g['slugs']:
            m = meta[slug]; pos += 1
            items.append({"@type": "ListItem", "position": pos, "url": SITE + slug, "name": m['h1']})
            body += f"""      <a class="card res-card" href="{slug}">
        <span class="stage-tag">{m['tag']}</span>
        <h3>{m['card_h3']}</h3>
        <p>{m['card_p']}</p>
        <span class="res-more">12 questions <b aria-hidden="true">→</b></span>
      </a>
"""
        body += '    </div>\n  </div>\n</section>\n\n'
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "name": "Free GCSE and KS3 revision quizzes",
         "description": "Free revision quizzes with answers explained and key points for each topic.",
         "url": SITE + "free-revision-quizzes.html", "inLanguage": "en-GB",
         "isPartOf": {"@type": "WebSite", "name": "Lobe Limpet", "url": SITE},
         "mainEntity": {"@type": "ItemList", "itemListElement": items}},
        crumbs(("Lobe Limpet", ""), ("Free revision quizzes", "free-revision-quizzes.html"))]}
    jump = ' · '.join(f'<a href="#{g["id"]}">{g["short"]}</a>' for g in INDEX_GROUPS)
    out = head('Free GCSE and KS3 revision quizzes with key points',
               'Free GCSE and KS3 revision quizzes you can try straight away, with no sign-up: Biology, Chemistry, Physics, English Literature and KS3 Science. 12 questions each, with answers explained and key points.',
               'free-revision-quizzes.html', 'Free GCSE and KS3 revision quizzes',
               'Quick quizzes with answers explained and the key points for every topic. No sign-up needed.', 'website', ld)
    out += f"""<div class="page-hero has-mascot"><div class="wrap"><p class="guide-kicker"><a href="resources.html">Resources</a> · No sign-up needed</p><h1>Free revision quizzes</h1><p>Quick quizzes you can try straight away. Each one has 12 questions with the answers explained, then the key points for every topic to go back over.</p><p class="quiz-jump">{jump}</p><img class="page-mascot" src="assets/images/brand/mascot/limpet-cards.svg?v={V}" alt="" width="108" height="114"></div></div>

{body}<section style="padding-top:0">
  <div class="wrap">
    <p class="note-small">More quizzes are added from time to time.</p>
    <div class="prose" style="max-width:none">
    <h2>Why quizzing works</h2>
    <p>Trying to remember something, then checking, makes it stick far better than reading notes again. Getting some answers wrong is part of how it works: the gap shows what to go back over. Coming back to the same topic a few days later makes it last even longer.</p>
    <p>For more on what helps, see our guides to <a href="help-your-child-revise.html">helping your child revise for their GCSEs</a> and <a href="ks3-revision-tips.html">KS3 revision tips</a>.</p>
  </div></div>
</section>

<section style="padding-top:0">
  <div class="wrap">
    <div class="guide-cta" style="max-width:none;padding-bottom:26px;">
      <h2>Revise any subject, not just these</h2>
      <p>Lobe Limpet turns any topic, class notes or revision list into short quizzes, flashcards and clear notes. Written answers are marked the way an examiner would, and daily review brings back what you're about to forget.</p>
      <p><a class="btn btn-coral" href="login.html?signup=student" style="color:#fff">Sign up free as a student</a> <a class="btn btn-ghost" href="login.html?signup=parent">I'm a parent</a></p>
      <p class="note-small">Free to start. No card needed. Lobe Limpet isn't connected to any exam board, so always check your school's revision list and your board's specification.</p>
    </div>
  </div>
</section>

<div id="site-footer"></div>
<script src="site.js?v={V}"></script>
</body>
</html>
"""
    open(os.path.join(HUB, 'free-revision-quizzes.html'), 'w').write(out)

if __name__ == '__main__':
    for p in PAGES: build_page(p)
    build_index()
    print('Built', len(PAGES), 'pages and the index')
