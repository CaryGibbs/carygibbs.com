# Renders a Lobey SVG from assets/press/lobey/ to GIF (24 frames, white) and transparent PNG.
# Edit JOBS (name, viewBox width, loop seconds) and run: python3 tools/lobey-press-render.py (needs playwright + Pillow).
# Then add the three files to press.html and to assets/press/lobe-limpet-brand-kit.zip.
import asyncio, io
from playwright.async_api import async_playwright
from PIL import Image
import os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'hub', 'assets', 'press', 'lobey') + '/'
JOBS=[('lobey-family',146,3.2),('lobey-map',108,2.6)]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, vbw, loop in JOBS:
            svg=open(D+name+'.svg').read()
            # GIF frames, white background, 380px high
            gw=round(380*vbw/114)
            pg = await b.new_page(viewport={'width':gw,'height':380})
            await pg.set_content(f"<html><body style='margin:0;background:#fff'><div style='width:{gw}px;height:380px'>{svg.replace('<svg ', '<svg width=\"100%\" height=\"100%\" ',1)}</div></body></html>")
            await pg.wait_for_timeout(200)
            frames=[]
            n=24
            for i in range(n):
                t=loop*1000*i/n
                await pg.evaluate(f"document.getAnimations().forEach(a=>{{a.pause();a.currentTime={t};}})")
                png=await pg.screenshot()
                frames.append(Image.open(io.BytesIO(png)).convert('RGB'))
            pal=[f.quantize(colors=255, method=Image.Quantize.MEDIANCUT) for f in frames]
            pal[0].save(D+name+'.gif', save_all=True, append_images=pal[1:], duration=round(loop*1000/n), loop=0, optimize=True, disposal=1)
            await pg.close()
            # PNG still, transparent, 845px high, at rest (time 0)
            pw=int(845*vbw/114)
            pg = await b.new_page(viewport={'width':pw,'height':845})
            await pg.set_content(f"<html><body style='margin:0;background:transparent'><div style='width:{pw}px;height:845px'>{svg.replace('<svg ', '<svg width=\"100%\" height=\"100%\" ',1)}</div></body></html>")
            await pg.wait_for_timeout(200)
            await pg.evaluate("document.getAnimations().forEach(a=>{a.pause();a.currentTime=0;})")
            await pg.screenshot(path=D+name+'.png', omit_background=True)
            await pg.close()
            print(name, (gw,380), (pw,845))
        await b.close()
asyncio.run(main())
