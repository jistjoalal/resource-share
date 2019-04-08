const fs = require('fs');
const MATH_STDS = process.env['PWD'] + '/imports/api/ccssi/xml/math.json';
const STDS_FILE = process.env['PWD'] + '/imports/api/ccssi/math-stds.json';

// returns stds from XML in format:
//   K/CC/A/1/a/
const parseStds = file => {
  const json = require(file);
  const items = json.LearningStandards.LearningStandardItem;
  return items.map(({ RefURI }) => RefURI.split('Content/')[1]);
}

// write parsed stds to JSON file
const saveStds = (stds, file) => {
  let r = {};
  for (let j = 0; j < stds.length; j++) {
    if (!stds[j]) break;
    const s = stds[j].split(/\//g);
    let root = r;
    for (let i = 0; i < s.length; i++) {
      if (s[i] && !root[s[i]]) {
        root[s[i]] = { code: s[i] };
      }
      root = root[s[i]];
    }
  }
  fs.writeFileSync(file, JSON.stringify(r));
}
const stds = parseStds(MATH_STDS);
saveStds(stds, STDS_FILE);
