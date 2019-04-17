const axios = require('axios');
const $ = require('cheerio');
const fs = require('fs');

const MATH_STDS = require('./math-stds.json');
const MATH_URL = 'http://www.corestandards.org/Math/Content';
const MATH_OUT = 'math-desc.json';

const ELA_STDS = require('./ela-stds.json');
const ELA_URL = 'http://www.corestandards.org/ELA-Literacy';
const ELA_OUT = 'ela-desc.json';

// how many requests to make at a time to common core
const REQUEST_SPEED = 50;

/**
 * Scrape
 */
const scrapeAndSave = (subject, stds_file, desc_file, base_url) => {
  scrapeStds(stds_file, base_url, subject)
  .then(saveDescs(desc_file))
  .catch(err => console.log(err))
}

const scrapeStds = async (stds, baseUrl, subject) => {
  const codes = stdCodes(stds);
  return await serialScrape(codes, baseUrl, subject);
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

// scrapes a list of stds all at once
const parallelScrape = async (codes, baseUrl, subject) => {
  return await Promise.all(codes.map(scrapeStd(baseUrl, subject)))
}

// scrapes a list of stds in groups of REQUEST_SPEED
const serialScrape = async (codes, baseUrl, subject) => {
  if (!codes[0]) return await [];
  const head = await parallelScrape(
    codes.slice(0,REQUEST_SPEED),
    baseUrl,
    subject
  );
  const tail = await serialScrape(
    codes.slice(REQUEST_SPEED), 
    baseUrl, 
    subject
  );
  return [
    ...head,
    ...tail,
  ]
}

const scrapeStd = (baseUrl, subject) => async code => {
  console.log('scraping', code)
  return await fetch(code, baseUrl)
  .then(parse(code, subject))
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
const parse = (stdCode, subject)  => html => {
  const code = subject + '/' + stdCode.slice(1).replace(/\//g, '.');
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

// the text I want is buried and cluttered with <i>, <sup> tags
// this parses just the text out
const parseText = (target, html) => {
  const e = $(target, html)[0];
  const text = e && e.children.map(c => {
    const outer = c && c.data;
    // invalid child tag
    if (c && c.name == 'sup') {
      return '';
    }
    const inner = c && c.children && c.children[0] && c.children[0].data;
    return outer || inner;
  });
  return cleanText(text); 
}

// replace weird text and whitespace
// will probably need to add more cases once i notice more
const cleanText = text => {
  return text && text.join``.trim().replace('¹', '');
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

// scrapeAndSave('Math', MATH_STDS, MATH_OUT, MATH_URL);
// scrapeAndSave('Math', MATH_1_STDS, MATH_OUT, MATH_URL);
// scrapeAndSave('ELA', ELA_STDS, ELA_OUT, ELA_URL);
// scrapeAndSave('ELA', ELA_1_STDS, ELA_OUT, ELA_URL);

// scrapeStd(MATH_URL, 'Math')('/3/NF')
// .then(console.log)
