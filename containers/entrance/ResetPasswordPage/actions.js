import types from './constants';

const resetPasswordAction = (email, phone, password, token) => ({
  type: types.RESET_PASSWORD,
  email,
  phone,
  password,
  token,
});

export default {
  resetPasswordAction,
};
