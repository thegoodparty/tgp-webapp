import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerComboContainer state domain
 */

const selectRegisterComboContainerDomain = state => state.registerComboContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterComboContainer
 */

const makeSelectRegisterComboContainer = () =>
  createSelector(selectRegisterComboContainerDomain, substate => substate);

export default makeSelectRegisterComboContainer;
export { selectRegisterComboContainerDomain };
