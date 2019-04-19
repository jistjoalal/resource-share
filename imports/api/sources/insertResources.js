/**
 * imports/api/sources/insertResources
 * - handles inserting automated/scraped resources
 * - source files (e.g. 'khan.acad') handle the unique fields for each source
 *   (url, title)
 */

import Resources from '../resources';
import { ccCode } from './index';
import { problemAttic } from './problem.attic';
import { khanAcad } from './khan.acad';
import { illMath } from './ill.math';
import { ixl } from './ixl';

const sources = {
  grade: [ ixl, problemAttic ], // grade
  domain: [ khanAcad ], // domain
  cluster: [ ], // cluster
  standard: [ illMath ], // standard
  component: [ ], // component
};

/**
 * Inserts all resources from stds, using keySet
 * - adaptation of old code, maybe better way?
 * @param {Object} stds - curriculum hierarchy
 * @param {Array} keySet - keys for each level of hierarchy
 *   (i.e. what this part of std is called)
 * @param {Object} [keys={}] - used in recursion
 * @param {Number} [i=0] - used in recursion
 * @returns {undefined}
 */
export default insertResources = (stds, keySet, keys={}, i=0) => {
  console.log('inserting resources' + '.'.repeat(i));
  Object.values(stds).forEach(std => {
    // end recursion
    if (typeof std !== 'object') return;
    // append std to keys
    keys = { ...keys, [keySet[i]]: std };
    // insert resources for all sources at this std level
    sources[keySet[i]].forEach(source => {
      insertResource(source, keys);
    })
    // recurse sub standards
    insertResources(std, keySet, keys, i + 1);
  })
}

/**
 * Inserts a resource from a given source using std keys
 * @param {Function} source - translates std key codes into resource url
 * @param {Object} keys - curriculum hierarchy (or sub hierarchy)
 * @returns {undefined}
 */
const insertResource = (source, keys) => {
  const { title, url } = source(keys);
  if (!title || !url) return;
  const code = 'Math/' + ccCode(keys);
  Resources.insert({
    title,
    url,
    code,
    ...DEFAULT_RESOURCE(),
  });
}

// its a function so it returns actual dates
const DEFAULT_RESOURCE = _ => ({
  type: 'URL',
  username: 'Jist',
  authorId: '1234',
  score: 0,
  favoritedBy: [],
  comments: [],
  createdAt: new Date(),
});
