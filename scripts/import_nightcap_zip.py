#!/usr/bin/env python3
"""Safe, additive 4DK Nightcap ZIP importer. Run on a review branch."""
import json, re, zipfile
from datetime import date as calendar_date
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
ZIP=ROOT/"inbox"/"nightcap-update.zip"
def fail(msg): raise SystemExit("4DK importer stopped: "+msg)
if not ZIP.is_file(): fail("Upload inbox/nightcap-update.zip first")
with zipfile.ZipFile(ZIP) as z:
    members=[i for i in z.infolist() if not i.is_dir()]
    if len(members)!=2 or {Path(i.filename).name for i in members}!={"nightcap.html","manifest.json"}: fail("ZIP must contain only nightcap.html and manifest.json")
    if any("/" in i.filename or "\\" in i.filename or i.file_size>2_000_000 for i in members): fail("Unsafe ZIP paths or oversized file")
    manifest=json.loads(z.read("manifest.json"))
    html=z.read("nightcap.html").decode("utf-8")
date=manifest.get("date","")
if not isinstance(date,str) or not re.fullmatch(r"20\d{2}-\d{2}-\d{2}",date): fail("Invalid date")
try:
    edition_date=calendar_date.fromisoformat(date)
except ValueError:
    fail("Invalid calendar date")
for k in ("headline","summary"):
    if not isinstance(manifest.get(k),str) or not 10<=len(manifest[k])<=350: fail("Invalid "+k)
if "<html" not in html.lower() or "</html>" not in html.lower(): fail("Incomplete HTML")
filename=f"nba-nightcap-{date}.html"
target=ROOT/filename
if target.exists(): fail("Edition already exists; archives are immutable")
latest=ROOT/"nightcap-latest.json"
old=json.loads(latest.read_text())
old_url=old.get("url","")
match=re.fullmatch(r"nba-nightcap-(20\d{2}-\d{2}-\d{2})\.html",old_url)
if not match: fail("Latest feed has an invalid edition URL")
if edition_date<=calendar_date.fromisoformat(match.group(1)): fail("Not newer than current edition")
archive=ROOT/"nba-nightcap-archive.html"
page=archive.read_text()
if filename in page: fail("Duplicate archive link")
card=f'<a class="card" href="{filename}"><span class="label">{date}</span><h2>{escape(manifest["headline"])}</h2><p>{escape(manifest["summary"])} →</p></a>'
if '<div class="grid">' not in page: fail("Archive marker missing")
# Connect each new edition to the previous edition and the permanent archive.
# Never rewrite previously published editions.
nav = (
    '<nav aria-label="NBA Nightcap editions" '
    'style="display:flex;flex-wrap:wrap;gap:12px;margin:24px 0;'
    'padding:18px 0;border-top:1px solid #775333;'
    'border-bottom:1px solid #775333;font:700 14px/1.5 Arial,sans-serif">'
    f'<a href="{old_url}">← PREVIOUS NIGHTCAP</a>'
    '<a href="nba-nightcap-archive.html">ALL NIGHTCAP ARCHIVES</a>'
    '<a href="nba.html">NBA HQ</a></nav>'
)
if "</body>" not in html.lower(): fail("Missing closing body tag")
if 'aria-label="NBA Nightcap editions"' not in html:
    html = re.sub(r"</body>", nav + "</body>", html, count=1, flags=re.I)
if html.count('aria-label="NBA Nightcap editions"') != 1:
    fail("Nightcap navigation must appear exactly once")
target.write_text(html)
archive.write_text(page.replace('<div class="grid">','<div class="grid">'+card,1))
new={"date":edition_date.strftime("%B %-d, %Y").upper(),"shortDate":edition_date.strftime("%b %-d").upper(),"headline":manifest["headline"],"summary":manifest["summary"],"url":filename,"previousDate":old["date"],"previousUrl":old["url"],"archiveUrl":"nba-nightcap-archive.html"}
latest.write_text(json.dumps(new,indent=2)+"\n")
# Preserve all prior articles; JS reads latest JSON on both homepages.
print("Prepared",filename,"and updated archive + latest feed")
