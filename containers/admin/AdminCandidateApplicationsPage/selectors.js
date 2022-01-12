import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidateApplicationsPage state domain
 */

const selectAdminCandidateApplicationsPageDomain = state =>
  state.adminCandidateApplicationsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidateApplicationsPage
 */

const makeSelectAdminCandidateApplicationsPage = () =>
  createSelector(
    selectAdminCandidateApplicationsPageDomain,
    substate => substate,
  );

export default makeSelectAdminCandidateApplicationsPage;
export { selectAdminCandidateApplicationsPageDomain };
