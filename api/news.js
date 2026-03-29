// BorderTrend - News Aggregator API
// bordertrend.com | Vercel Serverless

const RSS_FEEDS = [
  // SEIZURES / INVESTIGATIONS
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'Americas', badge: 'seized' },
  { url: 'https://www.fbi.gov/feeds/fbi-in-the-news/rss.xml', source: 'FBI', region: 'Americas', badge: 'seized' },
  { url: 'https://www.globalinitiative.net/feed/', source: 'Global Initiative', region: 'Global', badge: 'seized' },
  { url: 'https://homelandprepnews.com/feed', source: 'Homeland Prep News', region: 'Americas', badge: 'seized' },
  { url: 'https://www.hstoday.us/feed/', source: 'HS Today', region: 'Americas', badge: 'seized' },
  { url: 'https://www.homelandsecuritynewswire.com/rss', source: 'Homeland Security Newswire', region: 'Americas', badge: 'seized' },

  // NARCOTICS
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'Americas', badge: 'narco' },
  { url: 'https://www.theguardian.com/world/drug-trade/rss', source: 'Guardian Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.borderlandbeat.com/feeds/posts/default', source: 'Borderland Beat', region: 'Latin America', badge: 'narco' },

  // CARGO / TRADE
  { url: 'https://www.cbp.gov/rss/newsroom', source: 'US CBP Newsroom', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss/trade/forced-labor', source: 'US CBP Forced Labor', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.freightwaves.com/news/feed', source: 'FreightWaves', region: 'Global', badge: 'cargo' },
  { url: 'https://www.supplychaindive.com/feeds/news/', source: 'Supply Chain Dive', region: 'Global', badge: 'cargo' },
  { url: 'https://aircargoweek.com/feed/', source: 'Air Cargo Week', region: 'Global', badge: 'cargo' },
  { url: 'https://www.aircargonews.net/feed/', source: 'Air Cargo News', region: 'Global', badge: 'cargo' },

  // AIRPORT
  { url: 'https://www.tsa.gov/news-releases/feed', source: 'TSA', region: 'Americas', badge: 'airport' },
  { url: 'https://simpleflying.com/feed/', source: 'Simple Flying', region: 'Global', badge: 'airport' },
  { url: 'https://www.airport-technology.com/feed/', source: 'Airport Technology', region: 'Global', badge: 'airport' },
  { url: 'https://www.securitymagazine.com/rss/articles', source: 'Security Magazine', region: 'Global', badge: 'airport' },
  { url: 'https://www.internationalairportreview.com/feed/', source: 'Intl Airport Review', region: 'Global', badge: 'airport' },

  // LAND BORDER
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://www.borderreport.com/feed/', source: 'Border Report', region: 'Americas', badge: 'border' },
  { url: 'https://www.ice.gov/rss', source: 'ICE', region: 'Americas', badge: 'border' },
  { url: 'https://www.cbp.gov/rss/border-security', source: 'US CBP Border', region: 'Americas', badge: 'border' },

  // HUMAN SMUGGLING
  { url: 'https://www.iom.int/rss.xml', source: 'IOM', region: 'Global', badge: 'human' },
  { url: 'https://mixedmigration.org/feed/', source: 'Mixed Migration', region: 'Global', badge: 'human' },
  { url: 'https://www.theguardian.com/world/migration/rss', source: 'Guardian Migration', region: 'Global', badge: 'human' },

  // WEAPONS
  { url: 'https://www.atf.gov/press-releases/rss.xml', source: 'ATF', region: 'Americas', badge: 'weapons' },
  { url: 'https://smallarmssurvey.org/feed', source: 'Small Arms Survey', region: 'Global', badge: 'weapons' },

  // MARITIME
  { url: 'https://gcaptain.com/feed/', source: 'gCaptain', region: 'Global', badge: 'maritime' },
  { url: 'https://www.maritime-executive.com/rss', source: 'Maritime Executive', region: 'Global', badge: 'maritime' },
  { url: 'https://www.uscg.mil/Updates/NewsUpdates.aspx?rss=1', source: 'US Coast Guard', region: 'Americas', badge: 'maritime' },

  // WILDLIFE
  { url: 'https://news.mongabay.com/feed/', source: 'Mongabay', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC', region: 'Global', badge: 'wildlife' },
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES', region: 'Global', badge: 'wildlife' },
  { url: 'https://allafrica.com/tools/headlines/rdf/zimbabwe/headlines.rdf', source: 'AllAfrica Zimbabwe', region: 'Africa', badge: 'wildlife' },
  { url: 'https://allafrica.com/tools/headlines/rdf/kenya/headlines.rdf', source: 'AllAfrica Kenya', region: 'Africa', badge: 'wildlife' },

  // GEOPOLITICS
  { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World', region: 'Europe', badge: 'geopolitics' },
  { url: 'https://thehill.com/policy/national-security/feed/', source: 'The Hill', region: 'Americas', badge: 'geopolitics' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World', region: 'Global', badge: 'geopolitics' },
  { url: 'https://feeds.foxnews.com/foxnews/national', source: 'Fox News', region: 'Americas', badge: 'geopolitics' },
  { url: 'https://www.infobae.com/rss/internacionales.xml', source: 'Infobae', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://feeds.bbci.co.uk/mundo/rss.xml', source: 'BBC Mundo', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://justsecurity.org/feed/', source: 'Just Security', region: 'Global', badge: 'geopolitics' },
  { url: 'https://www.longwarjournal.org/feed', source: 'Long War Journal', region: 'Global', badge: 'geopolitics' },
  { url: 'https://connectas.org/feed/', source: 'CONNECTAS', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://efectococuyo.com/feed/', source: 'Efecto Cocuyo', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://www.laopinion.com/feed/', source: 'La Opinion', region: 'Americas', badge: 'border' },

  // REDDIT
  { url: 'https://www.reddit.com/r/BorderSecurity.rss', source: 'r/BorderSecurity', region: 'Global', badge: 'border' },
  { url: 'https://www.reddit.com/r/Smuggling.rss', source: 'r/Smuggling', region: 'Global', badge: 'seized' },
];

const BADGE_MAP = {
  narco: 'NARCOTICS', border: 'LAND BORDER', cargo: 'CARGO', airport: 'AIRPORT',
  human: 'HUMAN SMUGGLING', seized: 'SEIZURES', weapons: 'WEAPONS',
  wildlife: 'WILDLIFE TRAFFICKING', maritime: 'MARITIME', geopolitics: 'GEOPOLITICS',
};

const GENERAL_SOURCES = ['BBC World','BBC Mundo','Fox News','DW World','The Hill','Infobae','Guardian Migration','Guardian Drugs','La Opinion'];

function guessBadge(text) {
  const t = (text || '').toLowerCase();
  if (t.match(/cocaine|fentanyl|heroin|methamphetamine|drug.*traffic|narco|cartel|opium/)) return 'narco';
  if (t.match(/human.traffick|sex.traffic|forced.lab|migrant.*smuggl|people.smuggl/)) return 'human';
  if (t.match(/illegal.*weapon|arms.traffick|gun.*smuggl|firearm.*seiz/)) return 'weapons';
  if (t.match(/wildlife.*traffic|ivory|rhino.*poach|pangolin|illegal.*animal/)) return 'wildlife';
  if (t.match(/coast.guard.*seiz|vessel.*drug|maritime.*smuggl|boat.*drug/)) return 'maritime';
  if (t.match(/cargo.*seiz|container.*drug|customs.*bust|freight.*smuggl/)) return 'cargo';
  if (t.match(/border.patrol.*seiz|checkpoint.*smuggl|border.*drug.*seiz/)) return 'border';
  if (t.match(/seized|bust|smuggling.ring|trafficking.ring|contraband/)) return 'seized';
  return null;
}

function clean(s) {
  return (s||'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').trim();
}

function formatTime(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff/60000), h = Math.floor(diff/3600000), d = Math.floor(diff/86400000);
  return m<60 ? m+'m ago' : h<24 ? h+'h ago' : d+'d ago';
}

function parseRSS(xml, feed) {
  const articles = [];
  try {
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    for (const item of items.slice(0,10)) {
      const title = clean((item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || item.match(/<title[^>]*>([\s\S]*?)<\/title>/))?.[1]);
      const link = ((item.match(/<link[^>]*>([\s\S]*?)<\/link>/) || item.match(/<guid[^>]*>(https?[^<]+)<\/guid>/))?.[1]||'').trim();
      const desc = clean((item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || item.match(/<description[^>]*>([\s\S]*?)<\/description>/))?.[1]).substring(0,280);
      const pub = (item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/))?.[1]?.trim();
      if (!title || !link) continue;
      const pubDate = pub ? new Date(pub) : null;
      const ageMs = pubDate ? Date.now() - pubDate.getTime() : 0;
      if (ageMs > 30*86400000) continue;
      const timeClass = ageMs<3600000 ? 'time-recent' : ageMs<86400000 ? 'time-today' : 'time-old';
      const lower = title.toLowerCase();
      if (['obituary','recipe','horoscope','sports results','box score'].some(w=>lower.includes(w))) continue;
      articles.push({ headline:title, summary:desc, url:link, source:feed.source, region:feed.region,
        badge:feed.badge, badgeLabel:BADGE_MAP[feed.badge]||feed.badge.toUpperCase(),
        time:pubDate?formatTime(pubDate):'Recent', timeClass, _pubDate:pub });
    }
  } catch(e) {}
  return articles;
}

async function fetchFeed(feed) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(()=>ctrl.abort(), 4000);
    const res = await fetch(feed.url, { signal:ctrl.signal, headers:{'User-Agent':'BorderTrend/1.0'} });
    clearTimeout(t);
    if (!res.ok) return [];
    return parseRSS(await res.text(), feed);
  } catch { return []; }
}

async function fetchNewsAPI(key) {
  if (!key) return [];
  const queries = [
    { q:'drug seizure smuggling arrested', badge:'narco' },
    { q:'customs seizure contraband border bust', badge:'seized' },
    { q:'cargo smuggling container seized', badge:'cargo' },
    { q:'airport drugs security seized passenger', badge:'airport' },
    { q:'human trafficking smuggling arrested', badge:'human' },
    { q:'weapons firearms smuggling seized', badge:'weapons' },
    { q:'coast guard maritime drugs intercepted', badge:'maritime' },
    { q:'wildlife poaching ivory trafficking seized', badge:'wildlife' },
    { q:'border patrol checkpoint arrest', badge:'border' },
    { q:'Colombia Mexico cartel drugs seized', badge:'narco' },
    { q:'Europe customs drug operation seized', badge:'seized' },
    { q:'Asia customs drugs seized trafficking', badge:'narco' },
    { q:'Africa customs seized wildlife smuggling', badge:'wildlife' },
    { q:'cargo xray scanning border security technology', badge:'cargo' },
  ];
  const articles = [];
  await Promise.all(queries.map(async (q) => {
    try {
      const res = await fetch('https://newsapi.org/v2/everything?q='+encodeURIComponent(q.q)+'&language=en&sortBy=publishedAt&pageSize=10&apiKey='+key);
      if (!res.ok) return;
      const data = await res.json();
      (data.articles||[]).forEach(a => {
        if (!a.title || a.title==='[Removed]') return;
        articles.push({ headline:a.title, summary:(a.description||'').substring(0,280),
          url:a.url, source:a.source?.name||'NewsAPI', region:'Global',
          badge:q.badge, badgeLabel:BADGE_MAP[q.badge]||q.badge.toUpperCase(),
          time:formatTime(a.publishedAt), timeClass:'time-today', _pubDate:a.publishedAt });
      });
    } catch(e) {}
  }));
  return articles;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  try {
    const [feedArts, newsArts] = await Promise.all([
      Promise.race([
        Promise.all(RSS_FEEDS.map(fetchFeed)).then(r=>r.flat()),
        new Promise(r=>setTimeout(()=>r([]),12000))
      ]),
      fetchNewsAPI(process.env.NEWSAPI_KEY)
    ]);

    let articles = [...feedArts, ...newsArts];

    // Filter general news — only keep if specific smuggling keyword match
    articles = articles.map(a => {
      if (!GENERAL_SOURCES.includes(a.source)) return a;
      const g = guessBadge(a.headline+' '+a.summary);
      if (!g) return null;
      return Object.assign({}, a, { badge:g, badgeLabel:BADGE_MAP[g]||g });
    }).filter(Boolean);

    // Sort newest first
    const ORDER = {'time-recent':0,'time-today':1,'time-old':2};
    articles.sort((a,b)=>(ORDER[a.timeClass]??2)-(ORDER[b.timeClass]??2));

    // Deduplicate
    const seen = new Set();
    articles = articles.filter(a => {
      const k = (a.headline||'').substring(0,60).toLowerCase().replace(/\s+/g,' ').trim();
      if (seen.has(k)) return false;
      seen.add(k); return true;
    });

    const { category='all' } = req.query;
    const out = category!=='all' ? articles.filter(a=>a.badge===category) : articles;

    res.status(200).json({ ok:true, total:out.length, articles:out,
      feedCount:RSS_FEEDS.length, fetchedAt:new Date().toISOString() });
  } catch(err) {
    res.status(500).json({ ok:false, error:err.message });
  }
}
