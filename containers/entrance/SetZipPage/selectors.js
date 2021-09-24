import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the setZipPage state domain
 */

const selectSetZipPageDomain = state => state.setZipPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SetZipPage
 */

const makeSelectSetZipPage = () =>
  createSelector(
    selectSetZipPageDomain,
    substate => substate,
  );

export default makeSelectSetZipPage;
export { selectSetZipPageDomain };
