import types from './constants';

function registerAction(name, email, phone, zip, callback) {
  return {
    type: types.REGISTER,
    name,
    email,
    phone,
    zip,
    callback,
  };
}

const socialRegisterAction = socialUser => ({
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
