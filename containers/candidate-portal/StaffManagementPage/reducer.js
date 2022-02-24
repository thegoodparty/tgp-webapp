/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  loading: false,
  staff: false,
  staffInvitations: false,
};

/* eslint-disable default-case, no-param-reassign */
const staffManagementPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_STAFF:
        draft.loading = true;
        break;
      case types.LOAD_STAFF_SUCCESS:
        draft.loading = false;
        draft.staff = action.staff;
        draft.staffInvitations = action.staffInvitations;
        break;
    }
  });

export default staffManagementPageReducer;
