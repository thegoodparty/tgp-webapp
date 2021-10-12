import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the imageUploadContainer state domain
 */

const selectImageUploadContainerDomain = state =>
  state.imageUploadContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ImageUploadContainer
 */

const makeSelectImageUploadContainer = () =>
  createSelector(
    selectImageUploadContainerDomain,
    substate => substate,
  );

export default makeSelectImageUploadContainer;
export { selectImageUploadContainerDomain };
