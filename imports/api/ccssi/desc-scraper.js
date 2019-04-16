const axios = require('axios');
const $ = require('cheerio');
const fs = require('fs');

const MATH_STDS = require('./math-stds.json');
const MATH_URL = 'http://www.corestandards.org/Math/Content';
const MATH_OUT = 'math-desc.json';

/**
 * Scrape
 */
const scrapeAndSave = async (stds_file, desc_file, base_url) => {
  return await scrapeStds(stds_file, base_url)
  .then(saveDescs(desc_file))
  .catch(err => console.log(err))
}

const scrapeStds = async (stds, baseUrl) => {
  const codes = stdCodes(stds);
  return await serialScrape(codes, baseUrl);
}

const stdCodes = (stds, s='') => {
  let r = Object.entries(stds).reduce((a, [k, v]) => {
    const b = s + '/' + k;
    return typeof v == 'object' ?
      [b, ...stdCodes(v, b), ...a]
    : a
  }, [])
  return r;
}

const serialScrape = async (codes, baseUrl) => {
  if (!codes[0]) return await [];
  const desc = await scrapeStd(codes[0], baseUrl)
  const rest = await serialScrape(codes.slice(1), baseUrl)
  return [
    desc,
    ...rest,
  ]
}

const scrapeStd = (code, baseUrl) => {
  console.log('scraping', code)
  return fetch(code, baseUrl)
  .then(parse(code))
}

/**
 * Fetch
 */
const fetch = (code, baseUrl) => {
  console.log('fetching', code)
  return axios.get(baseUrl + code)
  .then(res => res.data); 
}

/**
 * Parse
 */
const parse = code => html => {
  console.log('parsing', code)
  const title = parseTitle(html)
  const desc = parseDesc(html)
  return {
    code,
    title,
    desc,
  };
}

const parseDesc = html => {
  const desc = parseText('section.content > p', html);
  return desc && desc.replace('(+) ', '');
}

const parseTitle = html => {
  const title = parseText('header.article-header > h1', html);
  return title.split`» `.slice(-1)[0];
}

const parseText = (target, html) => {
  const e = $(target, html)[0];
  const text = e && e.children[0];
  return text && text.data.trim(); 
}

/**
 * Save
 */
const fileName = local =>
  process.env['PWD'] + '/' + local;

const saveDescs = filename => descs => {
  console.log('writing to', filename)
  fs.writeFileSync(
    fileName(filename),
    JSON.stringify(descs)
  )
}

// scrapeAndSave(MATH_STDS, MATH_DESC, MATH_URL);
