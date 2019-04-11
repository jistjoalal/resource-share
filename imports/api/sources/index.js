import Resources from '../resources';
import GRADES from '../ccssi/math-stds';
import { records } from './better.lesson/backup';

export const resetResources = callback => {
  console.log('resetting resources...');
  Resources.remove({}, callback)
}

const insertResource = (source, keys) => {
  const { title, url } = source(keys);
  if (!title || !url) return;
  const { grade, domain, cluster, standard, component } = keys;
  Resources.insert({
    title,
    url,
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

export const restoreIfEmpty = () => {
  const empty = Resources.find().fetch().length < 1;
  if (empty) {
    insertResources();
  }
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

const ccCode = keys => Object.values(keys).map(v => v.code).join('.');
const blccCode = keys => {
  const { grade, domain, cluster, standard, component } = keys;
  return keys.component ?
    `${[ grade.code, domain.code, cluster.code, standard.code].join('.') + component.code}`
  : ccCode(keys);
}

const nullParse = {
  url: null,
  title: null,
}

const betterLesson = keys => {
  // no dot before component
  const blCode = blccCode(keys);
  const record = records.filter(r => r.name === blCode)[0];
  if (record) {
    return {
      url: `https://api.betterlesson.com/search?standards=${record.id}`,
      title: `${ccCode(keys)} - BetterLesson Lesson Plans`,
    };
  }
  return nullParse;
}

const khanAcad = keys => {
  const { grade, domain } = keys;
  const baseUrl = 'https://www.khanacademy.org/commoncore/grade-';
  if (!grade.code || !domain.code) {
    return nullParse;
  }
  const title = `${ccCode(keys)} - KhanAcademy Exercises`;
  // high school
  if (grade.code[0] == 'H') {
    return {
      url: baseUrl + `${grade.code}-${grade.code[2]}-${domain.code}`, 
      title,
    }
  }
  // K-8
  return {
    url: baseUrl + `${grade.code}-${domain.code}`,
    title,
  }
}

const illMath = keys => {
  const { grade, domain, cluster, standard } = keys;
  if (!grade.code || !domain.code || !cluster.code || !standard.code) {
    return nullParse;
  }
  return {
    url: ('https://tasks.illustrativemathematics.org/content-standards/'
      + `${grade.code}/${domain.code}/${cluster.code}/${standard.code}`
    ),
    title: `${ccCode(keys)} - Illustrative Mathematics`,
  };
}

const ixl = keys => {
  const baseUrl = 'https://www.ixl.com/standards/common-core/math/';
  const { grade } = keys;
  const url = (
    grade.code === 'K'    ? `${baseUrl}kindergarten`
  : grade.code[0] === 'H' ? `${baseUrl}high-school`
  :                         `${baseUrl}grade-${grade.code}`);
  const title = (
    grade.code[0] === 'H' ? `IXL ${grade.code} Skills Practice`
    :                       `IXL Grade ${grade.code} Skills Practice`)
  return {
    url,
    title,
  }
}

const sources = {
  grade: [ ixl ],
  domain: [ khanAcad ],
  cluster: [ ],
  standard: [ illMath ],
  component: [ ],
}
