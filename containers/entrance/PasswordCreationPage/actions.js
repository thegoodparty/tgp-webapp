import types from './constants';

function setPasswordAction(password) {
  return {
    type: types.SET_PASSWORD,
    password,
  };
}

function saveApplicationAction(application) {
  return {
    type: types.SAVE_APPLICATION,
    application,
  };
}

export default {
  setPasswordAction,
  saveApplicationAction,
};
