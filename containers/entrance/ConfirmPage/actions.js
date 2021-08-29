import types from './constants';

function confirmCodeAction(code) {
  return {
    type: types.CONFIRM_CODE,
    code,
  };
}

function resendCodeAction() {
  return {
    type: types.RESEND_CODE,
  };
}

export default {
  confirmCodeAction,
  resendCodeAction,
};
