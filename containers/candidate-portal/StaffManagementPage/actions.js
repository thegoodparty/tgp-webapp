/*
 *
 * StaffManagementPage actions
 *
 */

import types from './constants';

function addStaffAction(name, email, role, id) {
  return {
    type: types.ADD_STAFF,
    name,
    email,
    role,
    id,
  };
}

function updateStaffAction(userId, candidateId, role) {
  return {
    type: types.UPDATE_STAFF,
    userId,
    candidateId,
    role,
  };
}

function deleteStaffAction(id, candidateId) {
  return {
    type: types.DELETE_STAFF,
    id,
    candidateId,
  };
}

function deleteInvitationAction(id, candidateId) {
  return {
    type: types.DELETE_INVITATION,
    id,
    candidateId,
  };
}

function loadStaffAction(id) {
  return {
    type: types.LOAD_STAFF,
    id,
  };
}

function loadStaffActionSuccess(staff, staffInvitations) {
  return {
    type: types.LOAD_STAFF_SUCCESS,
    staff,
    staffInvitations,
  };
}

export default {
  addStaffAction,

  updateStaffAction,
  deleteInvitationAction,

  deleteStaffAction,

  loadStaffAction,
  loadStaffActionSuccess,
};
