/* eslint-disable camelcase, no-undef */
export const gaEvent = (name, context = {}) => {
  if (typeof gtag === 'undefined') {
    return;
  }
  if (context) {
    gtag('event', name, context);
    return;
  }
  gtag('event', name);
};
