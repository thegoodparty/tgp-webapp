import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidateUpdatesPage state domain
 */

const selectAdminCandidateUpdatesPageDomain = state =>
  state.adminCandidateUpdatesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidateUpdatesPage
 */

const makeSelectAdminCandidateUpdatesPage = () =>
  createSelector(
    selectAdminCandidateUpdatesPageDomain,
    substate => substate,
  );

export default makeSelectAdminCandidateUpdatesPage;
export { selectAdminCandidateUpdatesPageDomain };
