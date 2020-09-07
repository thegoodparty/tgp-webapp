import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the voterizePage state domain
 */

const selectVoterizePageDomain = state => state.voterizePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VoterizePage
 */

const makeSelectVoterizePage = () =>
  createSelector(
    selectVoterizePageDomain,
    substate => substate,
  );

export default makeSelectVoterizePage;
export { selectVoterizePageDomain };
