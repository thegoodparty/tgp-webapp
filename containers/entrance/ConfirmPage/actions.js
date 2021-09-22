import types from './constants';

function confirmCodeAction(code, email) {
  return {
    type: types.CONFIRM_CODE,
    code,
    email,
  };
}

function resendCodeAction(withEmail = false) {
  return {
    type: types.RESEND_CODE,
    withEmail,
  };
}

function updateUserAction(updatedField) {
  return {
    type: types.UPDATE_USER,
    updatedField,
  };
}

export default {
  confirmCodeAction,
  resendCodeAction,
  updateUserAction,
};
