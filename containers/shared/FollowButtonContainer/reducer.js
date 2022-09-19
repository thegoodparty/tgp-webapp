/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  supports: false,
};

/* eslint-disable default-case, no-param-reassign */
const followButtonContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.LOAD_USER_FOLLOWS_SUCCESS:
        draft.supports = action.supports;
        break;
    }
  });

export default followButtonContainerReducer;
