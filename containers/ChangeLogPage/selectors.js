import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changeLogPage state domain
 */

const selectChangeLogPageDomain = state => state.changeLogPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangeLogPage
 */

const makeSelectChangeLogPage = () =>
  createSelector(
    selectChangeLogPageDomain,
    substate => substate,
  );

export default makeSelectChangeLogPage;
export { selectChangeLogPageDomain };
