import Resources from '../resources';
import GRADES from '../grades';
import fs from 'fs';

// only needed for ghetto BL scraping stuff
// import SourceBL, { restore } from './better.lesson';

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
    Object.values(grade.domains).forEach(domain => {
      keys = { grade, domain };
      insert(sources.domain);
      Object.values(domain.clusters).forEach(cluster => {
        keys = { grade, domain, cluster };
        insert(sources.cluster);
        Object.values(cluster.standards).forEach(standard => {
          keys = { grade, domain, cluster, standard };
          insert(sources.standard);
          Object.values(standard.components || []).forEach(component => {
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

const BL_FILE = process.env['PWD'] + '/imports/api/sources/better.lesson/backup.json';
const records = JSON.parse(fs.readFileSync(BL_FILE).toString());
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
  return {
    url: null,
    title: null,
  };
}

const khanAcad = keys => {
  const { grade, domain, cluster, standard, component } = keys;
  return {
    url: ('https://www.khanacademy.org/commoncore/grade-'
      + `${grade.code}-${domain.code}`
      + `#${grade.code}.${domain.code}.${cluster.code}.${standard.code}`
      + (component ? component.code : '')
    ),
    title: `${ccCode(keys)} - KhanAcademy Exercises`
  }
}

const eduDotCom = keys => {
  return {
    url: `https://www.education.com/common-core/CCSS.MATH.CONTENT.${ccCode(keys)}/`,
    title: `${ccCode(keys)} - Worksheets, Workbooks, Lesson Plans, and Games`, 
  };
}

const illMath = keys => {
  const { grade, domain, cluster, standard } = keys;
  return {
    url: ('https://tasks.illustrativemathematics.org/content-standards/'
      + `${grade.code}/${domain.code}/${cluster.code}/${standard.code}`
    ),
    title: `${ccCode(keys)} - Illustrative Mathematics`,
  };
}

const hcpss = keys => {
  const urls = {
    K: 'https://hcpss.instructure.com/courses/124',
    '1': 'https://hcpss.instructure.com/courses/9414',
    '2': 'https://hcpss.instructure.com/courses/106',
    '3': 'https://hcpss.instructure.com/courses/97',
    '4': 'https://hcpss.instructure.com/courses/107',
    '5': 'https://hcpss.instructure.com/courses/108',
  };
  return {
    url: urls[keys.grade.code],
    title: `Howard County Public Schools ${keys.grade.title} Course`,
  };
}

const ixl = keys => {
  const baseUrl = 'https://www.ixl.com/standards/common-core/math/';
  const { grade } = keys;
  const url = (grade.code === 'K' ?
    `${baseUrl}kindergarten`
  : `${baseUrl}grade-${grade.code}`);
  return {
    url,
    title: `IXL ${grade.title} Skills Practice`
  }
}

const sources = {
  grade: [ hcpss, ixl ],
  domain: [],
  cluster: [],
  standard: [ eduDotCom, khanAcad, illMath, betterLesson ],
  component: [ khanAcad, betterLesson ],
}
