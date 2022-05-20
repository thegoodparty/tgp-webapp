/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  isOpen: false,
};

/* eslint-disable default-case, no-param-reassign */
const feedbackContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.TOGGLE_MODAL:
        draft.isOpen = action.isOpen;
        break;
    }
  });

export default feedbackContainerReducer;
