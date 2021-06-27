import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidateImagePage state domain
 */

const selectAdminCandidateImagePageDomain = state =>
  state.adminCandidateImagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidateImagePage
 */

const makeSelectAdminCandidateImagePage = () =>
  createSelector(
    selectAdminCandidateImagePageDomain,
    substate => substate,
  );

export default makeSelectAdminCandidateImagePage;
export { selectAdminCandidateImagePageDomain };
