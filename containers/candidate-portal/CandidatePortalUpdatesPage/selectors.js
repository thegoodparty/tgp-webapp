import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidatePortalUpdatesPage state domain
 */

const selectCandidatePortalUpdatesPageDomain = state =>
  state.candidatePortalUpdatesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePortalUpdatesPage
 */

const makeSelectCandidatePortalUpdatesPage = () =>
  createSelector(
    selectCandidatePortalUpdatesPageDomain,
    substate => substate,
  );

export default makeSelectCandidatePortalUpdatesPage;
export { selectCandidatePortalUpdatesPageDomain };
