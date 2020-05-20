import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectUserDomain = state => state.user || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate,
  );

const makeSelectToken = () =>
  createSelector(
    selectUserDomain,
    substate => substate.token,
  );

const makeSelectUserObj = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user,
  );

const makeSelectRanking = () =>
  createSelector(
    selectUserDomain,
    substate => {
      const { ranking } = substate;
      const rankingObj = {
        presidential: {},
        senate: {},
        house: {},
      };
      if (ranking) {
        ranking.forEach(userRank => {
          const {
            id,
            rank,
            candidate,
            isIncumbent,
            chamber,
            candName, // only valid for guest ranking. Used for the register banner
          } = userRank;
          rankingObj[chamber][candidate] = {
            id,
            rank,
            candidateId: candidate,
            isIncumbent,
            candName,
          };
        });
      }
      console.log('in selector', rankingObj);

      return rankingObj;
    },
  );

export default makeSelectUser;
export {
  selectUserDomain,
  makeSelectToken,
  makeSelectUserObj,
  makeSelectRanking,
};
