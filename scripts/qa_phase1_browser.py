"""Run from the repository root. Capture full pages and test real homepage entry points."""
import json
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright, expect

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

root = Path.cwd()
art = root / 'staging/qa-previews'
art.mkdir(exist_ok=True)
latest = json.loads(Path('nightcap-latest.json').read_text())
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(root)))
Thread(target=server.serve_forever, daemon=True).start()
base = f'http://127.0.0.1:{server.server_port}'
with sync_playwright() as pw:
    browser = pw.chromium.launch(executable_path=os.getenv('CHROMIUM_PATH') or None)
    for name, w, h in [('mobile',390,844),('tablet',768,1024),('desktop',1440,1000)]:
        ctx = browser.new_context(viewport={'width':w,'height':h}, reduced_motion='reduce')
        page = ctx.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        # A static preview lacks a Cloudflare Worker. Exercise its success contract with a fixture.
        page.route('**/api/scores?*', lambda r: r.fulfill(json={'games':[]}))
        page.route('https://site.api.espn.com/**', lambda r: r.fulfill(json={'events':[]}))
        page.goto(base + '/', wait_until='domcontentloaded')
        expect(page.locator('[data-nightcap-link]')).to_have_attribute('href',latest['url'])
        expect(page.locator('[data-nightcap-previous]')).to_have_attribute('href',latest['previousUrl'])
        page.evaluate('navigator.serviceWorker.ready.then(() => true)')
        page.reload(wait_until='domcontentloaded')
        expect(page.locator('#night-title')).to_have_text(latest['headline'])
        assert page.locator('main').count() == page.locator('h1').count() == 1
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.keyboard.press('Tab')
        expect(page.get_by_text('Skip to content',exact=True)).to_be_focused()
        if w < 851:
            menu=page.locator('#menuBtn')
            menu.click()
            expect(page.locator('#mobileNav')).to_be_visible()
            page.keyboard.press('Escape')
            expect(menu).to_be_focused()
        page.locator('#siteSearchInput').fill('Russ')
        expect(page.locator('#siteSearchResults')).to_contain_text('Westbrook')
        page.keyboard.press('Escape')
        expect(page.locator('#siteSearchResults')).to_be_hidden()
        page.locator('[data-score-refresh]').click()
        expect(page.locator('[data-score-refresh]')).to_be_enabled()
        for href in set(page.locator('a[href]').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))')):
            if href.startswith('#'):
                assert page.locator(href).count(), href
            elif not href.startswith('https:'):
                assert page.request.get(base+'/'+href.lstrip('/')).ok,href
        if os.getenv('AXE_PATH'):
            page.add_script_tag(path=os.environ['AXE_PATH'])
            violations = page.evaluate("""async ()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(x=>[x.id,x.nodes.map(n=>n.target)])""")
            assert not violations,violations
        page.evaluate('window.scrollTo(0,0);document.activeElement.blur()')
        page.screenshot(path=art/f'{name}.png',full_page=True,animations='disabled')
        assert not errors,errors
        print(name,w,h,'passed; full height',page.locator('html').bounding_box()['height'],flush=True)
        ctx.close()
    # Change feed contents without editing HTML; then take feeds offline.
    page = browser.new_page(service_workers='block')
    new = dict(latest, headline='Updated Nightcap',url=latest['previousUrl'], previousUrl=latest['url'])
    page.route('**/nightcap-latest.json',lambda r:r.fulfill(json=new))
    page.route('**/nfl-weekly-index.json',lambda r:r.fulfill(json={'current_week':12,'articles':[{'week':12,'title':'New football edition','date':'2026-11-30','url':'nfl.html'}]}))
    page.route('**/4dk-culture-headlines.json',lambda r:r.fulfill(json={'music':[{'title':'New Album File','date':'2026-12-01','url':'album-files.html'}]}))
    page.goto(base)
    expect(page.locator('#night-title')).to_have_text('Updated Nightcap')
    expect(page.locator('[data-nightcap-previous]')).to_have_attribute('href',latest['url'])
    expect(page.locator('[data-headline-nfl]')).to_contain_text('New football edition')
    expect(page.locator('[data-music]')).to_have_text('New Album File')
    page.route('**/*.json',lambda r:r.abort())
    page.reload(wait_until='domcontentloaded')
    expect(page.locator('[data-nightcap-link]')).to_have_attribute('href',latest['url'])
    expect(page.locator('[data-nfl-list] a').first).to_be_visible()
    browser.close()
server.shutdown()
