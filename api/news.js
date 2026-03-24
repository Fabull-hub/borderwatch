// BorderTrend â News Aggregator Serverless Function
// Deploys automatically on Vercel as /api/news

const RSS_FEEDS = [

  // ââ GLOBAL INTELLIGENCE AGENCIES âââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },

  // ââ US OFFICIAL AGENCIES ââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.cbp.gov/newsroom/rss', source: 'US CBP', region: 'North America', badge: 'border' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'North America', badge: 'narco' },
  { url: 'https://www.atf.gov/rss.xml', source: 'ATF', region: 'North America', badge: 'weapons' },
  { url: 'https://www.ice.gov/rss.xml', source: 'ICE', region: 'North America', badge: 'border' },
  { url: 'https://www.dhs.gov/dhs-news-releases-rss', source: 'DHS', region: 'North America', badge: 'border' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'North America', badge: 'seized' },
  { url: 'https://www.trade.gov/rss.xml', source: 'US Trade.gov', region: 'North America', badge: 'cargo' },

  // ââ UK & COMMONWEALTH ââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.gov.uk/search/news-and-communications.atom?keywords=customs+smuggling+border', source: 'UK Gov', region: 'Europe', badge: 'border' },
  { url: 'https://www.nationalcrimeagency.gov.uk/news/rss', source: 'UK NCA', region: 'Europe', badge: 'seized' },
  { url: 'https://www.abf.gov.au/about-us/news-media/media-releases/rss', source: 'Australia ABF', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.cbsa-asfc.gc.ca/media/rss-eng.xml', source: 'Canada CBSA', region: 'North America', badge: 'border' },
  { url: 'https://www.customs.govt.nz/news/rss/', source: 'New Zealand Customs', region: 'Asia-Pacific', badge: 'border' },

  // ââ EUROPE NATIONAL CUSTOMS ââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.zoll.de/SiteGlobals/Functions/RSSFeed/DE/RSSNewsfeed_Presse.xml', source: 'German Customs (Zoll)', region: 'Europe', badge: 'border' },
  { url: 'https://www.douane.gouv.fr/rss.xml', source: 'French Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.agenciatributaria.es/rss/aeat/noticias.xml', source: 'Spanish Customs (AEAT)', region: 'Europe', badge: 'border' },
  { url: 'https://www.adm.gov.it/portale/rss', source: 'Italian Customs (ADM)', region: 'Europe', badge: 'border' },
  { url: 'https://www.belastingdienst.nl/rss/nieuws.xml', source: 'Dutch Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.revenue.ie/en/corporate/press-office/news-releases/rss.aspx', source: 'Irish Revenue (Customs)', region: 'Europe', badge: 'border' },
  { url: 'https://ec.europa.eu/taxation_customs/news/rss_en', source: 'EU Taxation & Customs', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.src.am/en/rss', source: 'Armenia Customs', region: 'Middle East', badge: 'border' },

  // ââ LATIN AMERICA âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.inl.state.gov/rss/', source: 'US INL (Drug Policy Americas)', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.sat.gob.mx/rss/noticias', source: 'Mexico Customs (SAT)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.afip.gob.ar/rss/noticias.xml', source: 'Argentina Customs (AFIP)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.receita.fazenda.gov.br/rss/noticias.xml', source: 'Brazil Customs (Receita Federal)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.sunat.gob.pe/rss/noticias.xml', source: 'Peru Customs (SUNAT)', region: 'Latin America', badge: 'border' },

  // ââ ASIA-PACIFIC ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.customs.gov.sg/news-and-media/press-releases/rss', source: 'Singapore Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.my/en/rss', source: 'Malaysia Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.go.jp/english/rss.xml', source: 'Japan Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.go.kr/english/na/ntt/selectNttList.do?mi=11403&bbsId=11403', source: 'Korea Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.ph/news/rss', source: 'Philippines Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.in/rss/news.xml', source: 'India Customs (CBIC)', region: 'Asia-Pacific', badge: 'border' },

  // ââ MIDDLE EAST & AFRICA ââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://zatca.gov.sa/en/MediaCenter/News/Pages/rss.aspx', source: 'Saudi Customs (ZATCA)', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.ae/en/media-center/news/rss', source: 'UAE Federal Customs', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.revenue.go.ke/rss', source: 'Kenya Revenue Authority', region: 'Africa', badge: 'border' },
  { url: 'https://www.sars.gov.za/rss/media-releases.xml', source: 'South Africa SARS', region: 'Africa', badge: 'border' },

  // ââ INVESTIGATIVE & MEDIA SOURCES âââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://feeds.reuters.com/reuters/worldNews', source: 'Reuters', region: 'Global', badge: 'border' },
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://www.globalwitness.org/en/feed/', source: 'Global Witness', region: 'Global', badge: 'cargo' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC', region: 'Global', badge: 'wildlife' },
  { url: 'https://rss.app/feeds/border-security.xml', source: 'AP News (Border)', region: 'Global', badge: 'border' },
  { url: 'https://www.thedrugstorefoundation.org/feed', source: 'Drug Policy Foundation', region: 'Global', badge: 'narco' },

  // ââ EXCEL SOURCES â Afghanistan, Andorra, Algeria, Armenia, Australia ââââââ
  { url: 'https://customs.mof.gov.af/category/news/feed', source: 'Afghanistan Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.duana.ad/feed', source: 'Andorra Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.douane.gov.dz/index.php/en/component/k2/itemlist/tag/rss?format=feed', source: 'Algeria Customs', region: 'Africa', badge: 'border' },
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
  if (t.match(/drug|cocaine|fentanyl|heroin|meth|narc|opium/)) return 'narco';
  if (t.match(/human.traffick|smuggl.*person|migrant.*smuggl|people.smuggl/)) return 'human';
  if (t.match(/weapon|firearm|gun|arms.traffick|ammunition/)) return 'weapons';
  if (t.match(/wildlife|ivory|rhino|pangolin|traffick.*animal/)) return 'wildlife';
  if (t.match(/airport|passenger|terminal|aviation|inflight/)) return 'airport';
  if (t.match(/ship|vessel|maritime|coast.guard|port.seiz|submarine/)) return 'maritime';
  if (t.match(/cargo|container|freight|import|export|shipment/)) return 'cargo';
  if (t.match(/seize|seized|arrest|bust|million|billion|operation/)) return 'seized';
  return 'border';
}

async function fetchFeed(feed) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BorderTrend/1.0 (+https://bordertrend.com)' },
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
  const query = 'smuggling OR "border seizure" OR trafficking OR "customs bust" OR contraband OR "drug seizure"';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`;
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
  } catch {}
  return articles;
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

    if (category !== 'all') {
      articles = articles.filter(a => a.badge === category);
    }

    const order = { 'time-recent': 0, 'time-today': 1, 'time-old': 2 };
    articles.sort((a, b) => (order[a.timeClass] ?? 2) - (order[b.timeClass] ?? 2));

    const seen = new Set();
    articles = articles.filter(a => {
      const key = a.headline.substring(0, 60).toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const pageNum = parseInt(page, 10) || 1;
    const perPage = 20;
    const total = articles.length;
    const paginated = articles.slice((pageNum - 1) * perPage, pageNum * perPage);

    res.status(200).json({
      ok: true, total, page: pageNum, perPage,
      articles: paginated,
      feedCount: RSS_FEEDS.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
