import { Mongo } from 'meteor/mongo';
import axios from 'axios';
import fs from 'fs';

import GRADES from '../../ccssi/math-stds';

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
  // high school
  if (!/\d/.test(grade.code)) {
    return `${grade.code}-${domain.code}.${cluster.code}.${standard.code}`
  }
  // K-8
  return keys.component ?
    [ grade.code, domain.code, cluster.code, standard.code ].join('.') + component.code
  : ccCode({grade, domain, cluster, standard});
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
    console.log(`${count} new matches found for ${q}`);
  })
  .catch(err => console.log(err))
}

export const search = () => {
  // idk how to scrape these anymore
}
