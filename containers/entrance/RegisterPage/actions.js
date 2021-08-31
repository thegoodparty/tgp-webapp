import types from './constants';

function registerAction(name, email, phone, zip) {
  return {
    type: types.REGISTER,
    name,
    email,
    phone,
    zip,
  };
}

const socialRegisterAction = socialUser => ({
  type: types.SOCIAL_REGISTER,
  socialUser,
});

export default {
  registerAction,
  socialRegisterAction,
};
