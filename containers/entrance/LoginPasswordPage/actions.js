import types from './constants';

function loginAction(value, password, valueType) {
  return {
    type: types.LOGIN,
    value,
    password,
    valueType,
  };
}
function forgotPasswordAction(value, valueType) {
  return {
    type: types.FORGOT_PASSWORD,
    value,
    valueType,
  };
}

export default {
  loginAction,
  forgotPasswordAction,
};
