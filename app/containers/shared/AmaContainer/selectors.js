import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the amaContainer state domain
 */

const selectAmaContainerDomain = state => state.amaContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AmaContainer
 */

const makeSelectAmaContainer = () =>
  createSelector(
    selectAmaContainerDomain,
    substate => substate,
  );

export default makeSelectAmaContainer;
export { selectAmaContainerDomain };
