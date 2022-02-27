import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidatePage state domain
 */

const selectCandidatePageDomain = state => state.candidatePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePage
 */

const makeSelectCandidatePage = () =>
  createSelector(selectCandidatePageDomain, substate => substate);

export default makeSelectCandidatePage;
export { selectCandidatePageDomain };
