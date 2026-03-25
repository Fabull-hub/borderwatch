// BorderTrend â News Aggregator Serverless Function
// bordertrend.com | Auto-deploys on Vercel

const RSS_FEEDS = [

  // ââ GLOBAL INTELLIGENCE & WATCHDOGS ââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.interpol.int/rss/News-and-media/News', source: 'INTERPOL', region: 'Global', badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_news_en.xml', source: 'UNODC', region: 'Global', badge: 'narco' },
  { url: 'https://www.wcoomd.org/en/media/newsroom/rss.ashx', source: 'WCO', region: 'Global', badge: 'cargo' },
  { url: 'https://www.fatf-gafi.org/en/publications/rss.xml', source: 'FATF (Money Laundering)', region: 'Global', badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_drugs_en.xml', source: 'UNODC Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.imolin.org/imolin/en/rss.html', source: 'IMOLIN (Money Laundering)', region: 'Global', badge: 'seized' },
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES (Wildlife Trade)', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.iom.int/rss.xml', source: 'IOM (Migration)', region: 'Global', badge: 'human' },
  { url: 'https://www.unhcr.org/rss/news.xml', source: 'UNHCR', region: 'Global', badge: 'human' },
  { url: 'https://www.track.unodc.org/rss', source: 'UNODC Firearms Tracking', region: 'Global', badge: 'weapons' },

  // ââ INVESTIGATIVE JOURNALISM & MEDIA âââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.occrp.org/en/feed', source: 'OCCRP', region: 'Global', badge: 'seized' },
  { url: 'https://feeds.reuters.com/reuters/worldNews', source: 'Reuters World', region: 'Global', badge: 'border' },
  { url: 'https://feeds.reuters.com/reuters/USnews', source: 'Reuters US', region: 'North America', badge: 'border' },
  { url: 'https://rss.app/feeds/border-security.xml', source: 'AP News (Border)', region: 'Global', badge: 'border' },
  { url: 'https://www.globalwitness.org/en/feed/', source: 'Global Witness', region: 'Global', badge: 'cargo' },
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC (Wildlife)', region: 'Global', badge: 'wildlife' },
  { url: 'https://insightcrime.org/feed/', source: 'InSight Crime', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.globalinitiative.net/feed/', source: 'Global Initiative Against Organized Crime', region: 'Global', badge: 'seized' },
  { url: 'https://www.tni.org/rss/news', source: 'Transnational Institute', region: 'Global', badge: 'narco' },
  { url: 'https://www.devex.com/news/rss.xml', source: 'Devex (Aid & Development)', region: 'Global', badge: 'human' },
  { url: 'https://www.theelephant.info/feed/', source: 'The Elephant (Africa)', region: 'Africa', badge: 'border' },
  { url: 'https://africaintelligence.com/rss', source: 'Africa Intelligence', region: 'Africa', badge: 'seized' },

  // ââ US OFFICIAL AGENCIES ââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.cbp.gov/newsroom/rss', source: 'US CBP', region: 'North America', badge: 'border' },
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'North America', badge: 'narco' },
  { url: 'https://www.atf.gov/rss.xml', source: 'ATF', region: 'North America', badge: 'weapons' },
  { url: 'https://www.ice.gov/rss.xml', source: 'ICE', region: 'North America', badge: 'border' },
  { url: 'https://www.dhs.gov/dhs-news-releases-rss', source: 'DHS', region: 'North America', badge: 'border' },
  { url: 'https://www.justice.gov/feeds/opa/justice-news.xml', source: 'US DOJ', region: 'North America', badge: 'seized' },
  { url: 'https://www.trade.gov/rss.xml', source: 'US Trade.gov', region: 'North America', badge: 'cargo' },
  { url: 'https://www.fincen.gov/rss.xml', source: 'FinCEN (Financial Crimes)', region: 'North America', badge: 'seized' },
  { url: 'https://www.ofac.treas.gov/rss/recent-actions.xml', source: 'OFAC (Sanctions)', region: 'North America', badge: 'seized' },
  { url: 'https://www.uscg.mil/rss/news/', source: 'US Coast Guard', region: 'North America', badge: 'maritime' },
  { url: 'https://www.fbi.gov/feeds/fbi-in-the-news/rss.xml', source: 'FBI', region: 'North America', badge: 'seized' },

  // ââ UK & COMMONWEALTH ââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.gov.uk/search/news-and-communications.atom?keywords=customs+smuggling+border', source: 'UK Gov (Customs/Border)', region: 'Europe', badge: 'border' },
  { url: 'https://www.nationalcrimeagency.gov.uk/news/rss', source: 'UK NCA', region: 'Europe', badge: 'seized' },
  { url: 'https://www.gov.uk/government/organisations/border-force.atom', source: 'UK Border Force', region: 'Europe', badge: 'border' },
  { url: 'https://www.abf.gov.au/about-us/news-media/media-releases/rss', source: 'Australia ABF', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.afp.gov.au/news-media/media-releases/rss', source: 'Australia AFP', region: 'Asia-Pacific', badge: 'seized' },
  { url: 'https://www.cbsa-asfc.gc.ca/media/rss-eng.xml', source: 'Canada CBSA', region: 'North America', badge: 'border' },
  { url: 'https://www.rcmp-grc.gc.ca/en/rss/news', source: 'Canada RCMP', region: 'North America', badge: 'seized' },
  { url: 'https://www.customs.govt.nz/news/rss/', source: 'New Zealand Customs', region: 'Asia-Pacific', badge: 'border' },

  // ââ EUROPE â NATIONAL CUSTOMS & LAW ENFORCEMENT âââââââââââââââââââââââââââ
  { url: 'https://www.europol.europa.eu/rss.xml', source: 'Europol', region: 'Europe', badge: 'seized' },
  { url: 'https://frontex.europa.eu/rss', source: 'Frontex', region: 'Europe', badge: 'border' },
  { url: 'https://ec.europa.eu/taxation_customs/news/rss_en', source: 'EU Taxation & Customs', region: 'Europe', badge: 'cargo' },
  { url: 'https://www.zoll.de/SiteGlobals/Functions/RSSFeed/DE/RSSNewsfeed_Presse.xml', source: 'German Customs (Zoll)', region: 'Europe', badge: 'border' },
  { url: 'https://www.bka.de/DE/Presse/Rss/rss_node.xml', source: 'German BKA (Federal Crime)', region: 'Europe', badge: 'seized' },
  { url: 'https://www.douane.gouv.fr/rss.xml', source: 'French Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.police-nationale.interieur.gouv.fr/rss.xml', source: 'French National Police', region: 'Europe', badge: 'seized' },
  { url: 'https://www.agenciatributaria.es/rss/aeat/noticias.xml', source: 'Spanish Customs (AEAT)', region: 'Europe', badge: 'border' },
  { url: 'https://www.interior.gob.es/opencms/rss/noticias.xml', source: 'Spanish Interior Ministry', region: 'Europe', badge: 'seized' },
  { url: 'https://www.adm.gov.it/portale/rss', source: 'Italian Customs (ADM)', region: 'Europe', badge: 'border' },
  { url: 'https://www.polizia-di-stato.it/rss/comunicatistampa.xml', source: 'Italian State Police', region: 'Europe', badge: 'seized' },
  { url: 'https://www.belastingdienst.nl/rss/nieuws.xml', source: 'Dutch Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.politie.nl/rss/nieuws.xml', source: 'Dutch National Police', region: 'Europe', badge: 'seized' },
  { url: 'https://www.revenue.ie/en/corporate/press-office/news-releases/rss.aspx', source: 'Irish Revenue (Customs)', region: 'Europe', badge: 'border' },
  { url: 'https://www.tullverket.se/rss/nyheter.xml', source: 'Swedish Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.toll.no/rss/nyheter.xml', source: 'Norwegian Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.skat.dk/rss/nyheder.xml', source: 'Danish Customs (Skat)', region: 'Europe', badge: 'border' },
  { url: 'https://www.tulli.fi/rss/uutiset.xml', source: 'Finnish Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.politsei.ee/rss/uudised.xml', source: 'Estonian Police & Border', region: 'Europe', badge: 'border' },
  { url: 'https://www.vdd.gov.lv/rss', source: 'Latvian Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.lrmuitine.lt/rss/news.xml', source: 'Lithuanian Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.src.am/en/rss', source: 'Armenia Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.tr/rss', source: 'Turkey Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.bg/rss', source: 'Bulgaria Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.carina.hr/rss', source: 'Croatia Customs', region: 'Europe', badge: 'border' },

  // ââ LATIN AMERICA âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.inl.state.gov/rss/', source: 'US INL (Drug Policy Americas)', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.sat.gob.mx/rss/noticias', source: 'Mexico Customs (SAT)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.gob.mx/sedena/rss/noticias', source: 'Mexico SEDENA (Military)', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.afip.gob.ar/rss/noticias.xml', source: 'Argentina Customs (AFIP)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.receita.fazenda.gov.br/rss/noticias.xml', source: 'Brazil Customs (Receita Federal)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.pf.gov.br/rss/noticias.xml', source: 'Brazil Federal Police', region: 'Latin America', badge: 'seized' },
  { url: 'https://www.sunat.gob.pe/rss/noticias.xml', source: 'Peru Customs (SUNAT)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.dian.gov.co/dian/rss/noticias.xml', source: 'Colombia Customs (DIAN)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.fiscalia.gov.co/colombia/rss/noticias.xml', source: 'Colombia Fiscalia', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.aduana.cl/rss/noticias.xml', source: 'Chile Customs (SNA)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.ana.gov.py/rss/noticias.xml', source: 'Paraguay Customs (ANA)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.aduana.gob.bo/rss', source: 'Bolivia Customs', region: 'Latin America', badge: 'border' },
  { url: 'https://www.dga.gob.hn/rss/noticias.xml', source: 'Honduras Customs (DGA)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.dga.gob.gt/rss/noticias.xml', source: 'Guatemala Customs (DGA)', region: 'Latin America', badge: 'border' },
  { url: 'https://www.senahot.gob.do/rss', source: 'Dominican Republic Anti-Drug', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.cicad.oas.org/rss', source: 'OAS CICAD (Drug Control)', region: 'Latin America', badge: 'narco' },

  // ââ ASIA-PACIFIC ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.abf.gov.au/about-us/news-media/media-releases/rss', source: 'Australia ABF', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.govt.nz/news/rss/', source: 'New Zealand Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.sg/news-and-media/press-releases/rss', source: 'Singapore Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.my/en/rss', source: 'Malaysia Customs (JKDM)', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.go.jp/english/rss.xml', source: 'Japan Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.go.kr/english/na/ntt/selectNttList.do?mi=11403&bbsId=11403', source: 'Korea Customs', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.customs.gov.ph/news/rss', source: 'Philippines Customs (BOC)', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.in/rss/news.xml', source: 'India Customs (CBIC)', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.af/category/news/feed', source: 'Afghanistan Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.th/wps/rss/news.xml', source: 'Thailand Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.vn/rss/en/news.xml', source: 'Vietnam Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.id/rss/berita.xml', source: 'Indonesia Customs (DJBC)', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.pk/media-room/rss', source: 'Pakistan Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.bd/rss/news.xml', source: 'Bangladesh Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.narcotics.gov.hk/rss/en/news.xml', source: 'Hong Kong Narcotics Bureau', region: 'Asia-Pacific', badge: 'narco' },
  { url: 'https://www.customs.gov.tw/rss/en/news.xml', source: 'Taiwan Customs (Directorate General)', region: 'Asia-Pacific', badge: 'cargo' },
  { url: 'https://www.anc.gov.mn/rss', source: 'Mongolia Customs (MCA)', region: 'Asia-Pacific', badge: 'border' },

  // ââ MIDDLE EAST âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://zatca.gov.sa/en/MediaCenter/News/Pages/rss.aspx', source: 'Saudi Customs (ZATCA)', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.ae/en/media-center/news/rss', source: 'UAE Federal Customs', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.mof.gov.bh/rss/noticias.xml', source: 'Bahrain Customs', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.kw/rss/news.xml', source: 'Kuwait Customs', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.om/rss/news.xml', source: 'Oman Customs (ROP)', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.qa/rss/news.xml', source: 'Qatar Customs (GCA)', region: 'Middle East', badge: 'cargo' },
  { url: 'https://www.customs.gov.il/rss/news.xml', source: 'Israel Customs', region: 'Middle East', badge: 'border' },
  { url: 'https://www.customs.gov.jo/rss/news.xml', source: 'Jordan Customs', region: 'Middle East', badge: 'border' },
  { url: 'https://www.src.am/en/rss', source: 'Armenia Customs', region: 'Middle East', badge: 'border' },

  // ââ AFRICA ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.revenue.go.ke/rss', source: 'Kenya Revenue Authority (KRA)', region: 'Africa', badge: 'border' },
  { url: 'https://www.sars.gov.za/rss/media-releases.xml', source: 'South Africa SARS', region: 'Africa', badge: 'border' },
  { url: 'https://www.douane.gov.dz/index.php/en/component/k2/itemlist/tag/rss?format=feed', source: 'Algeria Customs', region: 'Africa', badge: 'border' },
  { url: 'https://www.ars.gov.ma/rss/noticias.xml', source: 'Morocco Customs (ADII)', region: 'Africa', badge: 'border' },
  { url: 'https://www.douane.gov.tn/rss/news.xml', source: 'Tunisia Customs', region: 'Africa', badge: 'border' },
  { url: 'https://www.fra.org.eg/rss', source: 'Egypt Financial Regulatory', region: 'Africa', badge: 'seized' },
  { url: 'https://www.customs.gov.ng/rss/news.xml', source: 'Nigeria Customs (NCS)', region: 'Africa', badge: 'border' },
  { url: 'https://www.ura.go.ug/rss/news.xml', source: 'Uganda Revenue Authority', region: 'Africa', badge: 'border' },
  { url: 'https://www.tra.go.tz/rss/news.xml', source: 'Tanzania Revenue Authority', region: 'Africa', badge: 'border' },
  { url: 'https://www.zra.org.zm/rss/news.xml', source: 'Zambia Revenue Authority', region: 'Africa', badge: 'border' },
  { url: 'https://www.zimra.co.zw/rss/news.xml', source: 'Zimbabwe Revenue Authority', region: 'Africa', badge: 'border' },
  { url: 'https://www.ors.bf/rss/news.xml', source: 'Burkina Faso Customs', region: 'Africa', badge: 'border' },
  { url: 'https://www.dgi.gov.sn/rss/news.xml', source: 'Senegal Customs (DGD)', region: 'Africa', badge: 'border' },
  { url: 'https://www.douanes.gouv.ci/rss/news.xml', source: "Cote d'Ivoire Customs", region: 'Africa', badge: 'border' },
  { url: 'https://www.dgi.finances.gov.cm/rss/news.xml', source: 'Cameroon Customs', region: 'Africa', badge: 'border' },
  { url: 'https://www.cites.org/eng/news/rss.xml', source: 'CITES Africa Seizures', region: 'Africa', badge: 'wildlife' },

  // ââ EASTERN EUROPE & CENTRAL ASIA âââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.customs.ru/rss/news.xml', source: 'Russia FCS', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.ua/rss/news.xml', source: 'Ukraine State Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.by/rss/news.xml', source: 'Belarus Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.kz/rss/news.xml', source: 'Kazakhstan Customs', region: 'Asia-Pacific', badge: 'border' },
  { url: 'https://www.customs.gov.az/rss/news.xml', source: 'Azerbaijan Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.ge/rss/news.xml', source: 'Georgia Customs', region: 'Europe', badge: 'border' },
  { url: 'https://www.customs.gov.uz/rss/news.xml', source: 'Uzbekistan Customs', region: 'Asia-Pacific', badge: 'border' },

  // ââ MARITIME & COAST GUARD ââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.uscg.mil/rss/news/', source: 'US Coast Guard', region: 'North America', badge: 'maritime' },
  { url: 'https://www.emsa.europa.eu/rss/news.xml', source: 'EU Maritime Safety Agency (EMSA)', region: 'Europe', badge: 'maritime' },
  { url: 'https://www.imo.org/en/MediaCentre/Pages/rss.aspx', source: 'IMO (Maritime Org)', region: 'Global', badge: 'maritime' },
  { url: 'https://www.icc-ccs.org/rss/piracy-news.xml', source: 'ICC Maritime Bureau (Piracy)', region: 'Global', badge: 'maritime' },
  { url: 'https://gcmaritime.eu/rss', source: 'Global Coast Guard Maritime', region: 'Global', badge: 'maritime' },

  // ââ FINANCIAL CRIMES & SANCTIONS ââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.fincen.gov/rss.xml', source: 'FinCEN (Financial Crimes)', region: 'North America', badge: 'seized' },
  { url: 'https://www.egmontgroup.org/rss/news.xml', source: 'Egmont Group (Financial Intel)', region: 'Global', badge: 'seized' },
  { url: 'https://www.unodc.org/rss/unodc_corruption_en.xml', source: 'UNODC Corruption', region: 'Global', badge: 'seized' },
  { url: 'https://www.transparency.org/en/rss', source: 'Transparency International', region: 'Global', badge: 'seized' },
  { url: 'https://baselgovernance.org/rss/news.xml', source: 'Basel Institute on Governance', region: 'Global', badge: 'seized' },

  // ââ WEAPONS & ARMS TRAFFICKING ââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.atf.gov/rss.xml', source: 'ATF (Firearms)', region: 'North America', badge: 'weapons' },
  { url: 'https://www.un.org/disarmament/rss/news.xml', source: 'UN Office for Disarmament', region: 'Global', badge: 'weapons' },
  { url: 'https://www.sipri.org/rss/news', source: 'SIPRI (Arms Research)', region: 'Global', badge: 'weapons' },
  { url: 'https://controlarms.org/rss/news.xml', source: 'Control Arms Coalition', region: 'Global', badge: 'weapons' },
  { url: 'https://www.smallarmssurvey.org/rss/news.xml', source: 'Small Arms Survey', region: 'Global', badge: 'weapons' },

  // ââ HUMAN TRAFFICKING & SMUGGLING ââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.iom.int/rss.xml', source: 'IOM (Human Mobility)', region: 'Global', badge: 'human' },
  { url: 'https://www.unodc.org/rss/unodc_human_trafficking_en.xml', source: 'UNODC Human Trafficking', region: 'Global', badge: 'human' },
  { url: 'https://www.antislavery.org/rss/news.xml', source: 'Anti-Slavery International', region: 'Global', badge: 'human' },
  { url: 'https://www.walkfree.org/rss/news.xml', source: 'Walk Free Foundation', region: 'Global', badge: 'human' },
  { url: 'https://humantraffickinghotline.org/rss/news.xml', source: 'National Human Trafficking Hotline', region: 'North America', badge: 'human' },
  { url: 'https://www.icat.network/rss/news.xml', source: 'ICAT (Counter-Trafficking)', region: 'Global', badge: 'human' },

  // ââ WILDLIFE TRAFFICKING ââââââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.traffic.org/feed/', source: 'TRAFFIC (Wildlife Trade)', region: 'Global', badge: 'wildlife' },
  { url: 'https://cites.org/eng/news/rss.xml', source: 'CITES', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.wwf.org.uk/rss/news.xml', source: 'WWF (Wildlife Crime)', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.wildaid.org/rss/news.xml', source: 'WildAid', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.ifaw.org/rss/news.xml', source: 'IFAW (Animal Welfare)', region: 'Global', badge: 'wildlife' },
  { url: 'https://www.wcs.org/rss/news.xml', source: 'Wildlife Conservation Society', region: 'Global', badge: 'wildlife' },

  // ââ NARCOTICS & DRUG POLICY âââââââââââââââââââââââââââââââââââââââââââââââ
  { url: 'https://www.dea.gov/rss.xml', source: 'DEA', region: 'North America', badge: 'narco' },
  { url: 'https://www.unodc.org/rss/unodc_drugs_en.xml', source: 'UNODC Drugs', region: 'Global', badge: 'narco' },
  { url: 'https://www.emcdda.europa.eu/rss/news_en', source: 'EU Drug Monitoring Agency (EMCDDA)', region: 'Europe', badge: 'narco' },
  { url: 'https://www.incb.org/incb/en/news/rss.xml', source: 'INCB (Narcotics Control Board)', region: 'Global', badge: 'narco' },
  { url: 'https://insightcrime.org/category/news/rss', source: 'InSight Crime Narcotics', region: 'Latin America', badge: 'narco' },
  { url: 'https://www.drugsandalcohol.ie/rss/news.xml', source: 'Drugs & Alcohol Ireland', region: 'Europe', badge: 'narco' },
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
