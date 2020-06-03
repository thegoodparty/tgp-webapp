import { getUserCookie } from './cookieHelper';

export const fullStoryIdentify = user => {
  if (typeof FS === 'undefined') {
    return;
  }
  if (user) {
    FS.identify(user.id, {
      displayName: user.name,
      email: user.email,
    });
  } else {
    let cookieUser = getUserCookie();
    if (cookieUser) {
      cookieUser = JSON.parse(cookieUser);
      FS.identify(cookieUser.id, {
        displayName: cookieUser.name,
        email: cookieUser.email,
      });
    }
  }
};
