import produce from 'immer';
import { getCookie, setCookie } from 'helpers/cookieHelper';

import types from './constants';

export const initialState = {
  candidate: false,
  loading: false,
  error: false,
  presidentialRank: false,
  senateRank: false,
  houseRank: false,
  incumbent: false,
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
        setCookie(
          'presidentialRank',
          JSON.stringify(action.presidentialRank || []),
        );
        draft.presidentialRank = action.presidentialRank;
        break;

      case types.SAVE_RANK_SENATE_CANDIDATE:
        const senateState = action.state || '';
        const newRank = { [senateState]: action.senateRank || [] };
        setCookie('senateRank', JSON.stringify(newRank));
        draft.senateRank = newRank;
        break;

      case types.SAVE_RANK_HOUSE_CANDIDATE:
        const houseState = action.state || '';
        const district = action.district || '';
        const newRank2 = {
          [`${houseState}${district}`]: action.houseRank || [],
        };
        setCookie('houseRank', JSON.stringify(newRank2));
        draft.houseRank = newRank2;
        break;

      case types.LOAD_DISTRICT_INCUMBENT:
        draft.incumbent = false;
        break;

      case types.LOAD_DISTRICT_INCUMBENT_SUCCESS:
        draft.incumbent = action.incumbent;
        break;

      case types.LOAD_RANKING_FROM_COOKIE:
        if (!state.presidentialRank) {
          const cookie = getCookie('presidentialRank');
          draft.presidentialRank = JSON.parse(cookie);
        }
        if (!state.senateRank) {
          const cookie = getCookie('senateRank');
          draft.senateRank = JSON.parse(cookie);
        }
        if (!state.houseRank) {
          const cookie = getCookie('houseRank');
          draft.houseRank = JSON.parse(cookie);
        }
        break;
    }
  });

export default districtReducer;
