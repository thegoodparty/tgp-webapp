import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidateListPage state domain
 */

const selectAdminCandidateListPageDomain = state =>
  state.adminCandidateListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidateListPage
 */

const makeSelectAdminCandidateListPage = () =>
  createSelector(
    selectAdminCandidateListPageDomain,
    substate => substate,
  );

export default makeSelectAdminCandidateListPage;
export { selectAdminCandidateListPageDomain };
