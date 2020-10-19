import { select } from 'redux-saga/effects';
import { getCookie, getUserCookie } from './cookieHelper';

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

export const getUuid = user => {
  if (user?.uuid) {
    return user.uuid;
  }
  const uuidCookie = getCookie('guuid');
  if (uuidCookie) {
    return uuidCookie;
  }

  return '';
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

export const getUserDistrict = (congDistrict, cds) => {
  let userDistrictObj = {};
  if (congDistrict && cds?.length > 0) {
    cds.forEach(district => {
      if (district.id === congDistrict) {
        userDistrictObj = district;
      }
    });
    if (!userDistrict.code) {
      userDistrictObj = cds[0];
    }
  } else if (cds?.length > 0) {
    userDistrictObj = cds[0]; // eslint-disable-line
  }
  return userDistrictObj;
};

export const getDisplayCrew = crew => {
  const displayCrew = [];
  if (crew?.length > 0) {
    crew.forEach((crewMember, index) => {
      if (index < 3) {
        displayCrew.push(crewMember);
      }
    });
  }
  return displayCrew;
};

export const getCrewFillers = crew => {
  const crewFillers = [];
  if (crew?.length < 3) {
    const fillerCount = 3 - crew.length;
    for (let i = 0; i < fillerCount; i += 1) {
      crewFillers.push(i + 1 + 3 - fillerCount);
    }
  }
  return crewFillers;
};

export function* getUserFromStateOrCookie(makeSelectUser) {
  const userState = yield select(makeSelectUser);
  let user = userState?.user || null;
  if (user) {
    return user;
  }
  user = getUserCookie();
  return user;
}

export const getUserDistrictName = (congDistrict, cds) => {
  let districtName = '';
  if (cds?.length > 0) {
    if (congDistrict) {
      cds.forEach(district => {
        if (district.id === congDistrict) {
          districtName = district.name;
        }
      });
    } else {
      districtName = cds[0].name;
    }
  }
  return districtName;
};
