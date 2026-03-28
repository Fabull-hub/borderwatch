// BorderTrend - News Aggregator API
// bordertrend.com | Vercel Serverless

const RSS_FEEDS = [
  // SEIZED / INVESTIGATIONS
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.globalinitiative.net/feed/', source: 'Global Initiative', region: 'Global', badge: 'seized' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'Americas', badge: 'seized' },

  // NARCOTICS
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'Americas', badge: 'narco' },
  { url: 'https://www.emcdda.europa.eu/rss/news_en', source: 'EMCDDA', region: 'Europe', badge: 'narco' },
  { url: 'https://www.talkingdrugs.org/feed', source: 'Talking Drugs', region: 'Global', badge: 'narco' },

  // CARGO / TRADE
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss.xml', source: 'US CBP', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.freightwaves.com/news/feed', source: 'FreightWaves', region: 'Global', badge: 'cargo' },
  { url: 'https://www.supplychaindive.com/feeds/news/', source: 'Supply Chain Dive', region: 'Global', badge: 'cargo' },
  { url: 'https://www.logisticsmgmt.com/rss/news', source: 'Logistics Mgmt', region: 'Global', badge: 'cargo' },

  // AIRPORT
  { url: 'https://www.tsa.gov/news-releases/feed', source: 'TSA', region: 'Americas', badge: 'airport' },
  { url: 'https://www.airport-technology.com/feed/', source: 'Airport Technology', region: 'Global', badge: 'airport' },
  { url: 'https://aviationsourcenews.com/feed/', source: 'Aviation Source', region: 'Global', badge: 'airport' },

  // LAND BORDER
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://www.borderreport.com/feed/', source: 'Border Report', region: 'Americas', badge: 'border' },
  { url: 'https://www.borderlandbeat.com/feeds/posts/default', source: 'Borderland Beat', region: 'Latin America', badge: 'border' },
  { url: 'https://www.ice.gov/rss', source: 'ICE', region: 'Americas', badge: 'border' },

  // HUMAN SMUGGLING
  { url: 'https://www.iom.int/rss.xml', source: 'IOM', region: 'Global', badge: 'human' },
  { url: 'https://mixedmigration.org/feed/', source: 'Mixed Migration', region: 'Global', badge: 'human' },
  { url: 'https://www.antislavery.org/feed/', source: 'Anti-Slavery Intl', region: 'Global', badge: 'human' },
  { url: 'https://www.theguardian.com/world/migration/rss', source: 'Guardian Migration', region: 'Global', badge: 'human' },

  // WEAPONS
  { url: 'https://www.sipri.org/rss.xml', source: 'SIPRI', region: 'Global', badge: 'weapons' },
  { url: 'https://smallarmssurvey.org/feed', source: 'Small Arms Survey', region: 'Global', badge: 'weapons' },
  { url: 'https://www.atf.gov/press-releases/rss.xml', source: 'ATF', region: 'Americas', badge: 'weapons' },

  // MARITIME
  { url: 'https://gcaptain.com/feed/', source: 'gCaptain', region: 'Global', badge: 'maritime' },
  { url: 'https://www.maritime-executive.com/rss', source: 'Maritime Executive', region: 'Global', badge: 'maritime' },
  { url: 'https://www.imo.org/en/MediaCentre/PressBriefings/rss', source: 'IMO', region: 'Global', badge: 'maritime' },
  { url: 'https://www.icc-ccs.org/index.php/1158-latest-news?format=feed&type=rss', source: 'ICC-CCS', region: 'Global', badge: 'maritime' },

  // WILDLIFE TRAFFICKING
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.wwf.org.uk/rss.xml', source: 'WWF', region: 'Global', badge: 'wildlife' },

  // GEOPOLITICS (only sources that post geopolitics-relevant border security news)
  { url: 'https://www.theguardian.com/world/drug-trade/rss', source: 'Guardian Drugs', region: 'Global', badge: 'geopolitics' },
  { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World', region: 'Europe', badge: 'geopolitics' },
  { url: 'https://thehill.com/policy/national-security/feed/', source: 'The Hill', region: 'Americas', badge: 'geopolitics' },
];

const BADGE_MAP = {
  narco: 'NARCOTICS', border: 'LAND BORDER', cargo: 'CARGO', airport: 'AIRPORT',
  human: 'HUMAN SMUGGLING', seized: 'SEIZURES', weapons: 'WEAPONS',
  wildlife: 'WILDLIFE TRAFFICKING', maritime: 'MARITIME', geopolitics: 'GEOPOLITICS',
};

// Keywords that indicate an article belongs in a specific category
function guessBadge(text) {
  const t = (text || '').toLowerCase();
  if (t.match(/cocaine|fentanyl|heroin|methamphetamine|cannabis.*seiz|drug.*traffic|narco|cartel|opium/)) return 'narco';
  if (t.match(/human.traffick|sex.traffic|forced.labour|forced.labor|migrant.*smuggl|people.smuggl/)) return 'human';
  if (t.match(/illegal.*weapon|arms.traffick|gun.*smuggl|firearm.*seiz|weapons.*smuggl/)) return 'weapons';
  if (t.match(/wildlife.*traffic|ivory.*seiz|rhino.*poach|pangolin|illegal.*animal|tiger.*seiz/)) return 'wildlife';
  if (t.match(/airport.*drug|airport.*seiz|passenger.*smuggl|luggage.*drug|aviation.*security.*seiz/)) return 'airport';
  if (t.match(/coast.guard.*seiz|vessel.*drug|maritime.*smuggl|boat.*drug|submarine.*smuggl/)) return 'maritime';
  if (t.match(/cargo.*seiz|container.*drug|customs.*bust|freight.*smuggl|trade.*fraud.*seiz/)) return 'cargo';
  if (t.match(/border.patrol.*seiz|border.*drug|checkpoint.*seiz|customs.*arrest/)) return 'border';
  if (t.match(/sanction|diplomac|treaty|geopolit|military.*conflict|missile|nuclear.deal/)) return 'geopolitics';
  if (t.match(/seized|bust|arrested.*smuggl|smuggling.ring|trafficking.bust|contraband/)) return 'seized';
  return null;
}

function parseRSS(xml, feed) {
  const articles = [];
  try {
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    for (const item of items.slice(0, 15)) {
      const title = (item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || item.match(/<title[^>]*>([\s\S]*?)<\/title>/))?.[1]?.trim();
      const link = (item.match(/<link[^>]*>([\s\S]*?)<\/link>/) || item.match(/<guid[^>]*>(https?[^<]+)<\/guid>/))?.[1]?.trim();
      const desc = (item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || item.match(/<description[^>]*>([\s\S]*?)<\/description>/))?.[1]?.trim();
      const pub = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      if (!title || !link) continue;

      const cleanTitle = title.replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
      const cleanDesc = (desc || '').replace(/<[^>]+>/g, '').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").substring(0, 250);

      const pubDate = pub ? new Date(pub) : null;
      const ageMs = pubDate ? Date.now() - pubDate.getTime() : 0;
      const timeClass = ageMs < 3600000 ? 'time-recent' : ageMs < 86400000 ? 'time-today' : 'time-old';

      // Skip articles older than 30 days
      if (ageMs > 30 * 86400000) continue;

      // Skip clearly irrelevant content
      const lower = cleanTitle.toLowerCase();
      const skipWords = ['obituary', '60 minutes arch', 'archive', 'in memoriam', 'recipe', 'horoscope', 'sports results', 'box scores'];
      if (skipWords.some(w => lower.includes(w))) continue;

      articles.push({
        headline: cleanTitle,
        summary: cleanDesc,
        url: link,
        source: feed.source,
        region: feed.region,
        badge: feed.badge,
        badgeLabel: BADGE_MAP[feed.badge] || feed.badge.toUpperCase(),
        time: pubDate ? formatTime(pubDate) : 'Recent',
        timeClass,
        _pubDate: pub,
      });
    }
  } catch (e) {}
  return articles;
}

function formatTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return mins + 'm ago';
  if (hours < 24) return hours + 'h ago';
  return days + 'd ago';
}

async function fetchFeed(feed) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BorderTrend/1.0 (+https://bordertrend.com)' }
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, feed);
  } catch { return []; }
}

async function fetchAllFeeds() {
  const deadline = new Promise(resolve => setTimeout(() => resolve('timeout'), 14000));
  const all = Promise.all(RSS_FEEDS.map(fetchFeed)).then(r => r.flat());
  const result = await Promise.race([all, deadline]);
  return result === 'timeout' ? [] : result;
}

async function fetchNewsAPI(key) {
  if (!key) return [];
  const queries = [
    { q: 'drug seizure smuggling arrested', badge: 'narco', label: 'NARCOTICS' },
    { q: 'border seizure customs bust', badge: 'seized', label: 'SEIZURES' },
    { q: 'cargo smuggling container seized', badge: 'cargo', label: 'CARGO' },
    { q: 'airport drugs security seized', badge: 'airport', label: 'AIRPORT' },
    { q: 'human trafficking smuggling arrested', badge: 'human', label: 'HUMAN SMUGGLING' },
    { q: 'weapons firearms smuggling seized', badge: 'weapons', label: 'WEAPONS' },
    { q: 'coast guard maritime drugs boat', badge: 'maritime', label: 'MARITIME' },
    { q: 'wildlife poaching ivory trafficking', badge: 'wildlife', label: 'WILDLIFE TRAFFICKING' },
    { q: 'border patrol checkpoint land border', badge: 'border', label: 'LAND BORDER' },
  ];
  const articles = [];
  await Promise.all(queries.map(async (q) => {
    try {
      const res = await fetch('https://newsapi.org/v2/everything?q=' + encodeURIComponent(q.q) + '&language=en&sortBy=publishedAt&pageSize=10&apiKey=' + key);
      if (!res.ok) return;
      const data = await res.json();
      if (!data.articles) return;
      data.articles.forEach(a => {
        if (!a.title || a.title === '[Removed]') return;
        articles.push({
          headline: a.title,
          summary: a.description || '',
          url: a.url,
          source: a.source.name || 'NewsAPI',
          region: 'Global',
          badge: q.badge,
          badgeLabel: q.label,
          time: formatTime(a.publishedAt),
          timeClass: 'time-today',
          _pubDate: a.publishedAt,
        });
      });
    } catch(e) {}
  }));
  return articles;
}

// General news sources — only pass through if guessBadge finds a specific match
const GENERAL_NEWS_SOURCES = ['CBS News', 'BBC World', 'Al Jazeera', 'DW World', 'Reuters', 'Reuters World', 'The Hill', 'Guardian Migration', 'Guardian Drugs'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const [feedResults, newsApiArticles] = await Promise.all([
      fetchAllFeeds(),
      fetchNewsAPI(process.env.NEWSAPI_KEY),
    ]);

    let articles = [...feedResults, ...newsApiArticles];

    // Re-badge general news — only keep if guessBadge finds a specific match
    articles = articles.map(a => {
      if (GENERAL_NEWS_SOURCES.includes(a.source)) {
        const guessed = guessBadge(a.headline + ' ' + a.summary);
        if (guessed) return Object.assign({}, a, { badge: guessed, badgeLabel: BADGE_MAP[guessed] || guessed });
        return null; // Drop off-topic general news entirely
      }
      return a;
    }).filter(Boolean);

    // Sort: recent first
    const order = { 'time-recent': 0, 'time-today': 1, 'time-old': 2 };
    articles.sort((a, b) => (order[a.timeClass] ?? 2) - (order[b.timeClass] ?? 2));

    // Deduplicate by headline
    const seen = new Set();
    articles = articles.filter(a => {
      const key = (a.headline || '').substring(0, 60).toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Return ALL articles — no pagination cap
    const { category = 'all' } = req.query;
    const filtered = category !== 'all' ? articles.filter(a => a.badge === category) : articles;

    res.status(200).json({
      ok: true,
      total: filtered.length,
      articles: filtered,
      feedCount: RSS_FEEDS.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
