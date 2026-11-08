#!/usr/bin/env python3
"""Isolated regression tests: never alter published Nightcaps."""
import json
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "import_nightcap_zip.py"
BASE = {"date": "2026-11-07", "url": "nba-nightcap-2026-11-07.html",
        "headline": "Previous edition", "summary": "Previously published edition"}
MANIFEST = {"date": "2026-11-08", "headline": "Verified next Nightcap edition",
            "summary": "All games verified before editorial publication."}
HTML = "<!doctype html><html><body><h1>Test Nightcap</h1></body></html>"

def run_case(date, expected_ok, duplicate=False):
    with tempfile.TemporaryDirectory(prefix="4dk-nightcap-test-") as tmp:
        root = Path(tmp)
        (root / "scripts").mkdir()
        (root / "inbox").mkdir()
        shutil.copy2(SCRIPT, root / "scripts" / SCRIPT.name)
        (root / "nightcap-latest.json").write_text(json.dumps(BASE))
        archive = '<html><div class="grid"><a href="nba-nightcap-2026-11-07.html">Old</a></div></html>'
        (root / "nba-nightcap-archive.html").write_text(archive)
        previous = root / BASE["url"]
        previous.write_text("<html>ORIGINAL ARCHIVE MUST REMAIN</html>")
        if duplicate:
            (root / f"nba-nightcap-{date}.html").write_text("<html>EXISTING</html>")
        manifest = dict(MANIFEST, date=date)
        with zipfile.ZipFile(root / "inbox" / "nightcap-update.zip", "w") as z:
            z.writestr("nightcap.html", HTML)
            z.writestr("manifest.json", json.dumps(manifest))
        result = subprocess.run([sys.executable, str(root / "scripts" / SCRIPT.name)],
                                cwd=root, capture_output=True, text=True)
        assert (result.returncode == 0) == expected_ok, result.stdout + result.stderr
        assert previous.read_text() == "<html>ORIGINAL ARCHIVE MUST REMAIN</html>"
        if expected_ok:
            assert (root / f"nba-nightcap-{date}.html").read_text() == HTML
            assert f"nba-nightcap-{date}.html" in (root / "nba-nightcap-archive.html").read_text()
            assert json.loads((root / "nightcap-latest.json").read_text())["url"] == f"nba-nightcap-{date}.html"
        else:
            assert (root / "nba-nightcap-archive.html").read_text() == archive
            assert json.loads((root / "nightcap-latest.json").read_text()) == BASE

if __name__ == "__main__":
    run_case("2026-11-08", True)
    run_case("2026-11-08", False, duplicate=True)
    run_case("2026-11-07", False)
    run_case("2026-02-30", False)
    print("4DK Nightcap importer safety tests passed (4 cases)")
