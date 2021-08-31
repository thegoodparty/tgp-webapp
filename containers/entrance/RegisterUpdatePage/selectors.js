import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerUpdatePage state domain
 */

const selectRegisterUpdatePageDomain = state =>
  state.registerUpdatePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterUpdatePage
 */

const makeSelectRegisterUpdatePage = () =>
  createSelector(
    selectRegisterUpdatePageDomain,
    substate => substate,
  );

export default makeSelectRegisterUpdatePage;
export { selectRegisterUpdatePageDomain };
