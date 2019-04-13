import React from 'react';

import MATH_STDS from '../../api/ccssi/math-stds';

import App from './App';

const MATH_KEYS = ['grade', 'domain', 'cluster', 'standard', 'component'];

export default CCMath = _ =>
  <App subject="Math" KEYS={MATH_KEYS} STDS={MATH_STDS} />
