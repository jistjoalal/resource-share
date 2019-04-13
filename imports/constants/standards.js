
import MATH from '../api/ccssi/math-stds';

export const KEYS = [
  'subject',
  'grade',
  'domain',
  'cluster',
  'standard',
  'component',
];

export const STDS = {
  'Math': {
    code: 'Math',
    ...MATH,
  }
};
