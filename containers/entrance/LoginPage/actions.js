import types from './constants';

const loginAction = email => ({
  type: types.LOGIN,
  email,
});

const socialLoginAction = user => ({
  type: types.SOCIAL_LOGIN,
  user,
});

export default {
  loginAction,
  socialLoginAction,
};
