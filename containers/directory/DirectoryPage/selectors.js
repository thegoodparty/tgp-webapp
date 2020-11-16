import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directoryPage state domain
 */

const selectDirectoryPageDomain = state => state.directoryPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DirectoryPage
 */

const makeSelectDirectoryPage = () =>
  createSelector(
    selectDirectoryPageDomain,
    substate => substate,
  );

export default makeSelectDirectoryPage;
export { selectDirectoryPageDomain };
