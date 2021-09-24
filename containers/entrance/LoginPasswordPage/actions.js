import types from './constants';

function loginAction(email, password) {
  return {
    type: types.LOGIN,
    email,
    password,
  };
}
function forgotPasswordAction(email) {
  return {
    type: types.FORGOT_PASSWORD,
    email,
  };
}

export default {
  loginAction,
  forgotPasswordAction,
};
