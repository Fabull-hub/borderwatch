// BorderTrend â News Aggregator Serverless Function
// bordertrend.com | Auto-deploys on Vercel

const RSS_FEEDS = [
  // ── SEIZED / INVESTIGATIONS ───────────────────────────────────────────
  { url: 'https://www.europol.europa.eu/rss.xml',                         source: 'Europol',              region: 'Europe',        badge: 'seized' },
  { url: 'https://www.occrp.org/en/feed',                                 source: 'OCCRP',               region: 'Global',        badge: 'seized' },
  { url: 'https://www.interpol.int/rss/News-and-media/News',              source: 'INTERPOL',            region: 'Global',        badge: 'seized' },
  { url: 'https://insightcrime.org/feed/',                                source: 'InSight Crime',        region: 'Latin America', badge: 'narco'  },
  { url: 'https://www.globalinitiative.net/feed/',                        source: 'Global Initiative',   region: 'Global',        badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml',                  source: 'UNODC',               region: 'Global',        badge: 'narco'  },
  { url: 'https://www.ice.gov/rss',                                       source: 'ICE',                 region: 'Americas',      badge: 'border' },

  // ── CARGO / TRADE ────────────────────────────────────────────────────
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx',            source: 'WCO',                 region: 'Global',        badge: 'cargo'  },
  { url: 'https://www.cbp.gov/rss.xml',                                  source: 'US CBP',              region: 'Americas',      badge: 'cargo'  },
  { url: 'https://www.freightwaves.com/news/feed',                       source: 'FreightWaves',        region: 'Global',        badge: 'cargo'  },
  { url: 'https://www.logisticsmgmt.com/rss/news',                      source: 'Logistics Mgmt',      region: 'Global',        badge: 'cargo'  },
  { url: 'https://www.supplychaindive.com/feeds/news/',                 source: 'Supply Chain Dive',   region: 'Global',        badge: 'cargo'  },

  // ── AIRPORT ──────────────────────────────────────────────────────────
  { url: 'https://www.tsa.gov/news-releases/feed',                      source: 'TSA',                 region: 'Americas',      badge: 'airport'},
  { url: 'https://www.airport-technology.com/feed/',                    source: 'Airport Technology',  region: 'Global',        badge: 'airport'},
  { url: 'https://aviationsourcenews.com/feed/',                        source: 'Aviation Source',     region: 'Global',        badge: 'airport'},
  { url: 'https://www.avsec.com/feed',                                  source: 'AVSEC',               region: 'Global',        badge: 'airport'},

  // ── LAND BORDER ──────────────────────────────────────────────────────
  { url: 'https://frontex.europa.eu/rss',                               source: 'Frontex',             region: 'Europe',        badge: 'border' },
  { url: 'https://www.borderreport.com/feed/',                          source: 'Border Report',       region: 'Americas',      badge: 'border' },
  { url: 'https://www.borderlandbeat.com/feeds/posts/default',         source: 'Borderland Beat',     region: 'Latin America', badge: 'border' },

  // ── HUMAN SMUGGLING ──────────────────────────────────────────────────
  { url: 'https://www.iom.int/rss.xml',                                 source: 'IOM',                 region: 'Global',        badge: 'human'  },
  { url: 'https://www.refworld.org/rss/news.xml',                       source: 'Refworld',            region: 'Global',        badge: 'human'  },
  { url: 'https://mixedmigration.org/feed/',                            source: 'Mixed Migration',     region: 'Global',        badge: 'human'  },
  { url: 'https://www.antislavery.org/feed/',                           source: 'Anti-Slavery Intl',   region: 'Global',        badge: 'human'  },

  // ── NARCOTICS ─────────────────────────────────────────────────────────
  { url: 'https://www.dea.gov/rss.xml',                                 source: 'DEA',                 region: 'Americas',      badge: 'narco'  },
  { url: 'https://www.emcdda.europa.eu/rss/news_en',                   source: 'EMCDDA',              region: 'Europe',        badge: 'narco'  },
  { url: 'https://www.talkingdrugs.org/feed',                          source: 'Talking Drugs',       region: 'Global',        badge: 'narco'  },

  // ── WEAPONS ──────────────────────────────────────────────────────────
  { url: 'https://www.sipri.org/rss.xml',                               source: 'SIPRI',               region: 'Global',        badge: 'weapons'},
  { url: 'https://smallarmssurvey.org/feed',                            source: 'Small Arms Survey',   region: 'Global',        badge: 'weapons'},
  { url: 'https://www.atf.gov/press-releases/rss.xml',                 source: 'ATF',                 region: 'Americas',      badge: 'weapons'},

  // ── MARITIME ─────────────────────────────────────────────────────────
  { url: 'https://www.imo.org/en/MediaCentre/PressBriefings/rss',      source: 'IMO',                 region: 'Global',        badge: 'maritime'},
  { url: 'https://gcaptain.com/feed/',                                  source: 'gCaptain',            region: 'Global',        badge: 'maritime'},
  { url: 'https://www.maritime-executive.com/rss',                     source: 'Maritime Executive',  region: 'Global',        badge: 'maritime'},
  { url: 'https://www.icc-ccs.org/index.php/1158-latest-news?format=feed&type=rss', source: 'ICC-CCS Piracy', region: 'Global', badge: 'maritime'},

  // ── WILDLIFE ─────────────────────────────────────────────────────────
  { url: 'https://cites.org/eng/news/rss.xml',                         source: 'CITES',               region: 'Global',        badge: 'wildlife'},
  { url: 'https://www.traffic.org/feed/',                               source: 'TRAFFIC',             region: 'Global',        badge: 'wildlife'},
  { url: 'https://www.wwf.org.uk/rss.xml',                             source: 'WWF',                 region: 'Global',        badge: 'wildlife'},

  // HIGH FREQUENCY NEWS SOURCES
  { url: 'https://feeds.reuters.com/reuters/topNews', source: 'Reuters', region: 'Global', badge: 'seized' },
  { url: 'https://rss.app/feeds/tQGNxCqLpPGpEzBR.xml', source: 'AP Border News', region: 'Americas', badge: 'border' },
  { url: 'https://thehill.com/policy/national-security/feed/', source: 'The Hill Security', region: 'Americas', badge: 'border' },
  { url: 'https://www.theguardian.com/world/drug-trade/rss', source: 'Guardian Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.theguardian.com/world/migration/rss', source: 'Guardian Migration', region: 'Global', badge: 'human' },
  { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World', region: 'Europe', badge: 'seized' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera', region: 'Global', badge: 'seized' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World', region: 'Global', badge: 'seized' },
  { url: 'https://www.politico.eu/feed/', source: 'Politico EU', region: 'Europe', badge: 'border' },
  { url: 'https://www.cbsnews.com/latest/rss/main', source: 'CBS News', region: 'Americas', badge: 'border' },
];

const BADGE_MAP = {
  narco: 'NARCOTICS', border: 'BORDER', cargo: 'CARGO',
  airport: 'AIRPORT', human: 'HUMAN SMUGGLING', seized: 'SEIZURES',
  weapons: 'WEAPONS', wildlife: 'WILDLIFE', maritime: 'MARITIME',
};

function parseRSS(xml, feedConfig) {
  const articles = [];
  try {
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [  // HIGH FREQUENCY NEWS SOURCES
  { url: 'https://feeds.reuters.com/reuters/topNews', source: 'Reuters', region: 'Global', badge: 'seized' },
  { url: 'https://thehill.com/policy/national-security/feed/', source: 'The Hill', region: 'Americas', badge: 'border' },
  { url: 'https://www.theguardian.com/world/drug-trade/rss', source: 'Guardian Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.theguardian.com/world/migration/rss', source: 'Guardian Migration', region: 'Global', badge: 'human' },
  { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World', region: 'Europe', badge: 'seized' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera', region: 'Global', badge: 'seized' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World', region: 'Global', badge: 'seized' },
  { url: 'https://www.cbsnews.com/latest/rss/main', source: 'CBS News', region: 'Americas', badge: 'border' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'DOJ', region: 'Americas', badge: 'seized' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA Releases', region: 'Americas', badge: 'narco' },
];
    for (const item of items.slice(0, 10)) {
      const title = (item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                     item.match(/<title[^>]*>([\s\S]*?)<\/title>/))?.[1]?.trim();
      const link = (item.match(/<link[^>]*>([\s\S]*?)<\/link>/) ||
                    item.match(/<guid[^>]*>(https?[^<]+)<\/guid>/))?.[1]?.trim();
      const description = (item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                           item.match(/<description[^>]*>([\s\S]*?)<\/description>/))?.[1]?.trim();
      const pubDate = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      if (title && link) {
        const cleanDesc = description
          ? description.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/<[^>]+>/g, ' ').replace(/\s+/g,' ').trim().substring(0, 200)
          : 'Read full story at source.';
        articles.push({
          headline: title.replace(/<[^>]+>/g, ''),
          summary: cleanDesc,
          url: link,
          source: feedConfig.source,
          region: feedConfig.region,
          badge: feedConfig.badge,
          badgeLabel: BADGE_MAP[feedConfig.badge] || feedConfig.badge.toUpperCase(),
          time: pubDate ? formatTime(new Date(pubDate)) : 'Recent',
          timeClass: pubDate && (Date.now() - new Date(pubDate)) < 3600000 ? 'time-recent' :
                     pubDate && (Date.now() - new Date(pubDate)) < 86400000 ? 'time-today' : 'time-old',
        });
      }
    }
  } catch (e) {}
  return articles;
}

function formatTime(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function guessBadge(text) {
  const t = text.toLowerCase();
  if (t.match(/drug|cocaine|fentanyl|heroin|meth|narc|opium|cannabis/)) return 'narco';
  if (t.match(/human.traffick|smuggl.*person|migrant.*smuggl|people.smuggl|forced.labour/)) return 'human';
  if (t.match(/weapon|firearm|gun|arms.traffick|ammunition|explosive/)) return 'weapons';
  if (t.match(/wildlife|ivory|rhino|pangolin|traffick.*animal|poach/)) return 'wildlife';
  if (t.match(/airport|passenger|terminal|aviation|inflight|luggage/)) return 'airport';
  if (t.match(/ship|vessel|maritime|coast.guard|port.seiz|submarine|seas/)) return 'maritime';
  if (t.match(/cargo|container|freight|import|export|shipment|counterfeit/)) return 'cargo';
  if (t.match(/seize|seized|arrest|bust|million|billion|operation|launder/)) return 'seized';
  return 'border';
}

async function fetchFeed(feed) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BorderTrend/1.0 (+https://bordertrend.com)' },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, feed);
  } catch { return []; }
}

// Race all feeds in parallel against a hard 10s deadline
async function fetchAllFeeds(feeds) {
  const deadline = new Promise(resolve =>
    setTimeout(() => resolve([]), 10000)
  );
  const allFetches = Promise.all(feeds.map(fetchFeed)).then(r => r.flat());
  return Promise.race([allFetches, deadline]);
}

async function fetchNewsAPI(key) {
  if (!key) return [];
  // Simple 1-2 word queries — NewsAPI free tier works best with these
  const queries = [
    { q: 'drug seizure',       badge: 'narco',    label: 'NARCOTICS',          region: 'Global' },
    { q: 'border smuggling',   badge: 'seized',   label: 'SEIZURES',           region: 'Global' },
    { q: 'cargo smuggling',    badge: 'cargo',    label: 'CARGO',              region: 'Global' },
    { q: 'airport security',   badge: 'airport',  label: 'AIRPORT',            region: 'Global' },
    { q: 'human trafficking',  badge: 'human',    label: 'HUMAN SMUGGLING',    region: 'Global' },
    { q: 'weapons trafficking',badge: 'weapons',  label: 'WEAPONS',            region: 'Global' },
    { q: 'coast guard drugs',  badge: 'maritime', label: 'MARITIME',           region: 'Global' },
    { q: 'wildlife poaching',  badge: 'wildlife', label: 'WILDLIFE TRAFFICKING',region: 'Global'},
    { q: 'border patrol',      badge: 'border',   label: 'LAND BORDER',        region: 'Global' },
  ];
  const articles = [];
  await Promise.all(queries.map(async (q) => {
    try {
      const res = await fetch(
        'https://newsapi.org/v2/everything' +
        '?q=' + encodeURIComponent(q.q) +
        '&language=en' +
        '&sortBy=publishedAt' +
        '&pageSize=10' +
        '&apiKey=' + key
      );
      if (!res.ok) return;
      const data = await res.json();
      if (!data.articles) return;
      data.articles.forEach(a => {
        if (!a.title || a.title === '[Removed]') return;
        articles.push({
          url: a.url, image: a.urlToImage || '',
          headline: a.title,
          summary: (a.description||'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().substring(0,200),
          source: a.source.name || 'NewsAPI',
          time: formatTime(new Date(a.publishedAt)),
          timeClass: 'time-today',
          region: q.region,
          badge: q.badge,
          badgeLabel: q.label,
        });
      });
    } catch(e) {}
  }));
  return articles;
}

// Pick freshest article from premium investigative sources for hero
function pickHero(articles) {
  const HERO_SOURCES = ['OCCRP','Europol','InSight Crime','Reuters World','Reuters US',
    'US CBP','DEA','UK NCA','Australia ABF','Frontex','INTERPOL','UNODC',
    'Global Witness','TRAFFIC (Wildlife)','US DOJ','FBI','US Coast Guard'];
  const cutoff = Date.now() - 48 * 3600000; // last 48h
  const candidates = articles
    .filter(a =>
      HERO_SOURCES.includes(a.source) &&
      a.summary && a.summary.length > 60 &&
      a.url &&
      (a.timeClass === 'time-recent' || a.timeClass === 'time-today')
    )
    .sort((a, b) => {
      // Prioritise time-recent over time-today
      if (a.timeClass !== b.timeClass) return a.timeClass === 'time-recent' ? -1 : 1;
      return 0;
    });
  if (candidates.length === 0) return null;
  const h = candidates[0];
  return {
    headline: h.headline,
    deck: h.summary.replace(/<[^>]+>/g,'').substring(0, 320),
    url: h.url,
    source: h.source,
    region: h.region,
    badge: h.badge,
    badgeLabel: h.badgeLabel,
    time: h.time,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60 ');

  const { category = 'all', page = '1' } = req.query;

  try {
    // Run RSS feeds and NewsAPI in parallel, RSS in batches
    const [feedResults, newsApiArticles] = await Promise.all([
      fetchAllFeeds(RSS_FEEDS),
      fetchNewsAPI(process.env.NEWSAPI_KEY),
    ]);

    let articles = [...feedResults.flat(), ...newsApiArticles];

    // Sort newest first
    const order = { 'time-recent': 0, 'time-today': 1, 'time-old': 2 };
    articles.sort((a, b) => (order[a.timeClass] ?? 2) - (order[b.timeClass] ?? 2));

    // Deduplicate
    const seen = new Set();
    articles = articles.filter(a => {
      const key = a.headline.substring(0, 60).toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

      // Re-badge articles using content analysis for better category coverage
  articles = articles.map(a => {
    const newBadge = guessBadge((a.headline || '') + ' ' + (a.summary || ''));
    // Only override 'border' or 'seized' badges with more specific ones
    if ((a.badge === 'border' || a.badge === 'seized') && newBadge !== 'border') {
      return Object.assign({}, a, { badge: newBadge, badgeLabel: BADGE_MAP[newBadge] || newBadge.toUpperCase() });
    }
    return a;
  });

  // Auto hero
    const hero = pickHero(articles);

    // Category filter
    const filtered = category !== 'all'
      ? articles.filter(a => a.badge === category)
      : articles;

    const pageNum = parseInt(page, 10) || 1;
    const perPage = 10;
    const paginated = filtered.slice((pageNum - 1) * perPage, pageNum * perPage);

    res.status(200).json({
      ok: true,
      total: filtered.length,
      page: pageNum,
      perPage,
      articles: paginated,
      hero,
      feedCount: RSS_FEEDS.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
