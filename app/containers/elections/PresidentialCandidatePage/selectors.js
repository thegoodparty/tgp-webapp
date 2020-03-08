import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the presidentialCandidatePage state domain
 */

const selectPresidentialCandidatePageDomain = state =>
  state.presidentialCandidatePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PresidentialCandidatePage
 */

const makeSelectPresidentialCandidatePage = () =>
  createSelector(
    selectPresidentialCandidatePageDomain,
    substate => substate,
  );

export default makeSelectPresidentialCandidatePage;
export { selectPresidentialCandidatePageDomain };
