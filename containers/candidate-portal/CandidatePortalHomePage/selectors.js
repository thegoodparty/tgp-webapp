import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidatePortalHomePage state domain
 */

const selectCandidatePortalHomePageDomain = state =>
  state.candidatePortalHomePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePortalHomePage
 */

const makeSelectCandidatePortalHomePage = () =>
  createSelector(
    selectCandidatePortalHomePageDomain,
    substate => substate,
  );

export default makeSelectCandidatePortalHomePage;
export { selectCandidatePortalHomePageDomain };
