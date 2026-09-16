const albumTiers = {
  5: [
    { title: 'Illmatic', artist: 'Nas', key: 'nas', region: 'East', type: 'Album', era: '90s', bars: 10, production: 9.5, replay: 9.8, influence: 10 },
    { title: 'The Blueprint', artist: 'Jay-Z', key: 'jay-z', region: 'East', type: 'Album', era: '2000s', bars: 9.7, production: 10, replay: 9.8, influence: 9.8 },
    { title: 'All Eyez on Me', artist: '2Pac', key: '2pac', region: 'West', type: 'Album', era: '90s', bars: 9.4, production: 9.5, replay: 9.7, influence: 10 },
    { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', key: 'kendrick', region: 'West', type: 'Album', era: '2010s', bars: 9.6, production: 9.8, replay: 9.6, influence: 9.8 },
    { title: 'The Chronic', artist: 'Dr. Dre', key: 'dr-dre', region: 'West', type: 'Album', era: '90s', bars: 8.8, production: 10, replay: 9.7, influence: 10 },
    { title: 'Ready to Die', artist: 'The Notorious B.I.G.', key: 'biggie', region: 'East', type: 'Album', era: '90s', bars: 9.8, production: 9.5, replay: 9.6, influence: 10 },
    { title: 'Aquemini', artist: 'Outkast', key: 'outkast', region: 'South', type: 'Group', era: '90s', bars: 9.8, production: 9.7, replay: 9.6, influence: 9.8 },
    { title: 'Doggystyle', artist: 'Snoop Dogg', key: 'snoop', region: 'West', type: 'Album', era: '90s', bars: 8.9, production: 10, replay: 9.6, influence: 9.8 },
    { title: 'Tha Carter II', artist: 'Lil Wayne', key: 'wayne', region: 'South', type: 'Album', era: '2000s', bars: 9.8, production: 9.5, replay: 9.3, influence: 10 },
    { title: 'Enter the Wu-Tang (36 Chambers)', artist: 'Wu-Tang Clan', key: 'wu-tang', region: 'East', type: 'Group', era: '90s', bars: 9.8, production: 9.6, replay: 9.5, influence: 10 },
    { title: 'The Marshall Mathers LP', artist: 'Eminem', key: 'eminem', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.8, production: 9.4, replay: 9.5, influence: 9.8 },
    { title: 'My Beautiful Dark Twisted Fantasy', artist: 'Kanye West', key: 'kanye', region: 'Midwest', type: 'Album', era: '2010s', bars: 9.1, production: 10, replay: 9.6, influence: 9.6 },
    { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', key: 'kendrick', region: 'West', type: 'Album', era: '2010s', bars: 9.8, production: 9.9, replay: 9.1, influence: 10 },
    { title: 'Reasonable Doubt', artist: 'Jay-Z', key: 'jay-z', region: 'East', type: 'Album', era: '90s', bars: 9.8, production: 9.5, replay: 9.4, influence: 9.7 },
    { title: 'It Takes a Nation of Millions to Hold Us Back', artist: 'Public Enemy', key: 'public-enemy', region: 'East', type: 'Group', era: '80s', bars: 9.4, production: 9.2, replay: 8.9, influence: 10 }
  ],
  4: [
    { title: 'Me Against the World', artist: '2Pac', key: '2pac', region: 'West', type: 'Album', era: '90s', bars: 9.5, production: 9.3, replay: 9.5, influence: 9.8 },
    { title: '2001', artist: 'Dr. Dre', key: 'dr-dre', region: 'West', type: 'Album', era: '90s', bars: 8.8, production: 10, replay: 9.7, influence: 9.7 },
    { title: 'The Black Album', artist: 'Jay-Z', key: 'jay-z', region: 'East', type: 'Album', era: '2000s', bars: 9.5, production: 9.7, replay: 9.4, influence: 9.4 },
    { title: 'Stillmatic', artist: 'Nas', key: 'nas', region: 'East', type: 'Album', era: '2000s', bars: 9.7, production: 9.2, replay: 9.3, influence: 9.5 },
    { title: 'The Low End Theory', artist: 'A Tribe Called Quest', key: 'tribe', region: 'East', type: 'Group', era: '90s', bars: 9.2, production: 9.7, replay: 9.5, influence: 9.7 },
    { title: 'Midnight Marauders', artist: 'A Tribe Called Quest', key: 'tribe', region: 'East', type: 'Group', era: '90s', bars: 9.3, production: 9.7, replay: 9.5, influence: 9.6 },
    { title: 'Only Built 4 Cuban Linx…', artist: 'Raekwon', key: 'raekwon', region: 'East', type: 'Album', era: '90s', bars: 9.5, production: 9.7, replay: 9.2, influence: 9.6 },
    { title: 'Liquid Swords', artist: 'GZA', key: 'gza', region: 'East', type: 'Album', era: '90s', bars: 9.8, production: 9.6, replay: 9.2, influence: 9.5 },
    { title: 'Supreme Clientele', artist: 'Ghostface Killah', key: 'ghostface', region: 'East', type: 'Album', era: '2000s', bars: 9.7, production: 9.3, replay: 9.1, influence: 9.4 },
    { title: 'Get Rich or Die Tryin’', artist: '50 Cent', key: '50-cent', region: 'East', type: 'Album', era: '2000s', bars: 8.9, production: 9.7, replay: 9.8, influence: 9.6 },
    { title: 'Trap Muzik', artist: 'T.I.', key: 'ti', region: 'South', type: 'Album', era: '2000s', bars: 9.1, production: 9.3, replay: 9.4, influence: 9.6 },
    { title: 'Let’s Get It: Thug Motivation 101', artist: 'Jeezy', key: 'jeezy', region: 'South', type: 'Album', era: '2000s', bars: 8.9, production: 9.4, replay: 9.6, influence: 9.7 },
    { title: 'The Diary', artist: 'Scarface', key: 'scarface', region: 'South', type: 'Album', era: '90s', bars: 9.5, production: 9.1, replay: 9.1, influence: 9.6 },
    { title: 'The Documentary', artist: 'The Game', key: 'game', region: 'West', type: 'Album', era: '2000s', bars: 8.9, production: 9.4, replay: 9.4, influence: 9.2 },
    { title: 'Late Registration', artist: 'Kanye West', key: 'kanye', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.1, production: 9.9, replay: 9.4, influence: 9.5 }
  ],
  3: [
    { title: 'Dogg Food', artist: 'Tha Dogg Pound', key: 'dogg-pound', region: 'West', type: 'Group', era: '90s', bars: 9.0, production: 9.4, replay: 9.1, influence: 9.2 },
    { title: 'Victory Lap', artist: 'Nipsey Hussle', key: 'nipsey', region: 'West', type: 'Album', era: '2010s', bars: 8.9, production: 9.1, replay: 9.2, influence: 9.0 },
    { title: 'Da Drought 3', artist: 'Lil Wayne', key: 'wayne', region: 'South', type: 'Mixtape', era: '2000s', bars: 10, production: 8.9, replay: 9.8, influence: 9.9 },
    { title: 'Tha Carter', artist: 'Lil Wayne', key: 'wayne', region: 'South', type: 'Album', era: '2000s', bars: 9.2, production: 9.0, replay: 9.1, influence: 9.2 },
    { title: 'Muddy Waters', artist: 'Redman', key: 'redman', region: 'East', type: 'Album', era: '90s', bars: 9.4, production: 9.2, replay: 9.1, influence: 9.0 },
    { title: 'Hell Hath No Fury', artist: 'Clipse', key: 'clipse', region: 'South', type: 'Group', era: '2000s', bars: 9.7, production: 9.8, replay: 9.1, influence: 9.5 },
    { title: 'Ridin’ Dirty', artist: 'UGK', key: 'ugk', region: 'South', type: 'Group', era: '90s', bars: 9.2, production: 9.3, replay: 9.1, influence: 9.4 },
    { title: 'ATLiens', artist: 'Outkast', key: 'outkast', region: 'South', type: 'Group', era: '90s', bars: 9.5, production: 9.4, replay: 9.3, influence: 9.7 },
    { title: 'The Infamous', artist: 'Mobb Deep', key: 'mobb-deep', region: 'East', type: 'Group', era: '90s', bars: 9.6, production: 9.7, replay: 9.3, influence: 9.6 },
    { title: 'The Score', artist: 'Fugees', key: 'fugees', region: 'East', type: 'Group', era: '90s', bars: 9.1, production: 9.5, replay: 9.4, influence: 9.5 },
    { title: 'Food & Liquor', artist: 'Lupe Fiasco', key: 'lupe', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.6, production: 9.2, replay: 9.0, influence: 9.1 },
    { title: 'Piñata', artist: 'Freddie Gibbs & Madlib', key: 'gibbs', region: 'Midwest', type: 'Album', era: '2010s', bars: 9.4, production: 9.8, replay: 9.0, influence: 8.9 },
    { title: 'Be', artist: 'Common', key: 'common', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.3, production: 9.6, replay: 9.0, influence: 9.1 },
    { title: 'The College Dropout', artist: 'Kanye West', key: 'kanye', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.0, production: 9.7, replay: 9.5, influence: 9.6 },
    { title: 'The Eminem Show', artist: 'Eminem', key: 'eminem', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.4, production: 9.3, replay: 9.3, influence: 9.3 }
  ],
  2: [
    { title: 'Dedication 2', artist: 'Lil Wayne', key: 'wayne', region: 'South', type: 'Mixtape', era: '2000s', bars: 9.8, production: 8.7, replay: 9.6, influence: 9.8 },
    { title: 'No Ceilings', artist: 'Lil Wayne', key: 'wayne', region: 'South', type: 'Mixtape', era: '2000s', bars: 9.6, production: 8.8, replay: 9.5, influence: 9.5 },
    { title: 'Blank Face LP', artist: 'ScHoolboy Q', key: 'schoolboy-q', region: 'West', type: 'Album', era: '2010s', bars: 8.9, production: 9.2, replay: 8.9, influence: 8.6 },
    { title: 'Habits & Contradictions', artist: 'ScHoolboy Q', key: 'schoolboy-q', region: 'West', type: 'Album', era: '2010s', bars: 8.8, production: 9.0, replay: 8.7, influence: 8.4 },
    { title: 'Crenshaw', artist: 'Nipsey Hussle', key: 'nipsey', region: 'West', type: 'Mixtape', era: '2010s', bars: 8.8, production: 8.8, replay: 8.9, influence: 8.7 },
    { title: 'King', artist: 'T.I.', key: 'ti', region: 'South', type: 'Album', era: '2000s', bars: 8.8, production: 9.0, replay: 9.0, influence: 9.1 },
    { title: 'Urban Legend', artist: 'T.I.', key: 'ti', region: 'South', type: 'Album', era: '2000s', bars: 8.9, production: 9.0, replay: 8.8, influence: 9.0 },
    { title: 'The Recession', artist: 'Jeezy', key: 'jeezy', region: 'South', type: 'Album', era: '2000s', bars: 8.6, production: 8.9, replay: 8.8, influence: 8.9 },
    { title: 'Teflon Don', artist: 'Rick Ross', key: 'rick-ross', region: 'South', type: 'Album', era: '2010s', bars: 8.4, production: 9.4, replay: 8.9, influence: 8.8 },
    { title: 'DS2', artist: 'Future', key: 'future', region: 'South', type: 'Album', era: '2010s', bars: 8.1, production: 9.2, replay: 9.1, influence: 9.2 },
    { title: 'Cilvia Demo', artist: 'Isaiah Rashad', key: 'isaiah-rashad', region: 'South', type: 'Project', era: '2010s', bars: 8.8, production: 8.9, replay: 8.8, influence: 8.3 },
    { title: 'Acid Rap', artist: 'Chance the Rapper', key: 'chance', region: 'Midwest', type: 'Mixtape', era: '2010s', bars: 8.9, production: 9.0, replay: 9.0, influence: 9.0 },
    { title: 'Man on the Moon', artist: 'Kid Cudi', key: 'kid-cudi', region: 'Midwest', type: 'Album', era: '2000s', bars: 8.0, production: 9.0, replay: 9.1, influence: 9.4 },
    { title: 'The Cool', artist: 'Lupe Fiasco', key: 'lupe', region: 'Midwest', type: 'Album', era: '2000s', bars: 9.5, production: 9.1, replay: 8.8, influence: 8.9 },
    { title: 'The Sun’s Tirade', artist: 'Isaiah Rashad', key: 'isaiah-rashad', region: 'South', type: 'Album', era: '2010s', bars: 8.7, production: 9.1, replay: 8.9, influence: 8.4 }
  ],
  1: [
    { title: 'The Documentary 2', artist: 'The Game', key: 'game', region: 'West', type: 'Album', era: '2010s', bars: 8.5, production: 8.7, replay: 8.4, influence: 8.0 },
    { title: 'Yellow Album', artist: 'Dom Kennedy', key: 'dom-kennedy', region: 'West', type: 'Project', era: '2010s', bars: 8.1, production: 8.4, replay: 8.5, influence: 7.8 },
    { title: 'From the Westside with Love II', artist: 'Dom Kennedy', key: 'dom-kennedy', region: 'West', type: 'Project', era: '2010s', bars: 8.2, production: 8.5, replay: 8.6, influence: 7.9 },
    { title: 'K.R.I.T. Wuz Here', artist: 'Big K.R.I.T.', key: 'krit', region: 'South', type: 'Mixtape', era: '2010s', bars: 8.9, production: 8.8, replay: 8.7, influence: 8.7 },
    { title: 'Return of 4Eva', artist: 'Big K.R.I.T.', key: 'krit', region: 'South', type: 'Mixtape', era: '2010s', bars: 8.8, production: 8.8, replay: 8.6, influence: 8.6 },
    { title: 'Kush & Orange Juice', artist: 'Wiz Khalifa', key: 'wiz', region: 'Midwest', type: 'Mixtape', era: '2010s', bars: 7.9, production: 8.7, replay: 8.8, influence: 8.6 },
    { title: 'Friday Night Lights', artist: 'J. Cole', key: 'j-cole', region: 'South', type: 'Mixtape', era: '2010s', bars: 8.9, production: 8.7, replay: 8.8, influence: 8.8 },
    { title: 'The Warm Up', artist: 'J. Cole', key: 'j-cole', region: 'South', type: 'Mixtape', era: '2000s', bars: 8.7, production: 8.5, replay: 8.6, influence: 8.6 },
    { title: 'The Soul Tape 2', artist: 'Fabolous', key: 'fabolous', region: 'East', type: 'Mixtape', era: '2010s', bars: 8.8, production: 8.4, replay: 8.6, influence: 8.4 },
    { title: 'There Is No Competition 2', artist: 'Fabolous', key: 'fabolous', region: 'East', type: 'Mixtape', era: '2010s', bars: 8.7, production: 8.3, replay: 8.4, influence: 8.3 },
    { title: '4eva Is a Mighty Long Time', artist: 'Big K.R.I.T.', key: 'krit', region: 'South', type: 'Album', era: '2010s', bars: 9.0, production: 9.0, replay: 8.8, influence: 8.7 },
    { title: 'Alfredo', artist: 'Freddie Gibbs & The Alchemist', key: 'gibbs', region: 'Midwest', type: 'Album', era: '2020s', bars: 9.2, production: 9.5, replay: 8.7, influence: 8.4 },
    { title: 'Faces', artist: 'Mac Miller', key: 'mac-miller', region: 'East', type: 'Mixtape', era: '2010s', bars: 8.8, production: 9.0, replay: 8.6, influence: 8.7 },
    { title: 'Care for Me', artist: 'Saba', key: 'saba', region: 'Midwest', type: 'Album', era: '2010s', bars: 9.0, production: 8.9, replay: 8.5, influence: 8.2 },
    { title: 'Detroit', artist: 'Big Sean', key: 'big-sean', region: 'Midwest', type: 'Mixtape', era: '2010s', bars: 8.3, production: 8.5, replay: 8.4, influence: 8.2 }
  ]
};

const maxBudget = 15;
const maxPicks = 5;
const artistLimit = 2;
const selectedAlbums = [];

const draftSlotsEl = document.getElementById('draft-slots');
const budgetRemainingEl = document.getElementById('budget-remaining');
const budgetSpentEl = document.getElementById('budget-spent');
const draftCountEl = document.getElementById('draft-count');
const validationMessageEl = document.getElementById('validation-message');
const tiersContainerEl = document.getElementById('tiers-container');

const scoreEls = {
  bars: document.getElementById('bars-score'),
  production: document.getElementById('production-score'),
  replay: document.getElementById('replay-score'),
  influence: document.getElementById('influence-score'),
  diversity: document.getElementById('diversity-score'),
  overall: document.getElementById('overall-grade'),
  spent: document.getElementById('results-spent'),
  summary: document.getElementById('results-summary')
};

const fillEls = {
  bars: document.getElementById('bars-fill'),
  production: document.getElementById('production-fill'),
  replay: document.getElementById('replay-fill'),
  influence: document.getElementById('influence-fill'),
  diversity: document.getElementById('diversity-fill')
};

function flattenAlbums() {
  const all = [];
  Object.entries(albumTiers).forEach(([price, albums]) => {
    albums.forEach((album, index) => {
      all.push({ ...album, price: Number(price), id: `${price}-${index}` });
    });
  });
  return all;
}

const allAlbums = flattenAlbums();


/* ---------------------------------------------------------
   Album artwork
   Pulls matching cover art from Apple's public iTunes catalog.
   Mixtapes/unavailable projects keep a custom 4DK fallback tile.
   --------------------------------------------------------- */
const artworkCache = new Map();
const artworkPending = new Map();
const artworkTargets = new WeakMap();
let artworkRequestSeq = 0;

function artworkKey(album) {
  return `${album.artist}||${album.title}`;
}

function normalizeArtworkText(value = '') {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’'“”"()[\]{}:;,.!?…+\-_/]/g, ' ')
    .replace(/\b(deluxe|remastered|expanded|anniversary|explicit|version|edition)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function coverMonogram(title) {
  const words = normalizeArtworkText(title)
    .split(' ')
    .filter(word => word && !['the', 'a', 'an', 'of', 'and', 'to'].includes(word));
  if (!words.length) return '4K';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function regionClass(region) {
  return `region-${String(region).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function upgradeArtworkUrl(url) {
  if (!url) return '';
  return url
    .replace(/\/\d+x\d+bb\./, '/500x500bb.')
    .replace(/\/\d+x\d+-\d+bb\./, '/500x500-999bb.');
}

function scoreArtworkResult(result, album) {
  const wantedTitle = normalizeArtworkText(album.title);
  const wantedArtist = normalizeArtworkText(album.artist);
  const gotTitle = normalizeArtworkText(result.collectionName || '');
  const gotArtist = normalizeArtworkText(result.artistName || '');
  let score = 0;

  if (gotTitle === wantedTitle) score += 80;
  else if (gotTitle.includes(wantedTitle) || wantedTitle.includes(gotTitle)) score += 40;

  if (gotArtist === wantedArtist) score += 60;
  else {
    const wantedParts = wantedArtist.split(' ').filter(Boolean);
    const artistHits = wantedParts.filter(part => gotArtist.includes(part)).length;
    score += artistHits * 8;
  }

  if ((result.collectionType || '').toLowerCase() === 'album') score += 5;
  return score;
}

function requestAlbumArtwork(album) {
  const key = artworkKey(album);

  if (artworkCache.has(key)) {
    return Promise.resolve(artworkCache.get(key));
  }
  if (artworkPending.has(key)) {
    return artworkPending.get(key);
  }

  const promise = new Promise(resolve => {
    const callbackName = `fourdkAlbumArt_${Date.now()}_${artworkRequestSeq++}`;
    const script = document.createElement('script');
    let finished = false;

    const finish = (url = '') => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      script.remove();
      artworkCache.set(key, url);
      artworkPending.delete(key);
      resolve(url);
    };

    window[callbackName] = payload => {
      const results = Array.isArray(payload?.results) ? payload.results : [];
      const ranked = results
        .filter(item => item && item.artworkUrl100)
        .map(item => ({ item, score: scoreArtworkResult(item, album) }))
        .sort((a, b) => b.score - a.score);

      const best = ranked[0];
      const safeMatch = best && best.score >= 35 ? upgradeArtworkUrl(best.item.artworkUrl100) : '';
      finish(safeMatch);
    };

    script.onerror = () => finish('');
    const query = encodeURIComponent(`${album.artist} ${album.title}`);
    script.src = `https://itunes.apple.com/search?term=${query}&entity=album&limit=8&country=US&callback=${callbackName}`;
    script.async = true;
    document.body.appendChild(script);

    const timer = setTimeout(() => finish(''), 9000);
  });

  artworkPending.set(key, promise);
  return promise;
}

function loadArtworkTarget(target, album) {
  if (!target || target.dataset.artLoaded === '1') return;
  target.dataset.artLoaded = '1';

  requestAlbumArtwork(album).then(url => {
    if (!url || !target.isConnected) return;
    const img = target.querySelector('img');
    if (!img) return;

    img.onload = () => target.classList.add('has-art');
    img.onerror = () => {
      img.removeAttribute('src');
      target.classList.remove('has-art');
    };
    img.src = url;
  });
}

const artworkObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const album = artworkTargets.get(entry.target);
        artworkObserver.unobserve(entry.target);
        if (album) loadArtworkTarget(entry.target, album);
      });
    }, { rootMargin: '240px 0px' })
  : null;

function observeArtwork(target, album) {
  if (!target) return;
  artworkTargets.set(target, album);
  if (artworkObserver) artworkObserver.observe(target);
  else loadArtworkTarget(target, album);
}

function coverFallbackMarkup(album) {
  return `
    <div class="album-cover-fallback ${regionClass(album.region)}">
      <span>${coverMonogram(album.title)}</span>
      <small>4DK • ${album.type.toUpperCase()}</small>
    </div>
    <img class="album-cover-image" alt="${album.title} by ${album.artist} cover art" loading="lazy" decoding="async">
  `;
}


function artistCount(key) {
  return selectedAlbums.filter(album => album.key === key).length;
}

function getSpent() {
  return selectedAlbums.reduce((sum, album) => sum + album.price, 0);
}

function isSelected(id) {
  return selectedAlbums.some(album => album.id === id);
}

function toggleTier(block) {
  block.classList.toggle('open');
  const toggle = block.querySelector('.tier-toggle');
  toggle.textContent = block.classList.contains('open') ? 'Hide' : 'Show';
}

function createAlbumCard(album) {
  const card = document.createElement('article');
  card.className = 'album-card';
  card.dataset.id = album.id;

  const selected = isSelected(album.id);
  if (selected) card.classList.add('selected');

  card.innerHTML = `
    <div class="album-cover-wrap">
      ${coverFallbackMarkup(album)}
    </div>
    <div class="album-card-main">
      <div>
        <h5 class="album-title">${album.title}</h5>
        <p class="album-artist">${album.artist}</p>
      </div>
      <div class="album-tags">
        <span class="album-tag">${album.region}</span>
        <span class="album-tag">${album.type}</span>
        <span class="album-tag">${album.era}</span>
      </div>
      <div class="album-footer">
        <span class="album-price">$${album.price}</span>
        <button class="select-btn ${selected ? 'selected' : ''}" data-id="${album.id}">
          ${selected ? 'Remove' : 'Draft'}
        </button>
      </div>
    </div>
  `;

  observeArtwork(card.querySelector('.album-cover-wrap'), album);

  const button = card.querySelector('button');
  button.addEventListener('click', () => handleSelection(album.id));
  return card;
}

function renderTiers() {
  tiersContainerEl.innerHTML = '';

  [5, 4, 3, 2, 1].forEach((tier, tierIndex) => {
    const block = document.createElement('section');
    block.className = 'tier-block';
    if (tierIndex === 0) block.classList.add('open');

    const header = document.createElement('button');
    header.className = 'tier-header';
    header.type = 'button';
    header.innerHTML = `
      <div class="tier-title-wrap">
        <div class="tier-price-badge">$${tier}</div>
        <div>
          <h4>$${tier} Tier</h4>
          <p class="tier-sub">15 projects • all-time hip-hop picks</p>
        </div>
      </div>
      <span class="tier-toggle">${tierIndex === 0 ? 'Hide' : 'Show'}</span>
    `;
    header.addEventListener('click', () => toggleTier(block));

    const content = document.createElement('div');
    content.className = 'tier-content';
    const grid = document.createElement('div');
    grid.className = 'album-grid';

    albumTiers[tier].forEach((album, index) => {
      const fullAlbum = { ...album, price: tier, id: `${tier}-${index}` };
      grid.appendChild(createAlbumCard(fullAlbum));
    });

    content.appendChild(grid);
    block.appendChild(header);
    block.appendChild(content);
    tiersContainerEl.appendChild(block);
  });
}

function renderDraftSlots() {
  draftSlotsEl.innerHTML = '';

  for (let i = 0; i < maxPicks; i++) {
    const slot = document.createElement('div');
    const album = selectedAlbums[i];
    slot.className = 'draft-slot' + (album ? ' filled' : '');

    if (album) {
      slot.innerHTML = `
        <div class="slot-cover-wrap">
          ${coverFallbackMarkup(album)}
        </div>
        <div class="slot-index">Pick ${i + 1}</div>
        <div class="slot-title">${album.title}</div>
        <div class="slot-artist">${album.artist}</div>
        <div class="slot-meta">${album.region} • ${album.type} • ${album.era}</div>
        <div class="slot-price">$${album.price}</div>
      `;
      observeArtwork(slot.querySelector('.slot-cover-wrap'), album);
    } else {
      slot.innerHTML = `
        <div class="slot-index">Pick ${i + 1}</div>
        <div class="slot-title">Open Slot</div>
        <div class="slot-artist">Select a project from the board</div>
      `;
    }
    draftSlotsEl.appendChild(slot);
  }
}

function gradeLetter(score) {
  if (score >= 9.7) return 'A+';
  if (score >= 9.3) return 'A';
  if (score >= 8.9) return 'A-';
  if (score >= 8.5) return 'B+';
  if (score >= 8.0) return 'B';
  if (score >= 7.5) return 'B-';
  return 'C';
}

function computeDiversityScore() {
  if (!selectedAlbums.length) return 0;
  const uniqueRegions = new Set(selectedAlbums.map(album => album.region)).size;
  const uniqueEras = new Set(selectedAlbums.map(album => album.era)).size;
  const uniqueTypes = new Set(selectedAlbums.map(album => album.type)).size;
  const uniqueArtists = new Set(selectedAlbums.map(album => album.key)).size;

  let score = 6.8;
  score += uniqueRegions * 0.55;
  score += uniqueEras * 0.35;
  score += uniqueTypes * 0.25;
  score += Math.min(uniqueArtists, 5) * 0.12;

  if (selectedAlbums.length === 5 && getSpent() <= maxBudget) score += 0.25;
  return Math.min(10, Number(score.toFixed(1)));
}

function updateResults() {
  const spent = getSpent();
  budgetRemainingEl.textContent = `$${maxBudget - spent}`;
  budgetSpentEl.textContent = `$${spent}`;
  draftCountEl.textContent = `${selectedAlbums.length} / ${maxPicks}`;

  if (selectedAlbums.length < maxPicks) {
    validationMessageEl.textContent = `Draft ${maxPicks - selectedAlbums.length} more project${maxPicks - selectedAlbums.length === 1 ? '' : 's'} to grade your collection.`;
  } else {
    validationMessageEl.textContent = 'Collection locked. 4DK grades are live.';
  }

  if (selectedAlbums.length !== maxPicks) {
    ['bars', 'production', 'replay', 'influence', 'diversity'].forEach(key => {
      scoreEls[key].textContent = '—';
      fillEls[key].style.width = '0%';
    });
    scoreEls.overall.textContent = '—';
    scoreEls.spent.textContent = `$${spent}`;
    scoreEls.summary.textContent = 'Complete your 5 picks to unlock the 4DK grading report.';
    return;
  }

  const bars = Number((selectedAlbums.reduce((sum, album) => sum + album.bars, 0) / maxPicks).toFixed(1));
  const production = Number((selectedAlbums.reduce((sum, album) => sum + album.production, 0) / maxPicks).toFixed(1));
  const replay = Number((selectedAlbums.reduce((sum, album) => sum + album.replay, 0) / maxPicks).toFixed(1));
  const influence = Number((selectedAlbums.reduce((sum, album) => sum + album.influence, 0) / maxPicks).toFixed(1));
  const diversity = computeDiversityScore();
  const overallNumeric = Number(((bars + production + replay + influence + diversity) / 5).toFixed(1));
  const overall = gradeLetter(overallNumeric);

  const values = { bars, production, replay, influence, diversity };

  Object.entries(values).forEach(([key, value]) => {
    scoreEls[key].textContent = `${value}/10`;
    fillEls[key].style.width = `${value * 10}%`;
  });

  scoreEls.overall.textContent = overall;
  scoreEls.spent.textContent = `$${spent} / $${maxBudget}`;

  const summaryParts = [];
  if (bars >= 9.4) summaryParts.push('crazy bar work');
  if (production >= 9.3) summaryParts.push('strong production taste');
  if (replay >= 9.2) summaryParts.push('elite replay value');
  if (influence >= 9.4) summaryParts.push('heavy cultural impact');
  if (diversity >= 9.0) summaryParts.push('real regional and era variety');

  const summaryText = summaryParts.length
    ? `This collection grades out at ${overall} overall with ${summaryParts.join(', ')}.`
    : `This collection grades out at ${overall} overall. Tighten the balance if you want a more well-rounded 4DK draft.`;

  scoreEls.summary.textContent = summaryText;
}

function syncCards() {
  renderDraftSlots();
  renderTiers();
  updateResults();
}

function handleSelection(id) {
  const album = allAlbums.find(item => item.id === id);
  if (!album) return;

  const selectedIndex = selectedAlbums.findIndex(item => item.id === id);
  if (selectedIndex >= 0) {
    selectedAlbums.splice(selectedIndex, 1);
    syncCards();
    return;
  }

  if (selectedAlbums.length >= maxPicks) {
    validationMessageEl.textContent = 'You already drafted 5 projects. Remove one to add another.';
    return;
  }

  if (getSpent() + album.price > maxBudget) {
    validationMessageEl.textContent = 'That pick would push you over the $15 budget.';
    return;
  }

  if (artistCount(album.key) >= artistLimit) {
    validationMessageEl.textContent = '2-ALBUM ARTIST LIMIT — you already drafted the max from this artist.';
    return;
  }

  selectedAlbums.push(album);
  syncCards();
}

function resetDraft() {
  selectedAlbums.splice(0, selectedAlbums.length);
  syncCards();
}

function randomDraft() {
  resetDraft();
  const shuffled = [...allAlbums].sort(() => Math.random() - 0.5);
  for (const album of shuffled) {
    if (selectedAlbums.length >= maxPicks) break;
    if (getSpent() + album.price > maxBudget) continue;
    if (artistCount(album.key) >= artistLimit) continue;
    selectedAlbums.push(album);
  }
  syncCards();
}

document.getElementById('reset-btn').addEventListener('click', resetDraft);
document.getElementById('random-draft-btn').addEventListener('click', randomDraft);

renderDraftSlots();
renderTiers();
updateResults();
