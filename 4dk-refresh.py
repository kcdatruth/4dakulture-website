from pathlib import Path
import re

ROOT=Path(__file__).resolve().parent
STAMP='4dk-oct12-refresh'

NFL='''<section id="4dk-oct12-refresh" style="background:linear-gradient(120deg,#101613,#251713);color:#f7f1e6;padding:32px 20px;border-top:4px solid #e74634;border-bottom:1px solid #caa55d"><div style="max-width:1160px;margin:auto"><div style="font-size:12px;font-weight:900;letter-spacing:.18em;color:#e6bb6c">4 DA KULTURE • WEEK 5 • OCTOBER 12, 2026</div><h2 style="font-size:clamp(30px,6vw,62px);line-height:1.04;margin:12px 0">WEEK 5 IS COMPLETE. BUFFALO SURVIVES IN OT.</h2><p style="font-size:clamp(16px,2.5vw,21px);line-height:1.5;max-width:900px">Baltimore erased an eight-point late deficit to beat Atlanta 30–23 in overtime. The 49ers outlasted Seattle 32–29 to reach 5–0, and Minnesota also moved to 5–0. Buffalo beat the Rams 37–34 in overtime behind Josh Allen, despite a huge night from Matthew Stafford and Puka Nacua.</p><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:18px"><a href="nfl-mnf-recap-week5-bills-rams.html" style="color:#f5d397;border:1px solid #a68b60;padding:13px 17px;font-weight:900;text-decoration:none">READ THE MNF RECAP →</a><a style="color:white;background:#d9402d;padding:13px 17px;font-weight:900;text-decoration:none" href="nfl-sunday-recap-week5.html">READ THE FULL SUNDAY RECAP →</a><a style="color:#f5d397;border:1px solid #a68b60;padding:13px 17px;font-weight:900;text-decoration:none" href="nfl-week5-standings-2026.html">WEEK 5 STANDINGS →</a><a style="color:#f5d397;border:1px solid #a68b60;padding:13px 17px;font-weight:900;text-decoration:none" href="nfl-sunday-recaps.html">SUNDAY ARCHIVE →</a></div><p style="font-size:12px;color:#b9b6b0;margin-top:18px">Monday Night Football final: Bills 37, Rams 34 (OT).</p></div></section>'''
NBA='''<section id="4dk-oct12-refresh" style="background:linear-gradient(125deg,#0a0d12,#301713);color:#f6f0e7;border-top:4px solid #df452e;padding:28px 20px"><div style="max-width:1160px;margin:auto"><div style="color:#d9b46c;font-size:12px;font-weight:900;letter-spacing:.14em">4DK NBA DAILY DESK • OCTOBER 12, 2026</div><h2 style="font-size:clamp(28px,5vw,52px);line-height:1.05;margin:12px 0">THE PRESEASON WATCH CONTINUES.</h2><p style="font-size:clamp(16px,2.5vw,20px);line-height:1.5;max-width:880px">Our latest Nightcap covers Kyrie Irving's return, Nikola Jokić, James Harden and Caleb Wilson. Live NBA scores update separately; we are not calling preseason games regular-season results.</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:20px"><a href="nba-nightcap-2026-10-11.html" style="background:#dc452f;color:white;padding:12px 16px;text-decoration:none;font-weight:900">READ OCT. 11 NIGHTCAP →</a><a href="nba-nightcap.html" style="border:1px solid #c7a86e;color:#f5d38c;padding:12px 16px;text-decoration:none;font-weight:900">NIGHTCAP ARCHIVE →</a><a href="nba-power-rankings-2026-27.html" style="border:1px solid #c7a86e;color:#f5d38c;padding:12px 16px;text-decoration:none;font-weight:900">POWER RANKINGS →</a></div></div></section>'''
HOME='''<section id="4dk-oct12-refresh" style="background:#101210;color:#f6f0e8;border-top:4px solid #e74731;padding:28px 20px"><div style="max-width:1160px;margin:auto"><div style="font-size:12px;font-weight:900;letter-spacing:.15em;color:#e4b96b">4DK FRONT PAGE • MONDAY, OCTOBER 12</div><h2 style="font-size:clamp(30px,5vw,54px);line-height:1.05;margin:12px 0 20px">ALLEN WINS THE THRILLER. THE NBA NIGHTCAP.</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px"><a href="nfl-mnf-recap-week5-bills-rams.html" style="display:block;padding:22px;border:1px solid #7b4936;color:#fff;text-decoration:none;background:#231712"><small style="color:#e8b866;font-weight:900">NFL • WEEK 5</small><h3 style="font-size:24px;margin:12px 0">BILLS WIN IN OT. NINERS STAY PERFECT.</h3><p style="line-height:1.5">Buffalo survives Los Angeles 37–34 in OT. The Rams fall to 2–3. Read our MNF breakdown →</p></a><a href="nba-nightcap-2026-10-11.html" style="display:block;padding:22px;border:1px solid #7b4936;color:#fff;text-decoration:none;background:#201b19"><small style="color:#e8b866;font-weight:900">NBA • PRESEASON</small><h3 style="font-size:24px;margin:12px 0">KYRIE. JOKIĆ. HARDEN. CALEB.</h3><p style="line-height:1.5">The latest 4DK Nightcap: four storylines from the preseason →</p></a><a href="album-files.html" style="display:block;padding:22px;border:1px solid #7b4936;color:#fff;text-decoration:none;background:#191919"><small style="color:#e8b866;font-weight:900">MUSIC • ALBUM FILES</small><h3 style="font-size:24px;margin:12px 0">FIVE CLASSIC ALBUM ISSUES.</h3><p style="line-height:1.5">Keep reading the Album Files archive and track-by-track reviews →</p></a></div></div></section>'''

def patch_page(filename,block):
 p=ROOT/filename
 if not p.exists():
  print('SKIP missing',filename);return
 s=p.read_text(encoding='utf-8')
 if 'id="4dk-oct12-refresh"' in s:
  s=re.sub(r'<section id="'+STAMP+r'".*?</section>',block,s,count=1,flags=re.S)
 else:
  m=re.search(r'<main\b[^>]*>',s,re.I)
  if not m: print('SKIP no main',filename);return
  s=s[:m.end()]+'\n'+block+'\n'+s[m.end():]
 p.write_text(s,encoding='utf-8')
 print('UPDATED',filename)

for filename,block in [('index.html',HOME),('nfl.html',NFL),('nba.html',NBA)]:patch_page(filename,block)

# Scope the global score ticker to the two main 4DK leagues. Existing ESPN
# fetch/refresh/status handling is preserved; no fake or hardcoded scores.
p=ROOT/'scores.js'
if p.exists():
 s=p.read_text(encoding='utf-8')
 pat=r'const SPORTS=\[.*?\];'
 replacement="const SPORTS=[{league:'NFL',path:'football/nfl'},{league:'NBA',path:'basketball/nba'}];"
 s,n=re.subn(pat,replacement,s,count=1,flags=re.S)
 if n:p.write_text(s,encoding='utf-8');print('UPDATED scores.js — NFL and NBA only')
 else:print('SKIP scores.js — format changed')
