import { nullParse, ccCode } from './index';
import Descriptions from '../descriptions';

export const openMiddle = keys => {
  const { grade, domain } = keys;
  if (grade.code[0] == 'H') {
    // high school
    const domains = {
      HSS: 'statistics-and-probability',
      HSG: 'geometry',
      HSF: 'functions',
      HSN: 'number-and-quantity',
      HSA: 'algebra',
    }
    const baseUrl = 'http://www.openmiddle.com/category/high-school-';
    return {
      title: 'Open Middle - ' + grade.code,
      url: baseUrl + domains[grade.code],
    }
  }
  else if (grade.code[0] != 'H') {
    if (!domain) return nullParse
    // k-8
    const code = 'Math/' + ccCode(keys);
    const gradeCode = 'Math/' + grade.code;
    const desc = Descriptions.findOne({ code });
    const gradeDesc = Descriptions.findOne({ code: gradeCode });
    if (!gradeDesc) return nullParse;
    const g = gradeDesc.title.replace(/ /g, '-');
    const d = desc.title.replace(/ & /g, ' ').replace(/ /g, '-');
    const baseUrl = 'http://www.openmiddle.com/category/';
    return {
      title: 'Open Middle - ' + code,
      url: baseUrl + `${g}/${d}-${g}`,
    }
  }
  return nullParse;
}
