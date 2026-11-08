#!/usr/bin/env python3
"""Import the seven approved November 7 Nightcap photos without replacing articles."""
from pathlib import Path
from zipfile import ZipFile
import re

root = Path(__file__).resolve().parents[1]
archive = root / "inbox" / "nightcap-photos-2026-11-07.zip"
article = root / "nba-nightcap-2026-11-07.html"
names = [
    ("01-warriors-magic-curry.jpg", "CURRY TAKES OVER WHEN THE LIGHTS GET BRIGHTEST", "Stephen Curry handles the ball for Golden State"),
    ("02-hawks-nets-johnson-alexander-walker.jpg", "THE HAWKS ERASE SEVENTEEN AND FINISH THE JOB", "Atlanta teammates celebrate"),
    ("03-thunder-wizards-gilgeous-alexander.jpg", "THUNDER DEFENSE TURNS THE GAME INTO A ROUT", "Shai Gilgeous-Alexander attacks for Oklahoma City"),
    ("04-knicks-cavaliers-brunson.jpg", "BRUNSON AND TOWNS MAKE THEIR CASE", "Jalen Brunson handles the ball for New York"),
    ("07-nuggets-pacers-jokic.jpg", "JOKIĆ CONDUCTS THE SHOW IN MEXICO CITY", "Nikola Jokic works against Indiana"),
    ("05-suns-rockets-booker.jpg", "BOOKER WINS THE POSSESSION-BY-POSSESSION BATTLE", "Devin Booker drives against Houston"),
    ("06-spurs-blazers-wembanyama.jpg", "WEMBANYAMA MAKES AN EIGHTH STRAIGHT WIN LOOK ROUTINE", "Victor Wembanyama finishes at the rim"),
]
if not archive.is_file():
    raise SystemExit("Photo ZIP missing from inbox")
html = article.read_text(encoding="utf-8")
with ZipFile(archive) as z:
    expected = {"assets/nightcap-2026-11-07/" + n for n, _, _ in names} | {"PHOTO-MAP.txt"}
    actual = set(z.namelist())
    if actual != expected or len(z.infolist()) != len(expected):
        raise SystemExit("ZIP must contain exactly the seven mapped photos and PHOTO-MAP.txt")
    if any(z.getinfo(p).file_size > 5_000_000 for p in expected):
        raise SystemExit("Unexpectedly large photo")
    for name, heading, alt in names:
        path = "assets/nightcap-2026-11-07/" + name
        marker = "<h2>" + heading + "</h2>"
        if html.count(marker) != 1:
            raise SystemExit("Missing or repeated section: " + heading)
        if path in html:
            continue
        tag = '<figure class="game-photo"><img src="' + path + '" alt="' + alt + '" loading="lazy"><figcaption>4DK NBA Nightcap · November 7, 2026</figcaption></figure>'
        html = html.replace(marker, marker + "\n" + tag, 1)
        output = root / path
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(z.read(path))
style = '.game-photo{margin:24px 0 30px}.game-photo img{width:100%;height:auto;display:block;border-radius:3px}.game-photo figcaption{font:700 11px Arial,sans-serif;color:#d9b56b;letter-spacing:.08em;text-transform:uppercase;margin-top:9px}'
if style not in html:
    html = html.replace("</style>", style + "\n</style>", 1)
article.write_text(html, encoding="utf-8")
print("Seven game photos installed; original analysis and archives preserved.")
