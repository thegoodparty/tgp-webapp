import { createStore, applyMiddleware } from 'redux';
import {
  createRouterMiddleware,
  initialRouterState,
} from 'connected-next-router';
import { createWrapper } from 'next-redux-wrapper';
import Router from 'next/router';
import createSagaMiddleware from 'redux-saga';
import { format } from 'url';

import globalSaga from '../containers/App/saga';
import createReducer from './rootReducer';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
};

export const configureStore = context => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware();
  const { asPath, pathname, query } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      router: initialRouterState(url, asPath),
    };
  }
  const store = createStore(
    createReducer(),
    initialState,
    bindMiddleware([sagaMiddleware, routerMiddleware]),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.global = sagaMiddleware.run(globalSaga);
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
};

export default createWrapper(configureStore);
