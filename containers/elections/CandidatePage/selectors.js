import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the presidentialCandidatePage state domain
 */

const selectCandidateDomain = state => state.candidate || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePage
 */

const makeSelectCandidate = () =>
  createSelector(
    selectCandidateDomain,
    substate => substate,
  );

export default makeSelectCandidate;
export { selectCandidateDomain };
