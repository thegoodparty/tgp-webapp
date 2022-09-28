import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the followButtonContainer state domain
 */

const selectFollowButtonContainerDomain = state => state.followButtonContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FollowButtonContainer
 */

const makeSelectFollowButtonContainer = () =>
  createSelector(selectFollowButtonContainerDomain, substate => substate);

export default makeSelectFollowButtonContainer;
export { selectFollowButtonContainerDomain };
