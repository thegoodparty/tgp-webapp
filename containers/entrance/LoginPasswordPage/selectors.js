import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPasswordPage state domain
 */

const selectLoginPasswordPageDomain = state =>
  state.loginPasswordPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPasswordPage
 */

const makeSelectLoginPasswordPage = () =>
  createSelector(
    selectLoginPasswordPageDomain,
    substate => substate,
  );

export default makeSelectLoginPasswordPage;
export { selectLoginPasswordPageDomain };
