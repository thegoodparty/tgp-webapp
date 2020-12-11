import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the zipFinderPage state domain
 */

const selectZipFinderPageDomain = state => state.zipFinderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ZipFinderPage
 */

const makeSelectZipFinderPage = () =>
  createSelector(
    selectZipFinderPageDomain,
    substate => substate,
  );

export default makeSelectZipFinderPage;
export { selectZipFinderPageDomain };
