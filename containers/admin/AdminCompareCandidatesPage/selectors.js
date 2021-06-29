import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCompareCandidatesPage state domain
 */

const selectAdminCompareCandidatesPageDomain = state =>
  state.adminCompareCandidatesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCompareCandidatesPage
 */

const makeSelectAdminCompareCandidatesPage = () =>
  createSelector(
    selectAdminCompareCandidatesPageDomain,
    substate => substate,
  );

export default makeSelectAdminCompareCandidatesPage;
export { selectAdminCompareCandidatesPageDomain };
