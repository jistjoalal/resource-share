import { ccCode, nullParse } from './index';

export const illMath = keys => {
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
