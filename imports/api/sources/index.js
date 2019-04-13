/**
 * imports/api/sources
 * - index handles insertting these automated/scraped resources
 * - source files (e.g. 'khan.acad') handle the unique fields for each source
 *   (url, title)
 */
import Resources from '../resources';
import GRADES from '../ccssi/math-stds';
import { problemAttic } from './problem.attic';
import { khanAcad } from './khan.acad';
import { illMath } from './ill.math';
import { ixl } from './ixl';

export const nullParse = {
  url: null,
  title: null,
}

const sources = {
  grade: [ ixl, problemAttic ],
  domain: [ khanAcad ],
  cluster: [ ],
  standard: [ illMath ],
  component: [ ],
}

export const ccCode = keys => Object.values(keys).map(v => v.code).join('.');

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

const insertResource = (source, keys) => {
  const { title, url } = source(keys);
  if (!title || !url) return;
  const { grade, domain, cluster, standard, component } = keys;
  Resources.insert({
    title,
    url,
    type: 'URL',
    subject: 'Math',
    username: 'Jist',
    authorId: '1234',
    score: 0,
    favoritedBy: [],
    comments: [],
    grade: grade.code,
    domain: (domain && domain.code) || '',
    cluster: (cluster && cluster.code) || '',
    standard: (standard && standard.code) || '',
    component: (component && component.code) || '',
    createdAt: new Date(),
  });
}

export const insertResources = () => {
  let keys = {};
  const insert = sources =>
    sources.forEach(source => insertResource(source, keys));

  console.log('inserting resources...');
  Object.values(GRADES).forEach(grade => {
    keys = { grade };
    insert(sources.grade);
    Object.values(grade).forEach(domain => {
      keys = { grade, domain };
      insert(sources.domain);
      Object.values(domain).forEach(cluster => {
        keys = { grade, domain, cluster };
        insert(sources.cluster);
        Object.values(cluster).forEach(standard => {
          keys = { grade, domain, cluster, standard };
          insert(sources.standard);
          Object.values(standard || []).forEach(component => {
            keys = {grade, domain, cluster, standard, component };
            insert(sources.component);
          });
        });
      });
    });
  });
}
