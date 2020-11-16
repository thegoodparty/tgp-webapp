/* eslint-disable camelcase, no-undef */
export const gaEvent = (
  event_label,
  value,
  event_category = 'navigation',
  action = 'click',
) => {
  if (typeof gtag === 'undefined') {
    return;
  }
  if (value && event_label) {
    gtag('event', action, {
      event_category,
      event_label,
      value,
    });
    return;
  }

  if (event_label) {
    gtag('event', action, {
      event_category,
      event_label,
    });
    return;
  }

  gtag('event', action, {
    event_category,
  });
};
