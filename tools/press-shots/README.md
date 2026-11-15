# Press screenshots

Renders the real Lobe Limpet pages with an invented demo family (Sam, Year 10; parent Alex),
so the press page can show the app without any real student data. Firebase is replaced by
in-memory stand-ins (`stubs/`), so nothing reads or writes the live database.

1. `python3 make_demo.py` builds `demo.json` (dates are relative to today).
2. `npm i @fontsource/inter @fontsource/fredoka @fontsource/plus-jakarta-sans` in a `fonts/` folder here (the fonts are served locally).
3. Serve `hub/` on port 8766: `cd hub && python3 -m http.server 8766`.
4. `pip install playwright pillow && playwright install chromium`, then `python3 shoot.py` (or name scenarios:
   parent_home parent_progress hub hub_more quiz_marked badge badge_video learn). Output goes to `out/`.
5. Badge video: `ffmpeg -framerate 25 -i out/_frames/f%04d.png -vf format=yuv420p -c:v libx264 -preset veryfast badge-pop.mp4`.
6. Copy the chosen PNGs to `hub/assets/press/screens/` (plus `-thumb.jpg` at 720px) and add them to the brand kit zip.
