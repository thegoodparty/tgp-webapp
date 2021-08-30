import types from './constants';

function setPasswordAction(password) {
  return {
    type: types.SET_PASSWORD,
    password,
  };
}

export default {
  setPasswordAction,
};
