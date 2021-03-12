import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profileSettingsPage state domain
 */

const selectProfileSettingsPageDomain = state =>
  state.profileSettingsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProfileSettingsPage
 */

const makeSelectProfileSettingsPage = () =>
  createSelector(
    selectProfileSettingsPageDomain,
    substate => substate,
  );

export default makeSelectProfileSettingsPage;
export { selectProfileSettingsPageDomain };
