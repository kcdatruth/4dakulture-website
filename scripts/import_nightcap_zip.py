#!/usr/bin/env python3
"""Safe, additive 4DK Nightcap ZIP importer. Run on a review branch."""
import json, re, sys, zipfile
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
if not re.fullmatch(r"20\d{2}-\d{2}-\d{2}",date): fail("Invalid date")
for k in ("headline","summary"):
    if not isinstance(manifest.get(k),str) or not 10<=len(manifest[k])<=350: fail("Invalid "+k)
if "<html" not in html.lower() or "</html>" not in html.lower(): fail("Incomplete HTML")
filename=f"nba-nightcap-{date}.html"
target=ROOT/filename
if target.exists(): fail("Edition already exists; archives are immutable")
latest=ROOT/"nightcap-latest.json"
old=json.loads(latest.read_text())
if date<=old["url"].removeprefix("nba-nightcap-").removesuffix(".html"): fail("Not newer than current edition")
archive=ROOT/"nba-nightcap-archive.html"
page=archive.read_text()
if filename in page: fail("Duplicate archive link")
card=f'<a class="card" href="{filename}"><span class="label">{date}</span><h2>{escape(manifest["headline"])}</h2><p>{escape(manifest["summary"])} →</p></a>'
if '<div class="grid">' not in page: fail("Archive marker missing")
target.write_text(html)
archive.write_text(page.replace('<div class="grid">','<div class="grid">'+card,1))
new={"date":date,"shortDate":date,"headline":manifest["headline"],"summary":manifest["summary"],"url":filename,"previousDate":old["date"],"previousUrl":old["url"],"archiveUrl":"nba-nightcap-archive.html"}
latest.write_text(json.dumps(new,indent=2)+"\n")
# Preserve all prior articles; JS reads latest JSON on both homepages.
print("Prepared",filename,"and updated archive + latest feed")
