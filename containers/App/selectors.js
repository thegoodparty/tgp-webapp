import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState?.location,
  );

const selectGlobal = state => state.global;

const makeSelectContent = () =>
  createSelector(
    selectGlobal,
    globalState => (globalState ? globalState.content : false),
  );

const makeSelectAppVersion = () =>
  createSelector(
    selectGlobal,
    globalState => (globalState ? globalState.appVersion : false),
  );

const makeSelectModalArticleId = () =>
  createSelector(
    selectGlobal,
    globalState => (globalState ? globalState.modalArticleId : false),
  );

export {
  makeSelectLocation,
  makeSelectContent,
  makeSelectAppVersion,
  makeSelectModalArticleId,
};
