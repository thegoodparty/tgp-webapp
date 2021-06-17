import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminCandidateStageSettingsPage state domain
 */

const selectAdminCandidateStageSettingsPageDomain = state =>
  state.adminCandidateStageSettingsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminCandidateStageSettingsPage
 */

const makeSelectAdminCandidateStageSettingsPage = () =>
  createSelector(
    selectAdminCandidateStageSettingsPageDomain,
    substate => substate,
  );

export default makeSelectAdminCandidateStageSettingsPage;
export { selectAdminCandidateStageSettingsPageDomain };
