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
  return items.map(({ RefURI }) => ({
    code: RefURI.split(key)[1],
  }));
}

// write parsed stds to JSON file
const saveStds = (stds_file, output_file, key) => {
  let r = {};
  const stds = parseStds(stds_file, key);
  for (let std of stds) {
    if (!std.code) break;
    const s = std.code.split(/\//g);
    let root = r;
    for (let c of s) {
      if (c && !root[c]) {
        root[c] = { code: c };
      }
      root = root[c];
    }
  }
  fs.writeFileSync(output_file, JSON.stringify(r));
}
saveStds(MATH_IN, MATH_OUT, 'Content/');
saveStds(ELA_IN, ELA_OUT, 'ELA-Literacy/');
