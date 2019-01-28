import Resources from './resources';
import GRADES from './grades';

export const resetResources = callback => {
  console.log('resetting resources...');
  Resources.remove({}, callback)
}

const insertResource = (source, keys) => {
  const { title, url } = source(keys);
  const { grade, domain, cluster, standard, component } = keys;
  Resources.insert({
    title,
    url,
    grade: grade.code,
    domain: (domain && domain.code) || '',
    cluster: (cluster && cluster.code) || '',
    standard: (standard && standard.code) || '',
    component: (component && component.code) || '',
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
    title: `${ccCode(keys)} Worksheets, Workbooks, Lesson Plans, and Games`, 
  };
}

const illMath = keys => {
  const { grade, domain, cluster, standard } = keys;
  return {
    url: ('https://tasks.illustrativemathematics.org/content-standards/'
      + `${grade.code}/${domain.code}/${cluster.code}/${standard.code}`
    ),
    title: `Illustrative Mathematics ${ccCode(keys)}`,
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

const sources = {
  grade: [ hcpss ],
  domain: [],
  cluster: [],
  standard: [ eduDotCom, khanAcad, illMath ],
  component: [ khanAcad ],
}
