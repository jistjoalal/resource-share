import { Mongo } from 'meteor/mongo';
import axios from 'axios';
import fs from 'fs';

import GRADES from '../../grades';

export default SourceBL = new Mongo.Collection('sourceBL');

if (Meteor.isServer) {
  Meteor.publish('sourceBL', () => {
    return SourceBL.find();
  });
}

const BACKUP_FILE = process.env['PWD'] + '/imports/api/sources/better.lesson/backup.json';

export const save = () => {
  const p = SourceBL.find().fetch();
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(p));
}

export const restore = () => {
  const records = JSON.parse(fs.readFileSync(BACKUP_FILE).toString());
  records.forEach(r => {
    if (SourceBL.find({ id: r.id }).fetch().length < 1)
      SourceBL.insert(r);
  });
}

const ccCode = keys => Object.values(keys).map(v => v.code).join('.');
const blccCode = keys => {
  const { grade, domain, cluster, standard, component } = keys;
  return keys.component ?
    `${[ grade.code, domain.code, cluster.code, standard.code].join('.') + component.code}`
  : ccCode(keys);
}

const searchForMatches = q => {
  axios.get(`https://api.betterlesson.com/search?q=${q}`)
  .then(res => {
    let count = 0;
    const t = res.data.match(/"id": \d+, "name": "[\w+\d+].\w+.\w+.\d\w*"}/g) || [];
    t.forEach(v => {
      const match = JSON.parse(`{${v}`);
      const matches = SourceBL.find(match).fetch(); 
      if (matches.length < 1) {
        SourceBL.insert(match);
        count++;
      }
    });
    console.log(`${count} new matches found`);
  })
  .catch(err => console.log(err))
}

export const search = () => {
  Object.values(GRADES).forEach(grade => {
    keys = { grade };
    searchForMatches(blccCode(keys));
    searchForMatches(grade.title);
    Object.values(grade.domains).forEach(domain => {
      keys = { grade, domain };
      searchForMatches(blccCode(keys));
      searchForMatches(domain.title);
      Object.values(domain.clusters).forEach(cluster => {
        keys = { grade, domain, cluster };
        searchForMatches(blccCode(keys));
        searchForMatches(cluster.title);
        Object.values(cluster.standards).forEach(standard => {
          keys = { grade, domain, cluster, standard };
          searchForMatches(blccCode(keys));
          searchForMatches(standard.title);
          Object.values(standard.components || []).forEach(component => {
            keys = {grade, domain, cluster, standard, component };
            searchForMatches(blccCode(keys));
            searchForMatches(component.title);
          });
        });
      });
    });
  });
}
