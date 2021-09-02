import types from './constants';

function registerUpdateAction(name, email, phone, zip) {
  return {
    type: types.REGISTER_UPDATE,
    name,
    email,
    phone,
    zip,
  };
}

export default {
  registerUpdateAction,
};
