/*
 *
 * VerifyVotePage actions
 *
 */

import types from './constants';

function verifyVoterAction(voter, user) {
  return {
    type: types.VERIFY_VOTER,
    voter,
    user,
  };
}

function verifyVoterActionSuccess(voteStatus) {
  return {
    type: types.VERIFY_VOTER_SUCCESS,
    voteStatus,
  };
}

function verifyVoterActionError(error) {
  return {
    type: types.VERIFY_VOTER_ERROR,
    error,
  };
}

function registerVoterAction(voter) {
  return {
    type: types.REGISTER_VOTER,
    voter,
  };
}

function registerVoterActionSuccess(vaResponse) {
  return {
    type: types.REGISTER_VOTER_SUCCESS,
    vaResponse,
  };
}

function registerVoterActionError(error) {
  return {
    type: types.REGISTER_VOTER_ERROR,
    error,
  };
}

export default {
  verifyVoterAction,
  verifyVoterActionSuccess,
  verifyVoterActionError,
  registerVoterAction,
  registerVoterActionSuccess,
  registerVoterActionError,
};
