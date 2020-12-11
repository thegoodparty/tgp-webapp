import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifyVotePage state domain
 */

const selectVerifyVotePageDomain = state =>
  state.verifyVotePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VerifyVotePage
 */

const makeSelectVerifyVotePage = () =>
  createSelector(
    selectVerifyVotePageDomain,
    substate => substate,
  );

export default makeSelectVerifyVotePage;
export { selectVerifyVotePageDomain };
