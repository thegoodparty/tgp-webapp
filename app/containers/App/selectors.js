import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectGlobal = state => state.global;

const makeSelectContent = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.content,
  );

const makeSelectAppVersion = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.appVersion,
  );

export { makeSelectLocation, makeSelectContent, makeSelectAppVersion };
