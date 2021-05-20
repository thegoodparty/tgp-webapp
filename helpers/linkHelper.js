export const validateLink = link => {
  if (!link) {
    return false;
  }
  return link.includes('https://') || link.includes('http://')
    ? link
    : `https://${link}`;
};

export const getValidImgUrl = url => {
  if (!url) {
    return '';
  }
  return url.replace('thegoodparty.org', 'goodparty.org');
};
