import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidateNewPage state domain
 */

const selectCandidateNewPageDomain = state =>
  state.candidateNewPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidateNewPage
 */

const makeSelectCandidateNewPage = () =>
  createSelector(
    selectCandidateNewPageDomain,
    substate => substate,
  );

export default makeSelectCandidateNewPage;
export { selectCandidateNewPageDomain };
