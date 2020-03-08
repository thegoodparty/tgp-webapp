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

export { makeSelectLocation, makeSelectContent };
