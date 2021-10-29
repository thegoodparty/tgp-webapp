import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the candidatePortalUpdatesContainer state domain
 */

const selectCandidatePortalUpdatesContainerDomain = state =>
  state.candidatePortalUpdatesContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CandidatePortalUpdatesContainer
 */

const makeSelectCandidatePortalUpdatesContainer = () =>
  createSelector(
    selectCandidatePortalUpdatesContainerDomain,
    substate => substate,
  );

export default makeSelectCandidatePortalUpdatesContainer;
export { selectCandidatePortalUpdatesContainerDomain };
