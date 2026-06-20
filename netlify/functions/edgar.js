exports.handler = async function() {
  const FORMS = 'S-4,F-4,DEFM14A,PREM14A,SC%20TO-T,SC%20TO-I,SC%2013D,15-12G';
  const url = `https://efts.sec.gov/EFTS/solr/search/efts?forms=${FORMS}&dateRange=custom&startdt=2026-01-01`;
  const url8k = `https://efts.sec.gov/EFTS/solr/search/efts?forms=8-K&q=%22merger%22&dateRange=custom&startdt=2026-01-01`;

  const [r1, r2] = await Promise.all([fetch(url), fetch(url8k)]);
  const [j1, j2] = await Promise.all([r1.json(), r2.json()]);
  const hits = [...(j1.hits?.hits || []), ...(j2.hits?.hits || [])];

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ hits: { hits } })
  };
};
