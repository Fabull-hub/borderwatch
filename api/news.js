// BorderTrend â News Aggregator Serverless Function
// Deploys automatically on Vercel as /api/news

const RSS_FEEDS = [
  // US Official
  { url: 'https://www.cbp.gov/newsroom/rss', source: 'US CBP', region: 'North America', badge: 'border' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'North America', badge: 'narco' },
  { url: 'https://www.atf.gov/rss.xml', source: 'ATF', region: 'North America', badge: 'weapons' },
  { url: 'https://www.ice.gov/rss.xml', source: 'ICE', region: 'North America', badge: 'border' },
  // EU / International
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  // News Media
  { url: 'https://feeds.reuters.com/reuters/worldNews', source: 'Reuters', region: 'Global', badge: 'border' },
  { url: 'https://rss.app/feeds/border-security.xml', source: 'AP News', region: 'Global', badge: 'border' },
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://www.globalwitness.org/en/feed/', source: 'Global Witness', region: 'Global', badge: 'cargo' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC', region: 'Global', badge: 'wildlife' },
];

const BADGE_MAP = {
  narco: 'NARCOTICS',
  border: 'BORDER',
  cargo: 'CARGO',
  airport: 'AIRPORT',
  human: 'HUMAN SMUGGLING',
  seized: 'SEIZURES',
  weapons: 'WEAPONS',
  wildlife: 'WILDLIFE',
  maritime: 'MARITIME',
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
  } catch (e) {
    // Silently skip malformed feeds
  }
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

async function fetchFeed(feed) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BorderTrend/1.0 News Aggregator' },
    });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, feed);
  } catch {
    return [];
  }
}

async function fetchNewsAPI(apiKey) {
  const articles = [];
  if (!apiKey) return articles;

  const query = 'smuggling OR "border seizure" OR trafficking OR "customs bust" OR contraband';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.articles) {
      for (const a of data.articles) {
        const badge = guessBadge(a.title + ' ' + (a.description || ''));
        articles.push({
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
        });
      }
    }
  } catch { /* skip */ }
  return articles;
}

function guessBadge(text) {
  const t = text.toLowerCase();
  if (t.includes('drug') || t.includes('cocaine') || t.includes('fentanyl') || t.includes('heroin') || t.includes('meth')) return 'narco';
  if (t.includes('human') || t.includes('migrant') || t.includes('trafficking') || t.includes('smuggl')) return 'human';
  if (t.includes('weapon') || t.includes('gun') || t.includes('firearm') || t.includes('arms')) return 'weapons';
  if (t.includes('wildlife') || t.includes('ivory') || t.includes('rhino') || t.includes('pangolin')) return 'wildlife';
  if (t.includes('airport') || t.includes('passenger') || t.includes('luggage') || t.includes('terminal')) return 'airport';
  if (t.includes('ship') || t.includes('vessel') || t.includes('coast guard') || t.includes('maritime') || t.includes('port')) return 'maritime';
  if (t.includes('cargo') || t.includes('container') || t.includes('freight') || t.includes('import') || t.includes('export')) return 'cargo';
  if (t.includes('seize') || t.includes('seized') || t.includes('arrest') || t.includes('million') || t.includes('billion')) return 'seized';
  return 'border';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

  const { category = 'all', page = '1' } = req.query;

  try {
    const feedResults = await Promise.all(RSS_FEEDS.map(fetchFeed));
    let articles = feedResults.flat();
    const newsApiArticles = await fetchNewsAPI(process.env.NEWSAPI_KEY);
    articles = [...articles, ...newsApiArticles];
    if (category !== 'all') articles = articles.filter(a => a.badge === category);
    const order = { 'time-recent': 0, 'time-today': 1, 'time-old': 2 };
    articles.sort((a, b) => (order[a.timeClass] ?? 2) - (order[b.timeClass] ?? 2));
    const seen = new Set();
    articles = articles.filter(a => {
      const key = a.headline.substring(0, 60).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const pageNum = parseInt(page, 10) || 1;
    const perPage = 20;
    const total = articles.length;
    const paginated = articles.slice((pageNum - 1) * perPage, pageNum * perPage);
    res.status(200).json({ ok: true, total, page: pageNum, perPage, articles: paginated, fetchedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
