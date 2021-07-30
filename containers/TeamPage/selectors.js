import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teamPage state domain
 */

const selectTeamPageDomain = state => state.teamPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeamPage
 */

const makeSelectTeamPage = () =>
  createSelector(
    selectTeamPageDomain,
    substate => substate,
  );

export default makeSelectTeamPage;
export { selectTeamPageDomain };
