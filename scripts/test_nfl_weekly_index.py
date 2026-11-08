#!/usr/bin/env python3
"""Offline end-to-end smoke test: simulate publishing, archiving and repeat runs."""
import importlib.util
import json
import os
import subprocess
import tempfile
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("nfl_indexer", ROOT / "scripts/update_nfl_weekly_index.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

with tempfile.TemporaryDirectory() as directory:
    root = Path(directory)
    index = root / "nfl-weekly-index.json"
    old = {"type": "TNF", "week": 9, "date": "2026-11-05", "title": "Original full 4DK report", "url": "nfl-thursday-recap-week9-existing.html"}
    index.write_text(json.dumps({"version": 1, "season": 2026, "current_week": 9, "articles": [old]}))
    # Real publication pattern: a new article with an explicit published date.
    article = root / "nfl-sunday-recap-week10-2026.html"
    article.write_text('<!doctype html><html><head><title>Week 10 — 4DK Sunday Deep Dive | 4DK</title><meta property="article:published_time" content="2026-11-15"></head><body><article><h1>Long-form 4DK analysis</h1></article></body></html>')
    before = article.read_bytes()
    with patch.object(module, "ROOT", root), patch.object(module, "INDEX", index):
        module.main()
        first = json.loads(index.read_text())
        assert first["current_week"] == 10, "New published week must become current"
        assert len(first["articles"]) == 2, "New article should be indexed without deleting archives"
        assert old in first["articles"], "Old week and its original metadata must be preserved"
        assert first["articles"][0]["type"] == "SUNDAY", "New recap must be classified"
        assert first["articles"][0]["url"] == article.name
        assert first["articles"][0]["date"] == "2026-11-15"
        assert article.read_bytes() == before, "Publishing automation must not rewrite editorial content"
        module.main()
        second = json.loads(index.read_text())
        assert first == second, "Repeated runs must be idempotent"
        print("PASS: publication discovered, Week 10 featured, Week 9 archived, article unchanged, repeat safe")
