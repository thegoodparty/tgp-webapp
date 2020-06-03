/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  candidates: false,
  users: false,
  loading: false,
  error: false,
  articlesFeedback: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CANDIDATES:
        draft.candidates = false;
        draft.loading = true;
        draft.errog = false;
        break;
      case types.LOAD_CANDIDATES_SUCCESS:
        draft.candidates = action.candidates;
        draft.loading = false;
        draft.errog = false;
        break;
      case types.LOAD_CANDIDATES_ERROR:
        draft.candidates = false;
        draft.loading = false;
        draft.errog = action.error;
        break;

      case types.LOAD_ALL_USERS:
        draft.users = false;
        draft.loading = true;
        draft.errog = false;
        break;
      case types.LOAD_ALL_USERS_SUCCESS:
        draft.users = action.users;
        draft.loading = false;
        draft.errog = false;
        break;
      case types.LOAD_ALL_USERS_ERROR:
        draft.users = false;
        draft.loading = false;
        draft.errog = action.error;
        break;

      case types.UPDATE_CANDIDATE_SUCCESS:
        const updatedCandidates = [...state.candidates];
        const { candidate } = action;
        for (let i = 0; i < updatedCandidates.length; i++) {
          const cand = updatedCandidates[i];
          if (
            cand.id === candidate.id &&
            cand.isIncumbent === candidate.isIncumbent
          ) {
            updatedCandidates[i] = candidate;
            break;
          }
        }
        draft.candidates = updatedCandidates;
        break;

      case types.LOAD_ARTICLES_FEEDBACK_SUCCESS:
        draft.articlesFeedback = action.articlesFeedback;
    }
  });

export default adminPageReducer;
