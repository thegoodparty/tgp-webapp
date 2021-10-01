import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the endorsementConfirmationPage state domain
 */

const selectEndorsementConfirmationPageDomain = state =>
  state.endorsementConfirmationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EndorsementConfirmationPage
 */

const makeSelectEndorsementConfirmationPage = () =>
  createSelector(
    selectEndorsementConfirmationPageDomain,
    substate => substate,
  );

export default makeSelectEndorsementConfirmationPage;
export { selectEndorsementConfirmationPageDomain };
