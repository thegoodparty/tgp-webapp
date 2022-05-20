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

export default {
  registerAction,
  socialRegisterAction,
  twitterRegisterAction,
};
