import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectUserDomain = state => state.user || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

const makeSelectToken = () =>
  createSelector(
    selectUserDomain,
    substate => substate.token,
  );

const makeSelectUserObj = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user,
  );

export default makeSelectUser;
export { selectUserDomain, makeSelectToken, makeSelectUserObj };
