/*
 *
 * VerifyVotePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  voteStatus: false,
  vaResponse: false,
};

/* eslint-disable default-case, no-param-reassign */
const verifyVotePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.VERIFY_VOTER:
        draft.loading = true;
        draft.voteStatus = false;
        break;
      case types.VERIFY_VOTER_SUCCESS:
        draft.loading = false;
        draft.voteStatus = action.voteStatus;
        break;
      case types.VERIFY_VOTER_ERROR:
        draft.loading = false;
        draft.voteStatus = false;
        break;

      case types.REGISTER_VOTER:
        draft.loading = true;
        draft.vaResponse = false;
        break;
      case types.REGISTER_VOTER_SUCCESS:
        draft.loading = false;
        draft.vaResponse = action.vaResponse;
        break;
      case types.REGISTER_VOTER_ERROR:
        draft.loading = false;
        draft.vaResponse = false;
        break;
    }
  });

export default verifyVotePageReducer;
