import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the passwordCreationPage state domain
 */

const selectPasswordCreationPageDomain = state =>
  state.passwordCreationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PasswordCreationPage
 */

const makeSelectPasswordCreationPage = () =>
  createSelector(
    selectPasswordCreationPageDomain,
    substate => substate,
  );

export default makeSelectPasswordCreationPage;
export { selectPasswordCreationPageDomain };
