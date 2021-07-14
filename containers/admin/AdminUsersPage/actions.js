import types from './constants';

function loadAllUsers() {
  return {
    type: types.LOAD_ALL_USERS,
  };
}

function loadAllUsersSuccess(users) {
  return {
    type: types.LOAD_ALL_USERS_SUCCESS,
    users,
  };
}

function loadAllUsersError(error) {
  return {
    type: types.LOAD_ALL_USERS_ERROR,
    error,
  };
}

function deleteUser(user) {
  return {
    type: types.DELETE_USER,
    user,
  };
}

export default {
  loadAllUsers,
  loadAllUsersSuccess,
  loadAllUsersError,

  deleteUser,
};
