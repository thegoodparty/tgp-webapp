import types from './constants';

const loginAction = (value, valueType) => ({
  type: types.LOGIN,
  value,
  valueType,
});

const socialLoginAction = user => ({
  type: types.SOCIAL_LOGIN,
  user,
});

export default {
  loginAction,
  socialLoginAction,
};
