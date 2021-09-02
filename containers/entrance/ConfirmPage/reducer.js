/*
 *
 * ConfirmPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const confirmPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // case DEFAULT_ACTION:
      //   break;
    }
  });

export default confirmPageReducer;
