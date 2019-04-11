import { ccCode, nullParse } from './index';

export const khanAcad = keys => {
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
