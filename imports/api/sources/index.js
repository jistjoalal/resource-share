import Resources from '../resources';
import insertResources from './insertResources';

const MATH_STDS = require('../ccssi/math-stds.json');
const MATH_KEYS = ['grade', 'domain', 'cluster', 'standard', 'component'];

export const insertMathResources = _ =>
  insertResources(MATH_STDS, MATH_KEYS);

export const resetResources = callback => {
  console.log('resetting resources...');
  Resources.remove({}, callback)
}

export const restoreIfEmpty = _ => {
  const empty = Resources.find().fetch().length < 1;
  if (empty) insertResources();
}

// used for avoiding errors
// not sure if this is needed w/ new insert function
export const nullParse = {
  url: null,
  title: null,
}

/**
 * @param {Object} keys - curriculum hierarchy
 * @returns {String} Common Core Std. Code (dot separated)
 */
export const ccCode = keys =>
  Object.values(keys).map(v => v.code).join('.');
