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

export default {
	verifyVoter,
};