import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';
import { HYDRATE } from 'next-redux-wrapper';
import globalReducer from 'containers/App/reducer';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log('hydrate state', state);
    console.log('hydrate payload', action.payload);
    const nextState = {
      ...state, // use previous state
      ...action.payload.global, // apply delta from hydration
    };

    return nextState;
  }
  return globalReducer(state, action);
};

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: routerReducer,
    global: reducer,
    ...injectedReducers,
  });
  return rootReducer;
}
