#!/usr/bin/env python3
"""Offline validation of ESPN fallback parsing; no external API dependency."""
import sys
import unittest
from pathlib import Path
from unittest.mock import Mock, patch
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from espn_live_fallback import _parse_game, append_recent_missing_games

LABELS = ["MIN", "FG", "3PT", "FT", "OREB", "DREB", "REB", "AST", "STL", "BLK", "TO", "PF", "PTS"]
STATS = ["30", "7-12", "2-4", "3-4", "1", "4", "5", "6", "2", "1", "1", "2", "19"]

def fixture():
    return {"boxscore": {"players": [
        {"statistics": [{"labels": LABELS, "athletes": [
            {"athlete": {"displayName": f"Team {team} Player {i}"}, "stats": STATS}
            for i in range(5)
        ]}]} for team in ("A", "B")
    ]}}

class TestESPNFallback(unittest.TestCase):
    def test_complete_box_score(self):
        rows = _parse_game("401000001", fixture())
        self.assertEqual(len(rows), 10)
        self.assertEqual(rows[0]["points"], 19)
        self.assertEqual(rows[0]["three_point_field_goals_attempted"], 4)
        self.assertEqual(rows[0]["game_id"], "401000001")

    def test_reject_incomplete_box_score(self):
        bad = fixture()
        bad["boxscore"]["players"][0]["statistics"][0]["athletes"] = []
        with self.assertRaises(ValueError):
            _parse_game("401000001", bad)

    def test_reject_invalid_stat(self):
        bad = fixture()
        bad["boxscore"]["players"][0]["statistics"][0]["athletes"][0]["stats"][-1] = "NA"
        with self.assertRaises(ValueError):
            _parse_game("401000001", bad)

if __name__ == "__main__":
    unittest.main()
