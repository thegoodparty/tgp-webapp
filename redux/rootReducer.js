import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import { HYDRATE } from 'next-redux-wrapper';

const combinedReducer = combineReducers({});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  }
  return combinedReducer(state, action);
};

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: routerReducer,
    root: reducer,
    ...injectedReducers,
  });

  return rootReducer;
}
