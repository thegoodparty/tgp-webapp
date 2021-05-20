export const validateLink = link =>
  link.includes('https://') || link.includes('http://')
    ? link
    : `https://${link}`;

export const getValidImgUrl = url =>
  url.replace('thegoodparty.org', 'goodparty.org');
