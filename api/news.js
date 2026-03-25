// BorderTrend â News Aggregator Serverless Function
// bordertrend.com | Auto-deploys on Vercel

const RSS_FEEDS = [

  // ── GLOBAL INTELLIGENCE (fastest, most reliable) ─────────────────────────
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.iom.int/rss.xml', source: 'IOM', region: 'Global', badge: 'human' },

  // ── INVESTIGATIVE JOURNALISM ─────────────────────────────────────────────
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://feeds.reuters.com/reuters/worldNews', source: 'Reuters World', region: 'Global', badge: 'border' },
  { url: 'https://www.globalwitness.org/en/feed/', source: 'Global Witness', region: 'Global', badge: 'cargo' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC (Wildlife)', region: 'Global', badge: 'wildlife' },
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.globalinitiative.net/feed/', source: 'Global Initiative Against Organized Crime', region: 'Global', badge: 'seized' },

  // ── US OFFICIAL ───────────────────────────────────────────────────────────
  { url: 'https://www.cbp.gov/newsroom/rss', source: 'US CBP', region: 'North America', badge: 'border' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'North America', badge: 'narco' },
  { url: 'https://www.atf.gov/rss.xml', source: 'ATF', region: 'North America', badge: 'weapons' },
  { url: 'https://www.ice.gov/rss.xml', source: 'ICE', region: 'North America', badge: 'border' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'North America', badge: 'seized' },
  { url: 'https://www.fbi.gov/feeds/fbi-in-the-news/rss.xml', source: 'FBI', region: 'North America', badge: 'seized' },
  { url: 'https://www.uscg.mil/rss/news/', source: 'US Coast Guard', region: 'North America', badge: 'maritime' },
  { url: 'https://www.dhs.gov/dhs-news-releases-rss', source: 'DHS', region: 'North America', badge: 'border' },

  // ── UK & COMMONWEALTH ────────────────────────────────────────────────────
  { url: 'https://www.nationalcrimeagency.gov.uk/news/rss', source: 'UK NCA', region: 'Europe', badge: 'seized' },
  { url: 'https://www.gov.uk/government/organisations/border-force.atom', source: 'UK Border Force', region: 'Europe', badge: 'border' },
  { url: 'https://www.abf.gov.au/about-us/news-media/media-releases/rss', source: 'Australia ABF', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.cbsa-asfc.gc.ca/media/rss-eng.xml', source: 'Canada CBSA', region: 'North America', badge: 'border' },

  // ── EUROPE ────────────────────────────────────────────────────────────────
  { url: 'https://www.zoll.de/SiteGlobals/Functions/RSSFeed/DE/RSSNewsfeed_Presse.xml', source: 'German Customs (Zoll)', region: 'Europe', badge: 'border' },
  { url: 'https://www.douane.gouv.fr/rss.xml', source: 'French Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.adm.gov.it/portale/rss', source: 'Italian Customs (ADM)', region: 'Europe', badge: 'border' },

  // ── LATIN AMERICA ─────────────────────────────────────────────────────────
  { url: 'https://www.inl.state.gov/rss/', source: 'US INL', region: 'Latin America', badge: 'narco' },
  { url: 'https://insightcrime.org/category/news/rss', source: 'InSight Crime Narcotics', region: 'Latin America', badge: 'narco' },

  // ── ASIA-PACIFIC ──────────────────────────────────────────────────────────
  { url: 'https://www.customs.gov.sg/news-and-media/press-releases/rss', source: 'Singapore Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.go.jp/english/rss.xml', source: 'Japan Customs', region: 'Asia-Pacific', badge: 'cargo' },

  // ── MIDDLE EAST ───────────────────────────────────────────────────────────
  { url: 'https://zatca.gov.sa/en/MediaCenter/News/Pages/rss.aspx', source: 'Saudi Customs (ZATCA)', region: 'Middle East', badge: 'cargo' },

  // ── AFRICA ────────────────────────────────────────────────────────────────
  { url: 'https://www.sars.gov.za/rss/media-releases.xml', source: 'South Africa SARS', region: 'Africa', badge: 'border' },
  { url: 'https://www.revenue.go.ke/rss', source: 'Kenya Revenue Authority', region: 'Africa', badge: 'border' },

  // ── FINANCIAL CRIMES ─────────────────────────────────────────────────────
  { url: 'https://www.transparency.org/en/rss', source: 'Transparency International', region: 'Global', badge: 'seized' },
  { url: 'https://www.fatf-gafi.org/en/publications/rss.xml', source: 'FATF', region: 'Global', badge: 'seized' },

  // ── WEAPONS & HUMAN ──────────────────────────────────────────────────────
  { url: 'https://www.sipri.org/rss/news', source: 'SIPRI', region: 'Global', badge: 'weapons' },
  { url: 'https://www.unodc.org/rss/unodc_human_trafficking_en.xml', source: 'UNODC Human Trafficking', region: 'Global', badge: 'human' },
  { url: 'https://www.unodc.org/rss/unodc_drugs_en.xml', source: 'UNODC Drugs', region: 'Global', badge: 'narco' },

  // ── MARITIME ─────────────────────────────────────────────────────────────
  { url: 'https://www.imo.org/en/MediaCentre/Pages/rss.aspx', source: 'IMO', region: 'Global', badge: 'maritime' },
];

const BADGE_MAP = {
  narco: 'NARCOTICS', border: 'BORDER', cargo: 'CARGO',
  airport: 'AIRPORT', human: 'HUMAN SMUGGLING', seized: 'SEIZURES',
  weapons: 'WEAPONS', wildlife: 'WILDLIFE', maritime: 'MARITIME',
};

function parseRSS(xml, feedConfig) {
  const articles = [];
  try {
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    for (const item of items.slice(0, 5)) {
      const title = (item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                     item.match(/<title[^>]*>([\s\S]*?)<\/title>/))?.[1]?.trim();
      const link = (item.match(/<link[^>]*>([\s\S]*?)<\/link>/) ||
                    item.match(/<guid[^>]*>(https?[^<]+)<\/guid>/))?.[1]?.trim();
      const description = (item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                           item.match(/<description[^>]*>([\s\S]*?)<\/description>/))?.[1]?.trim();
      const pubDate = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      if (title && link) {
        const cleanDesc = description
          ? description.replace(/<[^>]+>/g, '').substring(0, 200) + '...'
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
    const timer = setTimeout(() => controller.abort(), 2500);
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

async function fetchNewsAPI(apiKey) {
  const articles = [];
  if (!apiKey) return articles;
  const queries = [
    { q: 'smuggling OR "border seizure" OR "customs bust" OR contraband', badge: 'seized' },
    { q: '"drug seizure" OR "cocaine seized" OR fentanyl trafficking OR "narcotics bust"', badge: 'narco' },
    { q: '"human trafficking" OR "migrant smuggling" OR "people smuggling"', badge: 'human' },
    { q: '"arms trafficking" OR "weapons seized" OR "gun smuggling"', badge: 'weapons' },
    { q: '"wildlife trafficking" OR "ivory seizure" OR pangolin OR poaching', badge: 'wildlife' },
    { q: '"maritime seizure" OR "coast guard" drug OR "narco submarine"', badge: 'maritime' },
  ];
  const base = 'https://newsapi.org/v2/everything?language=en&sortBy=publishedAt&pageSize=10';
  const results = await Promise.all(queries.map(async ({ q, badge }) => {
    try {
      const res = await fetch(`${base}&q=${encodeURIComponent(q)}&apiKey=${apiKey}`);
      const data = await res.json();
      if (!data.articles) return [];
      return data.articles.map(a => ({
        headline: a.title,
        summary: a.description || '',
        url: a.url,
        source: a.source?.name || 'News',
        region: 'Global',
        badge,
        badgeLabel: BADGE_MAP[badge] || 'NEWS',
        time: formatTime(new Date(a.publishedAt)),
        timeClass: (Date.now() - new Date(a.publishedAt)) < 3600000 ? 'time-recent' :
                   (Date.now() - new Date(a.publishedAt)) < 86400000 ? 'time-today' : 'time-old',
        publishedAt: a.publishedAt,
        imageUrl: a.urlToImage || null,
      }));
    } catch { return []; }
  }));
  return results.flat();
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
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

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

    // Auto hero
    const hero = pickHero(articles);

    // Category filter
    const filtered = category !== 'all'
      ? articles.filter(a => a.badge === category)
      : articles;

    const pageNum = parseInt(page, 10) || 1;
    const perPage = 20;
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
