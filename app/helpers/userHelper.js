import { getCookie } from './cookieHelper';

export const getInitials = name => {
  if (!name) {
    return name;
  }
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const fullFirstLastInitials = name => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
  }
  if (names.length === 1) {
    return names[0];
  }
  return '';
};

export const uuidUrl = (user, url = 'https://www.thegoodparty.org') => {
  let returnUrl = url;
  if (user && user.uuid) {
    returnUrl = `${url}?u=${user.uuid}`;
  } else {
    const uuidCookie = getCookie('guuid');
    if (uuidCookie) {
      returnUrl = `${url}?u=${uuidCookie}`;
    }
  }
  return returnUrl;
};
