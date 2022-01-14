import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the issuePositionsPickerContainer state domain
 */

const selectIssuePositionsPickerContainerDomain = state =>
  state.issuePositionsPickerContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IssuePositionsPickerContainer
 */

const makeSelectIssuePositionsPickerContainer = () =>
  createSelector(
    selectIssuePositionsPickerContainerDomain,
    substate => substate,
  );

export default makeSelectIssuePositionsPickerContainer;
export { selectIssuePositionsPickerContainerDomain };
