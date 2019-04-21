/**
 * imports/api/sources
 * - insertResources handles insertting these automated/scraped resources
 * - source files (e.g. 'khan.acad') handle the unique fields for each source
 *   (url, title)
 */
import Resources from '../resources';
import { problemAttic } from './problem.attic';
import { khanAcad } from './khan.acad';
import { openMiddle } from './open.middle';
import { illMath } from './ill.math';
import { ixl } from './ixl';
import insertResources from './insertResources';

import MATH_STDS from '../ccssi/math-stds';
const MATH_KEYS = ['grade', 'domain', 'cluster', 'standard', 'component'];
const MATH_SOURCES = {
  grade: [ ixl, problemAttic, openMiddle ],
  domain: [ khanAcad, openMiddle ],
  cluster: [ ],
  standard: [ illMath ],
  component: [ ],
}

export const insertMathResources = _ => {
  console.log('inserting math resources...')
  insertResources(MATH_STDS, MATH_KEYS, MATH_SOURCES);
}

export const nullParse = {
  url: null,
  title: null,
}

export const ccCode = keys =>
  Object.values(keys).map(v => v.code).join('.');

export const resetResources = callback => {
  console.log('resetting resources...');
  Resources.remove({}, callback)
}

export const restoreIfEmpty = () => {
  const empty = Resources.find().fetch().length < 1;
  if (empty) {
    insertResources();
  }
}
