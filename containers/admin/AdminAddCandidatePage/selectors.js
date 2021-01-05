import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminAddCandidatePage state domain
 */

const selectAdminAddCandidatePageDomain = state =>
  state.adminAddCandidatePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminAddCandidatePage
 */

const makeSelectAdminAddCandidatePage = () =>
  createSelector(
    selectAdminAddCandidatePageDomain,
    substate => substate,
  );

export default makeSelectAdminAddCandidatePage;
export { selectAdminAddCandidatePageDomain };
