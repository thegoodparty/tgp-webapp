import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pledgePage state domain
 */

const selectPledgePageDomain = state => state.pledgePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PledgePage
 */

const makeSelectPledgePage = () =>
  createSelector(selectPledgePageDomain, substate => substate);

export default makeSelectPledgePage;
export { selectPledgePageDomain };
