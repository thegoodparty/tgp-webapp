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

export const uuidUrl = (user, url = 'https://thegoodparty.org') => {
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

export const userDistrict = user => {
  if (!user) {
    return null;
  }
  const { districtNumber, zipCode, congDistrict } = user;

  if (districtNumber) {
    return districtNumber;
  }

  if (!zipCode) {
    return null;
  }

  const { cds } = zipCode;
  if (cds && cds.length > 0) {
    cds.forEach(district => {
      if (district.id === congDistrict) {
        return district.code;
      }
    });
    return cds[0].code;
  }
  return null;
};
