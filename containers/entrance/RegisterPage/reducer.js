/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  score: false,
};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.VERIFY_RECAPTCHA:
        draft.score = false;
        break;
      case types.VERIFY_RECAPTCHA_SUCCESS:
        draft.score = action.score;
        break;
      case types.VERIFY_RECAPTCHA_ERROR:
        draft.score = 'bad';
        break;
    }
  });

export default registerPageReducer;
