import Descriptions from './index';

const MATH_DESC = require('../ccssi/math-desc.json');
const ELA_DESC = require('../ccssi/ela-desc.json');

/**
 * Insert
 */
export default loadIfEmpty = _ => {
  const notEmpty = Descriptions.find({}).fetch().length;
  if (notEmpty) return;
  load(MATH_DESC)
  load(ELA_DESC)
}

const load = descs => {
  descs.forEach(desc => {
    const exists = Descriptions.findOne({ code: desc.code });
    if (!exists) Descriptions.insert(desc);
  })
}

