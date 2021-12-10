/*
 *
 * LeaderboardPage reducer
 *
 */
/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  crew: false,
  leaderboard: false,
};

/* eslint-disable default-case, no-param-reassign */
const leaderboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CREW:
        draft.loading = false;
        draft.crew = false;
        break;

      case types.LOAD_CREW_SUCCESS:
        draft.loading = false;
        draft.crew = action.crew;
        break;

      case types.LOAD_LEADERBOARD:
        draft.loading = false;
        draft.leaderboard = false;
        break;

      case types.LOAD_LEADERBOARD_SUCCESS:
        draft.loading = false;
        draft.leaderboard = action.leaderboard;
        break;


    }
  });

export default leaderboardPageReducer;
