import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the staffManagementPage state domain
 */

const selectStaffManagementPageDomain = state => state.staffManagementPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StaffManagementPage
 */

const makeSelectStaffManagementPage = () =>
  createSelector(selectStaffManagementPageDomain, substate => substate);

export default makeSelectStaffManagementPage;
export { selectStaffManagementPageDomain };
