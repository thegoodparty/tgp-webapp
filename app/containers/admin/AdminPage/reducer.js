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
  candidate: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CANDIDATES:
        draft.candidates = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.LOAD_CANDIDATES_SUCCESS:
        draft.candidates = action.candidates;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_CANDIDATES_ERROR:
        draft.candidates = false;
        draft.loading = false;
        draft.error = action.error;
        break;
      case types.DELETE_USER:
        draft.loading = true;
        draft.error = true;
        break;
      case types.DELETE_USER_SUCCESS:
        let users = [...state.users];
        for (let i = 0; i < users.length; i++) {
          if (users[i].id === action.user.id) {
            users.splice(i, 1);
            break;
          }
        }
        draft.users = users;
        draft.loading = false;
        draft.error = false;
        break;
      case types.DELETE_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      case types.LOAD_ALL_USERS:
        draft.users = false;
        draft.loading = true;
        draft.error = false;
        break;
      case types.LOAD_ALL_USERS_SUCCESS:
        draft.users = action.users;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_ALL_USERS_ERROR:
        draft.users = false;
        draft.loading = false;
        draft.error = action.error;
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
        draft.candidate = candidate;
        draft.loading = false;
        break;

      case types.EDIT_CANDIDATE_SUCCESS:
        draft.candidate = action.candidate;
        draft.loading = false;
        break;

      case types.LOAD_ARTICLES_FEEDBACK_SUCCESS:
        draft.articlesFeedback = action.articlesFeedback;
        break;

      case types.LOAD_CANDIDATE:
        draft.candidate = false;
        draft.loading = true;
        draft.error = false;
        break;

      case types.LOAD_CANDIDATE_SUCCESS:
        draft.candidate = action.candidate;
        draft.loading = false;
        draft.error = false;
        break;

      case types.UPDATE_CANDIDATE_IMAGE:
        draft.loading = true;
        break;
    }
  });

export default adminPageReducer;
