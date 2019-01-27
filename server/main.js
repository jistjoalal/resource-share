import { Meteor } from 'meteor/meteor';

import '../imports/config/simple-schema-config';
import Resources from '../imports/api/resources';
import GRADES from '../imports/api/grades';

Meteor.startup(() => {
  resetResources(() => insertResources());
});

const resetResources = callback => {
  console.log('resetting resources...');
  Resources.remove({}, callback)
}

const insertResources = () => {
  let keys = {};
  const insert = source => {
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
  console.log('inserting resources...');
  Object.values(GRADES).forEach(grade => {
    keys = { grade };

    //grade level resources
    insert(hcpss);
    Object.values(grade.domains).forEach(domain => {
      keys = { grade, domain };
      Object.values(domain.clusters).forEach(cluster => {
        keys = { grade, domain, cluster };
        Object.values(cluster.standards).forEach(standard => {
          keys = { grade, domain, cluster, standard };

          // standard level resources
          insert(eduDotCom);
          insert(khanAcad);
          insert(illMath);

          if (standard.components) {
            Object.values(standard.components).forEach(component => {
              keys = {grade, domain, cluster, standard, component };

              // component level resources
              insert(khanAcad);
            });
          }
        });
      });
    });
  });
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

const ccCode = keys => Object.values(keys).map(v => v.code).join('.');

const eduDotCom = keys => {
  return {
    url: `https://www.education.com/common-core/CCSS.MATH.CONTENT.${ccCode(keys)}/`,
    title: `${ccCode(keys)} Worksheets, Workbooks, Lesson Plans, and Games`, 
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

const illMath = keys => {
  const { grade, domain, cluster, standard } = keys;
  return {
    url: ('https://tasks.illustrativemathematics.org/content-standards/'
      + `${grade.code}/${domain.code}/${cluster.code}/${standard.code}`
    ),
    title: `Illustrative Mathematics ${ccCode(keys)}`,
  };
}
