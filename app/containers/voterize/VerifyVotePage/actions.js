/*
 *
 * VerifyVotePage actions
 *
 */

import types from './constants';

function verifyVoter(voter) {
  return {
    type: types.VERIFY_VOTER,
    voter,
  };
}

function skipVerifyVoterAction() {
	return {
    type: types.SKIP_VERIFY_VOTER,
  };
}
function verifyVoterSuccessAction() {
  return {
    type: types.VERIFY_VOTER_SUCCESS,
  };
}

export default {
	verifyVoter,
	verifyVoterSuccessAction,
	skipVerifyVoterAction
};