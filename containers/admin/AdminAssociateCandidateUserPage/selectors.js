import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminAssociateCandidateUserPage state domain
 */

const selectAdminAssociateCandidateUserPageDomain = state =>
  state.adminAssociateCandidateUserPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminAssociateCandidateUserPage
 */

const makeSelectAdminAssociateCandidateUserPage = () =>
  createSelector(
    selectAdminAssociateCandidateUserPageDomain,
    substate => substate,
  );

export default makeSelectAdminAssociateCandidateUserPage;
export { selectAdminAssociateCandidateUserPageDomain };
