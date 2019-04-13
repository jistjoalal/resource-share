const fs = require('fs');

const fileName = local =>
  process.env['PWD'] + '/imports/api/ccssi/' + local;

const MATH_IN = fileName('xml/math.json');
const MATH_OUT = fileName('math-stds.json');
const ELA_IN = fileName('xml/ela-literacy.json');
const ELA_OUT = fileName('ela-stds.json');

// returns stds from XML in format:
//   K/CC/A/1/a/
const parseStds = (file, key) => {
  const json = require(file);
  const items = json.LearningStandards.LearningStandardItem;
  return items.map(({ RefURI }) => RefURI.split(key)[1]);
}

// write parsed stds to JSON file
const saveStds = (stds_file, output_file, key) => {
  let r = {};
  const stds = parseStds(stds_file, key);
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
  fs.writeFileSync(output_file, JSON.stringify(r));
}
saveStds(MATH_IN, MATH_OUT, 'Content/');
saveStds(ELA_IN, ELA_OUT, 'ELA-Literacy/');
