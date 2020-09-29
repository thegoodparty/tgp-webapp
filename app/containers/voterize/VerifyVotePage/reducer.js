/*
 *
 * VerifyVotePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
	isVoterRegistered: null
};

/* eslint-disable default-case, no-param-reassign */
const verifyVotePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.VERIFY_VOTER_SUCCESS:
      	draft.isVoterRegistered = true;
        break;
      case types.SKIP_VERIFY_VOTER:
      	draft.isVoterRegistered = false;
        break;
    }
  });

export default verifyVotePageReducer;
