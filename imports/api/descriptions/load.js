import Descriptions from './index';

const MATH_DESC = require('../ccssi/math-desc.json');

/**
 * Insert
 */
const loadIfEmpty = descs => {
  const notEmpty = Descriptions.find({}).fetch().length;
  if (notEmpty) return;
  descs.forEach(desc => {
    const exists = Descriptions.findOne({ code: desc.code });
    if (!exists) Descriptions.insert(desc);
  })
}

loadIfEmpty(MATH_DESC)
