import types from './constants';

const resetPasswordAction = (email, password, token) => ({
  type: types.RESET_PASSWORD,
  email,
  password,
  token,
});

export default {
  resetPasswordAction,
};
