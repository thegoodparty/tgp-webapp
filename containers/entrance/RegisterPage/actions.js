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

export default {
  registerAction,
};
