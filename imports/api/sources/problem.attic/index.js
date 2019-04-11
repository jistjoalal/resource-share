import $ from 'cheerio';
import axios from 'axios';

const URL = 'https://www.problem-attic.com';

export default SourcePA = new Mongo.Collection('sourcePA');

if (Meteor.isServer) {
  Meteor.publish('sourcePA', () => {
    return SourcePA.find();
  });
}

export const search = _ => {
  axios.get(URL + '/ccss-math/')
  .then(res => parse(res.data))
  .then(hits => hits.forEach(hit => SourcePA.insert(hit)))
}

const parse = html => {
  const hits = $('.infopage > ul > li > a', html).toArray();
  const t = hits.map(({ children, attribs }) => {
    return {
      URL: URL + attribs.href,
      grade: gradeIdToCCCode(children[0].data),
    }
  })
  return t;
}

const gradeIdToCCCode = gradeId => {
  if (/Grade/.test(gradeId)) {
    return gradeId.split` `[1];
  }
  return `HS${gradeId[0]}`;
}
