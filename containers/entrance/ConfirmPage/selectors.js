import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the confirmPage state domain
 */

const selectConfirmPageDomain = state => state.confirmPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConfirmPage
 */

const makeSelectConfirmPage = () =>
  createSelector(
    selectConfirmPageDomain,
    substate => substate,
  );

export default makeSelectConfirmPage;
export { selectConfirmPageDomain };
