import React from 'react';
import { getCookie, setCookie } from './cookieHelper';
import utms from './utms';

export const getUtmExperiment = (utmContent, utmSource) => {
  const cookieUtm = getCookie('gp-utm');
  if (!utmContent && !cookieUtm) {
    return utms['default'];
  }
  if (!cookieUtm && utmContent) {
    setUtmExperiment(utmContent);
  }
  if (utms[utmContent]) {
    return utms[utmContent];
  }
  if (utms[cookieUtm]) {
    return utms[cookieUtm];
  }
  return utms['default'];
};

export const setUtmExperiment = (utm) => {
  setCookie('gp-utm', utm);
};
