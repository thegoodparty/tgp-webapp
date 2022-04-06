/*
 *
 * AdminPage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  endorsements: [],
};

/* eslint-disable default-case, no-param-reassign */
const portalEndorsementsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_ENDORSEMENTS_SUCCESS:
        draft.endorsements = action.endorsements;
        break;
    }
  });

export default portalEndorsementsPageReducer;
