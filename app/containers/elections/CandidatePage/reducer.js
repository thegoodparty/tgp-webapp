import produce from 'immer';
import { getCookie, setCookie } from 'helpers/cookieHelper';

import types from './constants';

export const initialState = {
  candidate: false,
  loading: false,
  error: false,
  presidentialRank: false,
};

const districtReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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

      case types.LOAD_CANDIDATE_ERROR:
        draft.candidate = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case types.SAVE_RANK_PRESIDENTIAL_CANDIDATE:
        setCookie('presidentialRank', JSON.stringify(action.presidentialRank));
        draft.presidentialRank = action.presidentialRank;
        break;

      case types.LOAD_RANKING_FROM_COOKIE:
        if (!state.presidentialRank) {
          const cookie = getCookie('presidentialRank');
          draft.presidentialRank = JSON.parse(cookie);
        }
        break;
    }
  });

export default districtReducer;
