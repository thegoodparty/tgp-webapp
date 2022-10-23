import types from './constants';

function registerAction(name, email, phone, zip, callback, source = false) {
  return {
    type: types.REGISTER,
    name,
    email,
    phone,
    zip,
    callback,
    source,
  };
}

const socialRegisterAction = (socialUser) => ({
  type: types.SOCIAL_REGISTER,
  socialUser,
});

const twitterRegisterAction = () => ({
  type: types.TWITTER_REGISTER,
});

const verifyRecaptchaAction = (token) => ({
  type: types.VERIFY_RECAPTCHA,
  token,
});

const verifyRecaptchaActionSuccess = (score) => ({
  type: types.VERIFY_RECAPTCHA_SUCCESS,
  score,
});

const verifyRecaptchaActionError = () => ({
  type: types.VERIFY_RECAPTCHA_ERROR,
});

export default {
  registerAction,
  socialRegisterAction,
  twitterRegisterAction,
  verifyRecaptchaAction,
  verifyRecaptchaActionSuccess,
  verifyRecaptchaActionError,
};
