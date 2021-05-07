export const validateLink = link =>
  link.includes('https://') || link.includes('http://')
    ? link
    : `https://${link}`;
