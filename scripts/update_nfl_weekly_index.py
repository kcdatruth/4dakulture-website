#!/usr/bin/env python3
"""Rebuild the 4DK NFL weekly index without touching published articles.

Existing indexed stories are authoritative; new published recap HTML files are
discovered by explicit, conservative filename conventions. No fabricated games.
"""
import json
import os
import re
import subprocess
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "nfl-weekly-index.json"
TYPES = {"tnf": "TNF", "thursday": "TNF", "snf": "SNF", "sunday-night": "SNF",
         "mnf": "MNF", "monday": "MNF", "sunday": "SUNDAY", "preview": "PREVIEW"}
EXCLUDE = ("index", "archive", "rankings", "power", "mvp", "rookie", "weekly-hq",
           "injury", "top-50", "stats", "players", "schedule", "stock", "hub")
WEEK = re.compile(r"(?:^|-)week-?(\\d{1,2})(?:-|\\.)", re.I)
TITLE = re.compile(r"<title[^>]*>(.*?)</title>", re.I | re.S)
META_DATE = re.compile(r'<meta[^>]+(?:article:published_time|datePublished)[^>]+content=["\\\'](\\d{4}-\\d{2}-\\d{2})', re.I)
ORDER = {"PREVIEW": 0, "TNF": 1, "SUNDAY": 2, "SNF": 3, "MNF": 4}

def classify(name):
    if not name.startswith("nfl-") or not name.endswith(".html") or any(x in name for x in EXCLUDE):
        return None
    match = WEEK.search(name)
    if not match:
        return None
    week = int(match.group(1))
    if not 1 <= week <= 22:
        return None
    parts = name[:-5].split("-")
    kind = None
    if "preview" in parts or "kickoff" in parts:
        kind = "PREVIEW"
    elif "snf" in parts or ("sunday" in parts and "night" in parts):
        kind = "SNF"
    elif "mnf" in parts or "monday" in parts:
        kind = "MNF"
    elif "tnf" in parts or "thursday" in parts:
        kind = "TNF"
    elif "sunday" in parts:
        kind = "SUNDAY"
    return (week, kind) if kind else None

def git_date(name):
    try:
        value = subprocess.check_output(
            ["git", "log", "--follow", "--diff-filter=A", "--format=%as", "--", name],
            cwd=ROOT, text=True, stderr=subprocess.DEVNULL).strip().splitlines()
        return value[-1] if value else None
    except (subprocess.CalledProcessError, OSError):
        return None

def main():
    data = json.loads(INDEX.read_text(encoding="utf-8"))
    existing = data.get("articles", [])
    by_url = {a["url"]: a for a in existing if isinstance(a, dict) and a.get("url")}
    added = []
    for file in sorted(ROOT.glob("nfl-*.html")):
        if file.name in by_url:
            continue
        info = classify(file.name)
        if not info:
            continue
        week, kind = info
        html = file.read_text(encoding="utf-8", errors="replace")[:12000]
        match = TITLE.search(html)
        title = re.sub(r"\\s+", " ", re.sub(r"<[^>]+>", "", match.group(1))).strip() if match else ""
        title = re.sub(r"\\s*[|·]\\s*4\\s*Da\\s*Kulture.*$", "", title, flags=re.I)
        title = re.sub(r"\\s*[|·]\\s*4DK.*$", "", title, flags=re.I)
        if not title:
            continue
        date_match = META_DATE.search(html)
        published = date_match.group(1) if date_match else git_date(file.name)
        if not published:
            print("Skipping (no verifiable publication date):", file.name)
            continue
        try:
            date.fromisoformat(published)
        except ValueError:
            continue
        item = {"type": kind, "week": week, "date": published, "title": title, "url": file.name}
        by_url[file.name] = item
        added.append(item)
    # Do not automatically roll the week forward based on the calendar.
    # The next edition starts only when a new week's actual recap or preview is published.
    current = int(data.get("current_week", 1))
    discovered = [a["week"] for a in added if a["type"] in ("TNF", "PREVIEW", "SUNDAY", "SNF", "MNF")]
    if discovered:
        current = max(current, max(discovered))
    output = dict(data)
    output["current_week"] = current
    output["articles"] = sorted(by_url.values(), key=lambda a: (-int(a["week"]), ORDER.get(a.get("type"), 99), a.get("date", ""), a["url"]))
    if output["articles"] != existing or current != data.get("current_week"):
        output["updated"] = date.today().isoformat()
        INDEX.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
        print(f"Indexed {len(added)} new stories; current week {current}; retained {len(existing)} existing entries.")
    else:
        print(f"No changes. Retained {len(existing)} indexed stories.")

if __name__ == "__main__":
    main()
