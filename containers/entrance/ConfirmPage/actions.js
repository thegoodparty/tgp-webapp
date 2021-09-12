import types from './constants';

function confirmCodeAction(code) {
  return {
    type: types.CONFIRM_CODE,
    code,
  };
}

function resendCodeAction(withEmail = false) {
  return {
    type: types.RESEND_CODE,
    withEmail,
  };
}

export default {
  confirmCodeAction,
  resendCodeAction,
};
