#!/usr/bin/env python3
"""One-time, additive November 7 Nightcap photo import; never rewrite editorial copy."""
from pathlib import Path
import zipfile
import sys

root=Path(__file__).resolve().parents[1]
source=root/"inbox/nightcap-photos-2026-11-07.zip"
page=root/"nba-nightcap-2026-11-07.html"
folder=root/"assets/nightcap-2026-11-07"
names=[
"01-warriors-magic-curry.jpg",
"02-hawks-nets-johnson-alexander-walker.jpg",
"03-thunder-wizards-gilgeous-alexander.jpg",
"04-knicks-cavaliers-brunson.jpg",
"07-nuggets-pacers-jokic.jpg",
"05-suns-rockets-booker.jpg",
"06-spurs-blazers-wembanyama.jpg",
]
scores=[
"GOLDEN STATE 126 • ORLANDO 119 (OT)",
"ATLANTA 124 • BROOKLYN 121",
"OKLAHOMA CITY 114 • WASHINGTON 75",
"NEW YORK 109 • CLEVELAND 97",
"DENVER 114 • INDIANA 102",
"PHOENIX 102 • HOUSTON 99",
"SAN ANTONIO 125 • PORTLAND 103",
]
if not source.is_file(): sys.exit("Upload inbox/nightcap-photos-2026-11-07.zip")
html=page.read_text()
if 'class="game-photo"' in html: sys.exit("Photos already installed; refusing duplicate import")
with zipfile.ZipFile(source) as z:
    members={i.filename:i for i in z.infolist() if not i.is_dir()}
    for name in names:
        path="assets/nightcap-2026-11-07/"+name
        if path not in members: sys.exit("Missing photo: "+path)
        info=members[path]
        if info.file_size>4_000_000: sys.exit("Photo too large: "+name)
        data=z.read(path)
        if not data.startswith(b"\\xff\\xd8\\xff"): sys.exit("Invalid JPEG: "+name)
        folder.mkdir(parents=True,exist_ok=True)
        (folder/name).write_bytes(data)
style='\n.game-photo{display:block;width:100%;height:auto;max-height:530px;object-fit:cover;margin:0 0 25px;border-bottom:3px solid #a8322e}\n'
if '</style>' not in html: sys.exit("Missing CSS marker")
html=html.replace('</style>',style+'</style>',1)
for score,name in zip(scores,names):
    marker='<div class="score">'+score+'</div>'
    if html.count(marker)!=1: sys.exit("Missing or duplicate score: "+score)
    # Insert directly after the matchup heading, before its player spotlight.
    start=html.index(marker)
    heading_start=html.index('<h2>',start)
    heading_end=html.index('</h2>',heading_start)+len('</h2>')
    tag='\n<img class="game-photo" loading="lazy" decoding="async" src="assets/nightcap-2026-11-07/'+name+'" alt="Basketball action photograph for '+score.split(' • ')[0].title()+' matchup">'
    html=html[:heading_end]+tag+html[heading_end:]
page.write_text(html)
print("Installed 7 photos without changing analysis or older Nightcaps")
