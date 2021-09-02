import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the portalEmbedButtonPage state domain
 */

const selectPortalEmbedButtonPageDomain = state =>
  state.portalEmbedButtonPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PortalEmbedButtonPage
 */

const makeSelectPortalEmbedButtonPage = () =>
  createSelector(
    selectPortalEmbedButtonPageDomain,
    substate => substate,
  );

export default makeSelectPortalEmbedButtonPage;
export { selectPortalEmbedButtonPageDomain };
