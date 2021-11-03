import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedbackContainer state domain
 */

const selectFeedbackContainerDomain = state =>
  state.feedbackContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FeedbackContainer
 */

const makeSelectFeedbackContainer = () =>
  createSelector(
    selectFeedbackContainerDomain,
    substate => substate,
  );

export default makeSelectFeedbackContainer;
export { selectFeedbackContainerDomain };
