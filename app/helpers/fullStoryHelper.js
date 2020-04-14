import { getCookie } from './cookieHelper';

export const fullStoryIdentify = user => {
  if (!FS) {
    return;
  }
  if (user) {
    FS.identify(user.id, {
      displayName: user.name,
      email: user.email,
    });
  } else {
    let cookieUser = getCookie('user');
    if (cookieUser) {
      cookieUser = JSON.parse(cookieUser);
      FS.identify(cookieUser.id, {
        displayName: cookieUser.name,
        email: cookieUser.email,
      });
    }
  }
};
