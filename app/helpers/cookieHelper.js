
export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURI(
      parts
        .pop()
        .split(';')
        .shift(),
    );
  return false;
};

export const setCookie = (name, value, days = 120) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}; SameSite=Strict`;
  }
  document.cookie = `${name}=${encodeURI(value) || ''}${expires}; path=/`;
};

export const deleteCookies = () => {
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
};

export const deleteCookie = name => {
  setCookie(name, '', 0);
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const setUserCookie = value => {
  const val = typeof value === 'string' ? value : JSON.stringify(value);
  setCookie('user', val);
};

export const getUserCookie = () => {
  return getCookie('user');
};

export const setSignupRedirectCookie = (route, options = {}) => {
  const cookie = {
    route,
    options,
  };
  setCookie('signupRedirect', JSON.stringify(cookie));
};

export const getSignupRedirectCookie = () => {
  const cookie = getCookie('signupRedirect');
  if (cookie) {
    return JSON.parse(cookie);
  }
  return false;
};

export const deleteSignupRedirectCookie = () => {
  deleteCookie('signupRedirect');
};

