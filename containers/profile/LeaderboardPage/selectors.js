import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the leaderboardPage state domain
 */

const selectLeaderboardPageDomain = state =>
  state.leaderboardPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LeaderboardPage
 */

const makeSelectLeaderboardPage = () =>
  createSelector(
    selectLeaderboardPageDomain,
    substate => substate,
  );

export default makeSelectLeaderboardPage;
export { selectLeaderboardPageDomain };
