import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manifestoPage state domain
 */

const selectManifestoPageDomain = state => state.manifestoPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManifestoPage
 */

const makeSelectManifestoPage = () =>
  createSelector(selectManifestoPageDomain, substate => substate);

export default makeSelectManifestoPage;
export { selectManifestoPageDomain };
