import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the creatorsPage state domain
 */

const selectCreatorsPageDomain = state => state.creatorsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreatorsPage
 */

const makeSelectCreatorsPage = () =>
  createSelector(
    selectCreatorsPageDomain,
    substate => substate,
  );

export default makeSelectCreatorsPage;
export { selectCreatorsPageDomain };
