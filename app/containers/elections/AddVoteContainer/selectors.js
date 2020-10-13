import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addVoteContainer state domain
 */

const selectAddVoteContainerDomain = state =>
  state.addVoteContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddVoteContainer
 */

const makeSelectAddVoteContainer = () =>
  createSelector(
    selectAddVoteContainerDomain,
    substate => substate,
  );

export default makeSelectAddVoteContainer;
export { selectAddVoteContainerDomain };
