"""Failure cases that must prevent publishing a new Cup snapshot."""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch, Mock
import refresh_nba_cup as cup

class CupValidation(unittest.TestCase):
    def test_complete_round_robin(self):
        self.assertEqual(len(cup.validate_schedule()),60)

    def test_duplicate_opponents_on_different_dates(self):
        fixtures=dict(cup.FIXTURES);fixtures['20261106']+=';WSH CHA'
        with patch.object(cup,'FIXTURES',fixtures), self.assertRaisesRegex(ValueError,'Duplicate'):
            cup.validate_schedule()

    def test_cross_group_opponents(self):
        fixtures=dict(cup.FIXTURES);fixtures['20261030']=fixtures['20261030'].replace('WSH CHA','WSH DET')
        with patch.object(cup,'FIXTURES',fixtures),self.assertRaisesRegex(ValueError,'share a group'):
            cup.validate_schedule()

    def assert_preserved(self,events,pattern):
        with tempfile.TemporaryDirectory() as directory:
            dest=Path(directory)/'snapshot.json';before=b'{"status":"verified","completed_games":19}\n';dest.write_bytes(before)
            response=Mock();response.json.return_value={'events':events}
            with patch.object(cup,'DEST',dest),patch.object(cup.requests,'get',return_value=response),self.assertRaisesRegex(ValueError,pattern):cup.main()
            self.assertEqual(dest.read_bytes(),before)

    def test_incomplete_live_feed_preserves_snapshot(self):
        self.assert_preserved([],'Missing completed Cup matchup')

    def test_overtime_cannot_inflate_differential(self):
        event={'competitions':[{'competitors':[{'team':{'abbreviation':'WSH'},'score':'110'},{'team':{'abbreviation':'CHA'},'score':'105'}]}],'status':{'type':{'completed':True},'period':5}}
        self.assert_preserved([event],'OT requires regulation')

    def test_duplicate_event_preserves_snapshot(self):
        event={'competitions':[{'competitors':[{'team':{'abbreviation':'WSH'},'score':'95'},{'team':{'abbreviation':'CHA'},'score':'79'}]}],'status':{'type':{'completed':True},'period':4}}
        self.assert_preserved([event,event],'Duplicate Cup event')
if __name__=='__main__':unittest.main()
