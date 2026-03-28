// BorderTrend - News Aggregator API
// bordertrend.com | Vercel Serverless

const RSS_FEEDS = [

  // === SEIZURES / INVESTIGATIONS ===
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.globalinitiative.net/feed/', source: 'Global Initiative', region: 'Global', badge: 'seized' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'Americas', badge: 'seized' },
  { url: 'https://www.fbi.gov/feeds/fbi-in-the-news/rss.xml', source: 'FBI', region: 'Americas', badge: 'seized' },
  { url: 'https://www.nationalcrimeagency.gov.uk/news/rss', source: 'UK NCA', region: 'Europe', badge: 'seized' },
  { url: 'https://www.gov.uk/government/organisations/serious-fraud-office.atom', source: 'UK SFO', region: 'Europe', badge: 'seized' },

  // === NARCOTICS ===
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'Americas', badge: 'narco' },
  { url: 'https://www.emcdda.europa.eu/rss/news_en', source: 'EMCDDA', region: 'Europe', badge: 'narco' },
  { url: 'https://www.talkingdrugs.org/feed', source: 'Talking Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.theguardian.com/world/drug-trade/rss', source: 'Guardian Drugs', region: 'Global', badge: 'narco' },

  // === CARGO / TRADE ===
  { url: 'https://www.cbp.gov/rss.xml', source: 'US CBP', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss/newsroom', source: 'US CBP Newsroom', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss/trade', source: 'US CBP Trade', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss/trade/forced-labor', source: 'US CBP Forced Labor', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cbp.gov/rss/border-security', source: 'US CBP Border Security', region: 'Americas', badge: 'border' },
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  { url: 'https://www.freightwaves.com/news/feed', source: 'FreightWaves', region: 'Global', badge: 'cargo' },
  { url: 'https://www.supplychaindive.com/feeds/news/', source: 'Supply Chain Dive', region: 'Global', badge: 'cargo' },
  { url: 'https://www.logisticsmgmt.com/rss/news', source: 'Logistics Mgmt', region: 'Global', badge: 'cargo' },
  { url: 'https://www.abf.gov.au/about-us/news/media-releases/rss', source: 'Australia ABF', region: 'Asia-Pacific', badge: 'cargo' },

  // === AIRPORT ===
  { url: 'https://www.tsa.gov/news-releases/feed', source: 'TSA', region: 'Americas', badge: 'airport' },
  { url: 'https://www.airport-technology.com/feed/', source: 'Airport Technology', region: 'Global', badge: 'airport' },
  { url: 'https://aviationsourcenews.com/feed/', source: 'Aviation Source', region: 'Global', badge: 'airport' },
  { url: 'https://simpleflying.com/feed/', source: 'Simple Flying', region: 'Global', badge: 'airport' },

  // === LAND BORDER ===
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://www.borderreport.com/feed/', source: 'Border Report', region: 'Americas', badge: 'border' },
  { url: 'https://www.borderlandbeat.com/feeds/posts/default', source: 'Borderland Beat', region: 'Latin America', badge: 'border' },
  { url: 'https://www.ice.gov/rss', source: 'ICE', region: 'Americas', badge: 'border' },
  { url: 'https://www.dhs.gov/rss/news.rss', source: 'DHS', region: 'Americas', badge: 'border' },

  // === HUMAN SMUGGLING ===
  { url: 'https://www.iom.int/rss.xml', source: 'IOM', region: 'Global', badge: 'human' },
  { url: 'https://mixedmigration.org/feed/', source: 'Mixed Migration', region: 'Global', badge: 'human' },
  { url: 'https://www.antislavery.org/feed/', source: 'Anti-Slavery Intl', region: 'Global', badge: 'human' },
  { url: 'https://www.theguardian.com/world/migration/rss', source: 'Guardian Migration', region: 'Global', badge: 'human' },
  { url: 'https://www.refworld.org/rss/news.xml', source: 'Refworld', region: 'Global', badge: 'human' },

  // === WEAPONS ===
  { url: 'https://www.sipri.org/rss.xml', source: 'SIPRI', region: 'Global', badge: 'weapons' },
  { url: 'https://smallarmssurvey.org/feed', source: 'Small Arms Survey', region: 'Global', badge: 'weapons' },
  { url: 'https://www.atf.gov/press-releases/rss.xml', source: 'ATF', region: 'Americas', badge: 'weapons' },

  // === MARITIME ===
  { url: 'https://gcaptain.com/feed/', source: 'gCaptain', region: 'Global', badge: 'maritime' },
  { url: 'https://www.maritime-executive.com/rss', source: 'Maritime Executive', region: 'Global', badge: 'maritime' },
  { url: 'https://www.imo.org/en/MediaCentre/PressBriefings/rss', source: 'IMO', region: 'Global', badge: 'maritime' },
  { url: 'https://www.icc-ccs.org/index.php/1158-latest-news?format=feed&type=rss', source: 'ICC-CCS Piracy', region: 'Global', badge: 'maritime' },
  { url: 'https://www.uscg.mil/Updates/NewsUpdates.aspx?rss=1', source: 'US Coast Guard', region: 'Americas', badge: 'maritime' },
  { url: 'https://www.marinetraffic.com/en/news/feed', source: 'Marine Traffic', region: 'Global', badge: 'maritime' },

  // === WILDLIFE TRAFFICKING ===
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.wwf.org.uk/rss.xml', source: 'WWF UK', region: 'Global', badge: 'wildlife' },
  { url: 'https://news.mongabay.com/feed/', source: 'Mongabay', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.worldwildlife.org/stories.rss', source: 'WWF Global', region: 'Global', badge: 'wildlife' },

  // === GEOPOLITICS (border-security relevant only) ===
  { url: 'https://rss.dw.com/rdf/rss-en-world', source: 'DW World', region: 'Europe', badge: 'geopolitics' },
  { url: 'https://thehill.com/policy/national-security/feed/', source: 'The Hill', region: 'Americas', badge: 'geopolitics' },
  { url: 'https://www.infobae.com/rss/internacionales.xml', source: 'Infobae', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://feeds.foxnews.com/foxnews/national', source: 'Fox News', region: 'Americas', badge: 'geopolitics' },
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC World', region: 'Global', badge: 'geopolitics' },
  { url: 'https://www.cbsnews.com/latest/rss/main', source: 'CBS News', region: 'Americas', badge: 'geopolitics' },
  { url: 'https://feeds.reuters.com/reuters/topNews', source: 'Reuters', region: 'Global', badge: 'geopolitics' },


  // === TECHNOLOGY / SECURITY SCANNING / INNOVATION ===
  { url: 'https://www.securitymagazine.com/rss/articles', source: 'Security Magazine', region: 'Global', badge: 'airport' },
  { url: 'https://www.homelandsecuritynewswire.com/rss', source: 'Homeland Security Newswire', region: 'Americas', badge: 'seized' },
  { url: 'https://www.hstoday.us/feed/', source: 'HS Today', region: 'Americas', badge: 'seized' },
  { url: 'https://homelandprepnews.com/feed', source: 'Homeland Prep News', region: 'Americas', badge: 'seized' },
  { url: 'https://www.aviationsecurityinternational.com/rss', source: 'Aviation Security Intl', region: 'Global', badge: 'airport' },
  { url: 'https://www.screener.airport-technology.com/feed/', source: 'Airport Security Tech', region: 'Global', badge: 'airport' },
  { url: 'https://www.cargosecurityinternational.com/rss', source: 'Cargo Security Intl', region: 'Global', badge: 'cargo' },

  // === AIR CARGO INDUSTRY ===
  { url: 'https://www.aircargonews.net/feed/', source: 'Air Cargo News', region: 'Global', badge: 'cargo' },
  { url: 'https://aircargoweek.com/feed/', source: 'Air Cargo Week', region: 'Global', badge: 'cargo' },
  { url: 'https://www.internationalairportreview.com/feed/', source: 'Intl Airport Review', region: 'Global', badge: 'airport' },
  { url: 'https://www.aircargonext.com/feed/', source: 'Air Cargo Next', region: 'Global', badge: 'cargo' },

  // === SPANISH LANGUAGE SOURCES ===
  { url: 'https://www.infobae.com/rss/america/', source: 'Infobae America', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://www.eluniversal.com.mx/rss.xml', source: 'El Universal', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://rss.dw.com/rdf/rss-es-am', source: 'DW Espanol', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://feeds.bbci.co.uk/mundo/rss.xml', source: 'BBC Mundo', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://www.laopinion.com/feed/', source: 'La Opinion', region: 'Americas', badge: 'border' },
  { url: 'https://www.elnuevoherald.com/news/local/article.rss', source: 'El Nuevo Herald', region: 'Americas', badge: 'border' },

  // === INVESTIGATIVE / ANALYTICAL BLOGS ===
  { url: 'https://justsecurity.org/feed/', source: 'Just Security', region: 'Global', badge: 'geopolitics' },
  { url: 'https://www.longwarjournal.org/feed', source: 'Long War Journal', region: 'Global', badge: 'geopolitics' },
  { url: 'https://globalriskinsights.com/feed/', source: 'Global Risk Insights', region: 'Global', badge: 'geopolitics' },
  { url: 'https://www.organized-crime.de/feed', source: 'Organized Crime', region: 'Europe', badge: 'seized' },
  { url: 'https://www.globalfinancialintegrity.org/feed/', source: 'Global Fin Integrity', region: 'Global', badge: 'seized' },

  // === MSN / AGGREGATED NEWS (filtered via guessBadge) ===
  { url: 'https://www.msn.com/en-us/news/us/rss', source: 'MSN US', region: 'Americas', badge: 'border' },

  // === REDDIT via RSS (key subreddits) ===
  { url: 'https://www.reddit.com/r/BorderSecurity.rss', source: 'r/BorderSecurity', region: 'Global', badge: 'border' },
  { url: 'https://www.reddit.com/r/Smuggling.rss', source: 'r/Smuggling', region: 'Global', badge: 'seized' },
  { url: 'https://www.reddit.com/r/SecurityProfessionals.rss', source: 'r/SecurityProfessionals', region: 'Global', badge: 'seized' },
  { url: 'https://www.reddit.com/r/Customs.rss', source: 'r/Customs', region: 'Global', badge: 'cargo' },
  { url: 'https://www.reddit.com/r/AirportSecurity.rss', source: 'r/AirportSecurity', region: 'Global', badge: 'airport' },

  // === GOVERNMENT PRESS RELEASES (confirmed RSS) ===
  { url: 'https://www.trade.gov/rss', source: 'ITA Trade', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.cisa.gov/news-events/news/rss.xml', source: 'CISA', region: 'Americas', badge: 'seized' },
  { url: 'https://www.cbp.gov/rss/border-security', source: 'US CBP Border Sec', region: 'Americas', badge: 'border' },
  { url: 'https://www.cbp.gov/rss/trade/forced-labor', source: 'US CBP Forced Labor', region: 'Americas', badge: 'cargo' },

  // === ENGLISH-LANGUAGE CUSTOMS AGENCIES WITH RSS ===
  // (From your Excel + additional research)
  { url: 'https://www.gov.uk/government/organisations/hm-revenue-customs.atom', source: 'UK HMRC', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.gov.uk/government/organisations/border-force.atom', source: 'UK Border Force', region: 'Europe', badge: 'border' },
  { url: 'https://www.gov.uk/government/organisations/national-crime-agency.atom', source: 'UK NCA', region: 'Europe', badge: 'seized' },
  { url: 'https://www.cbsa-asfc.gc.ca/media/releases-communiques/rss-eng.xml', source: 'Canada CBSA', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.police.govt.nz/news/rss.xml', source: 'NZ Police', region: 'Asia-Pacific', badge: 'seized' },
  { url: 'https://www.customs.govt.nz/news/rss/', source: 'NZ Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.sg/news-and-media/press-releases/rss', source: 'Singapore Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.my/en/rss', source: 'Malaysia Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.go.jp/english/rss.xml', source: 'Japan Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://english.customs.gov.cn/rss.xml', source: 'China GAC', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.revenue.ie/en/news/rss.xml', source: 'Ireland Revenue', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.belastingdienst.nl/rss/nieuws.rss', source: 'Netherlands Customs', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.zoll.de/SiteGlobals/Functions/RSSFeed/EN/RSSNewsfeed_EN.xml', source: 'Germany Zoll', region: 'Europe', badge: 'cargo' },

  // === C-F COUNTRY CUSTOMS AGENCIES (confirmed RSS) ===
  { url: 'https://www.cbsa-asfc.gc.ca/media/releases-communiques/rss-eng.xml', source: 'Canada CBSA', region: 'Americas', badge: 'border' },
  { url: 'https://www.aduana.cl/aduana/site/rss/rssNoticias.xml', source: 'Chile Aduanas', region: 'Latin America', badge: 'cargo' },
  { url: 'https://english.customs.gov.cn/rss.xml', source: 'China GAC', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.aduanacolombia.com/rss', source: 'Colombia DIAN', region: 'Latin America', badge: 'cargo' },
  { url: 'https://www.carina.gob.cu/rss', source: 'Cuba Customs', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.carina.gob.do/rss', source: 'Dominican Republic Customs', region: 'Americas', badge: 'cargo' },
  { url: 'https://www.douane.gouv.fr/rss/actualites.xml', source: 'France Douanes', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.afad.gov.tr/rss', source: 'Turkey Customs', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.revenue.ie/en/news/rss.xml', source: 'Ireland Revenue', region: 'Europe', badge: 'cargo' },

  // === LATIN AMERICA INVESTIGATIVE (Spanish) ===
  { url: 'https://www.elespectador.com/rss/noticias/', source: 'El Espectador', region: 'Latin America', badge: 'seized' },
  { url: 'https://connectas.org/feed/', source: 'CONNECTAS', region: 'Latin America', badge: 'seized' },
  { url: 'https://elpais.com/rss/tag/trafico_drogas/', source: 'El Pais Drogas', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.telesurtv.net/rss/noticias.xml', source: 'TeleSur', region: 'Latin America', badge: 'geopolitics' },
  { url: 'https://www.elsalvador.com/rss', source: 'El Salvador News', region: 'Latin America', badge: 'border' },
  { url: 'https://www.proceso.com.mx/rss/noticias', source: 'Proceso MX', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.animalpolitico.com/feed/', source: 'Animal Politico', region: 'Latin America', badge: 'narco' },
  { url: 'https://elfaro.net/rss', source: 'El Faro', region: 'Latin America', badge: 'seized' },
  { url: 'https://contracorriente.red/feed/', source: 'Contra Corriente', region: 'Latin America', badge: 'border' },

  // === ASIA-PACIFIC AGENCIES ===
  { url: 'https://www.customs.gov.sg/news-and-media/press-releases/rss', source: 'Singapore Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.police.gov.sg/newsroom/press-releases/rss', source: 'Singapore Police', region: 'Asia-Pacific', badge: 'seized' },
  { url: 'https://www.customs.gov.ph/rss', source: 'Philippines Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.my/en/rss', source: 'Malaysia Customs', region: 'Asia-Pacific', badge: 'cargo' },

  // === AFRICA (agencies with English news) ===
  { url: 'https://www.sars.gov.za/rss', source: 'South Africa SARS', region: 'Africa', badge: 'cargo' },
  { url: 'https://www.kra.go.ke/rss', source: 'Kenya Revenue', region: 'Africa', badge: 'cargo' },
  { url: 'https://www.customs.gov.ng/rss', source: 'Nigeria Customs', region: 'Africa', badge: 'cargo' },

  // === MIDDLE EAST ===
  { url: 'https://www.customs.gov.sa/en/rss', source: 'Saudi Customs', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.mof.gov.ae/rss', source: 'UAE Finance', region: 'Middle East', badge: 'cargo' },
];
const BADGE_MAP = {
  narco: 'NARCOTICS', border: 'LAND BORDER', cargo: 'CARGO', airport: 'AIRPORT',
  human: 'HUMAN SMUGGLING', seized: 'SEIZURES', weapons: 'WEAPONS',
  wildlife: 'WILDLIFE TRAFFICKING', maritime: 'MARITIME', geopolitics: 'GEOPOLITICS',
};

// Only match specific smuggling/trafficking keywords — returns null if no clear match
function guessBadge(text) {
  const t = (text || '').toLowerCase();
  if (t.match(/cocaine|fentanyl|heroin|methamphetamine|drug.*traffic|narco|cartel|opium|cannabis.*seiz/)) return 'narco';
  if (t.match(/human.traffick|sex.traffic|forced.labour|forced.labor|migrant.*smuggl|people.smuggl/)) return 'human';
  if (t.match(/illegal.*weapon|arms.traffick|gun.*smuggl|firearm.*seiz|weapons.*smuggl|illicit.*arm/)) return 'weapons';
  if (t.match(/wildlife.*traffic|ivory.*seiz|rhino.*poach|pangolin|illegal.*animal.*trade|tiger.*seiz/)) return 'wildlife';
  if (t.match(/airport.*drug|airport.*seiz|passenger.*smuggl|luggage.*drug/)) return 'airport';
  if (t.match(/coast.guard.*seiz|vessel.*drug|maritime.*smuggl|boat.*drug.*seiz/)) return 'maritime';
  if (t.match(/cargo.*seiz|container.*drug|customs.*bust|freight.*smuggl/)) return 'cargo';
  if (t.match(/border.patrol.*seiz|border.*drug.*seiz|checkpoint.*smuggl/)) return 'border';
  if (t.match(/sanction|diplomac|treaty.*border|military.*border|nuclear.deal|coup/)) return 'geopolitics';
  if (t.match(/seized.*kilo|bust.*traffick|smuggling.ring|trafficking.ring|contraband/)) return 'seized';
  return null;
}

function parseRSS(xml, feed) {
  const articles = [];
  try {
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    for (const item of items.slice(0, 12)) {
      const title = (item.match(/<title[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || item.match(/<title[^>]*>([\s\S]*?)<\/title>/))?.[1]?.trim();
      const link = (item.match(/<link[^>]*>([\s\S]*?)<\/link>/) || item.match(/<guid[^>]*>(https?[^<]+)<\/guid>/))?.[1]?.trim();
      const desc = (item.match(/<description[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || item.match(/<description[^>]*>([\s\S]*?)<\/description>/))?.[1]?.trim();
      const pub = item.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      if (!title || !link) continue;

      const clean = s => (s||'').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').trim();
      const cleanTitle = clean(title);
      const cleanDesc = clean(desc).substring(0, 280);

      const pubDate = pub ? new Date(pub) : null;
      const ageMs = pubDate ? Date.now() - pubDate.getTime() : 0;
      if (ageMs > 30 * 86400000) continue; // skip articles older than 30 days

      const timeClass = ageMs < 3600000 ? 'time-recent' : ageMs < 86400000 ? 'time-today' : 'time-old';

      // Skip clearly irrelevant content
      const lower = cleanTitle.toLowerCase();
      if (['obituary','recipe','horoscope','sports results','box score','in memoriam','60 minutes arch'].some(w => lower.includes(w))) continue;

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
  const deadline = new Promise(resolve => setTimeout(() => resolve([]), 14000));
  const all = Promise.all(RSS_FEEDS.map(fetchFeed)).then(r => r.flat());
  return Promise.race([all, deadline]);
}

async function fetchNewsAPI(key) {
  if (!key) return [];
  const queries = [
    // Core smuggling categories
    { q: 'drug seizure smuggling arrested', badge: 'narco', label: 'NARCOTICS' },
    { q: 'border seizure customs bust contraband', badge: 'seized', label: 'SEIZURES' },
    { q: 'cargo smuggling container seized customs', badge: 'cargo', label: 'CARGO' },
    { q: 'airport drugs security seized passenger', badge: 'airport', label: 'AIRPORT' },
    { q: 'human trafficking smuggling migrants arrested', badge: 'human', label: 'HUMAN SMUGGLING' },
    { q: 'weapons firearms smuggling seized illegal', badge: 'weapons', label: 'WEAPONS' },
    { q: 'coast guard maritime drugs boat intercepted', badge: 'maritime', label: 'MARITIME' },
    { q: 'wildlife poaching ivory trafficking seized', badge: 'wildlife', label: 'WILDLIFE TRAFFICKING' },
    { q: 'border patrol checkpoint land border arrest', badge: 'border', label: 'LAND BORDER' },
    // Country-specific customs news (from Excel database)
    { q: 'Algeria customs seizure contraband', badge: 'seized', label: 'SEIZURES' },
    { q: 'Argentina AFIP aduana decomiso', badge: 'cargo', label: 'CARGO' },
    { q: 'Australia border force seized arrested', badge: 'border', label: 'LAND BORDER' },
    { q: 'Bahrain customs seized smuggling', badge: 'cargo', label: 'CARGO' },
    { q: 'Bangladesh customs seizure smuggling', badge: 'cargo', label: 'CARGO' },
    { q: 'Afghanistan customs border seizure', badge: 'border', label: 'LAND BORDER' },
    // Regional sweeps
    { q: 'Caribbean customs seizure smuggling drugs', badge: 'maritime', label: 'MARITIME' },
    { q: 'Africa customs border seizure wildlife', badge: 'seized', label: 'SEIZURES' },
    { q: 'Southeast Asia customs drugs seized', badge: 'narco', label: 'NARCOTICS' },
    { q: 'Middle East customs contraband seized', badge: 'seized', label: 'SEIZURES' },
    { q: 'Europe Europol customs operation seized', badge: 'seized', label: 'SEIZURES' },
    { q: 'Latin America cartel drugs seized border', badge: 'narco', label: 'NARCOTICS' },
    // Technology queries
    { q: 'cargo xray scanning technology border security', badge: 'cargo', label: 'CARGO' },
    { q: 'airport security technology scanner biometric', badge: 'airport', label: 'AIRPORT' },
    { q: 'border security technology AI surveillance', badge: 'border', label: 'LAND BORDER' },

    // C-F country customs news
    { q: 'Canada CBSA customs seizure border arrest', badge: 'border', label: 'LAND BORDER' },
    { q: 'Chile aduanas decomiso contrabando', badge: 'cargo', label: 'CARGO' },
    { q: 'China customs seized smuggling arrested', badge: 'cargo', label: 'CARGO' },
    { q: 'Colombia DIAN decomiso contrabando', badge: 'seized', label: 'SEIZURES' },
    { q: 'Cuba customs contraband seized', badge: 'cargo', label: 'CARGO' },
    { q: 'France douanes saisie trafic', badge: 'cargo', label: 'CARGO' },
    // Africa / Middle East
    { q: 'South Africa customs seized smuggling drugs', badge: 'seized', label: 'SEIZURES' },
    { q: 'Nigeria customs seizure contraband arrested', badge: 'cargo', label: 'CARGO' },
    { q: 'Kenya revenue customs seized drugs', badge: 'cargo', label: 'CARGO' },
    { q: 'Dubai UAE customs seized smuggling', badge: 'cargo', label: 'CARGO' },
    // Asia-Pacific
    { q: 'Singapore customs seized smuggling drugs', badge: 'cargo', label: 'CARGO' },
    { q: 'Philippines customs drugs seized arrested', badge: 'narco', label: 'NARCOTICS' },
    { q: 'Malaysia customs seized drugs trafficking', badge: 'narco', label: 'NARCOTICS' },
    { q: 'Indonesia customs drugs seized arrested', badge: 'narco', label: 'NARCOTICS' },
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
          summary: (a.description || '').substring(0, 280),
          url: a.url,
          source: a.source.name || 'NewsAPI',
          region: 'Global',
          badge: q.badge,
          badgeLabel: q.label,
          time: formatTime(new Date(a.publishedAt)),
          timeClass: 'time-today',
          _pubDate: a.publishedAt,
        });
      });
    } catch(e) {}
  }));
  return articles;
}

// Sources that post general news — only keep if headline matches specific smuggling keywords
const GENERAL_SOURCES = ['Fox News','BBC World','CBS News','Reuters','DW World','The Hill','Infobae','Guardian Migration','Guardian Drug Trade'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  try {
    const [feedArticles, newsApiArticles] = await Promise.all([
      fetchAllFeeds(),
      fetchNewsAPI(process.env.NEWSAPI_KEY),
    ]);

    let articles = [...feedArticles, ...newsApiArticles];

    // For general news sources, only keep articles with specific smuggling keywords
    articles = articles.map(a => {
      if (!GENERAL_SOURCES.includes(a.source)) return a;
      const guessed = guessBadge(a.headline + ' ' + a.summary);
      if (!guessed) return null; // Drop off-topic article
      return Object.assign({}, a, { badge: guessed, badgeLabel: BADGE_MAP[guessed] || guessed });
    }).filter(Boolean);

    // Sort newest first
    const ORDER = { 'time-recent': 0, 'time-today': 1, 'time-old': 2 };
    articles.sort((a, b) => (ORDER[a.timeClass] ?? 2) - (ORDER[b.timeClass] ?? 2));

    // Deduplicate by headline
    const seen = new Set();
    articles = articles.filter(a => {
      const key = (a.headline || '').substring(0, 60).toLowerCase().replace(/\s+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

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
