/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import types from './constants';

export const initialState = {
  goodChallengers: [
    {
      id: 161,
      image:
        'https://assets.thegoodparty.org/candidates/jaime-harrison-161-j5woly.jpeg',
      incumbentRaised: 59944300,
      likelyVoters: 806228,
      name: 'Jaime Harrison',
      party: 'D',
      raised: 85832100,
      state: 'sc',
      votesNeeded: 1166151,
      chamber: 'Senate',
      smallContributions: 45659600,
    },
    {
      id: 421,
      district: 4,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alek_Skarlatos.jpg',
      incumbentRaised: 3558700,
      likelyVoters: 160109,
      name: 'Alek Skarlatos',
      party: 'R',
      raised: 3916530,
      state: 'or',
      votesNeeded: 192506,
      chamber: 'House',
      smallContributions: 2611080,
    },
    {
      id: 859,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/lisasavage.jpg',
      incumbentRaised: 26056000,
      likelyVoters: 190254,
      name: 'Lisa Savage',
      party: 'I',
      raised: 174709,
      state: 'me',
      votesNeeded: 444301,
      chamber: 'Senate',
      smallContributions: 53762,
    },
    {
      id: 86,
      district: 31,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Donna_ImamTX.png',
      incumbentRaised: 2003950,
      likelyVoters: 115794,
      name: 'Donna Imam',
      party: 'D',
      raised: 800751,
      state: 'tx',
      votesNeeded: 169105,
      chamber: 'House',
      smallContributions: 304771,
    },
    {
      id: 1343,
      image:
        'https://assets.thegoodparty.org/candidates/ricky-dale-harrington-jr-1343-bzwims.jpeg',
      incumbentRaised: 14464500,
      likelyVoters: 207076,
      name: 'Ricky Dale Harrington Jr',
      party: 'L',
      raised: 40018,
      state: 'ar',
      votesNeeded: 804679,
      chamber: 'Senate',
      smallContributions: 21643,
    },
    {
      id: 1132,
      district: 18,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/PamKeith.jpg',
      incumbentRaised: 5245740,
      likelyVoters: 171633,
      name: 'Pam Keith',
      party: 'D',
      raised: 1095960,
      state: 'fl',
      votesNeeded: 198029,
      chamber: 'House',
      smallContributions: 304731,
    },
    {
      id: 503,
      district: 34,
      image:
        'https://assets.thegoodparty.org/candidates/david-kim-503-g9nsur.jpeg',
      incumbentRaised: 1265370,
      likelyVoters: 23055,
      name: 'David Kim',
      party: 'D',
      raised: 163293,
      state: 'ca',
      votesNeeded: 96341,
      chamber: 'House',
      smallContributions: 54612,
    },
    {
      id: 1239,
      district: 3,
      image:
        'https://assets.thegoodparty.org/candidates/adam-christensen-1239-b8b9ep.jpeg',
      incumbentRaised: 843431,
      likelyVoters: 137481,
      name: 'Adam Christensen',
      party: 'D',
      raised: 146720,
      state: 'fl',
      votesNeeded: 190658,
      chamber: 'House',
      smallContributions: 90231,
    },
  ],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CHALLENGERS_SUCCESS:
        draft.goodChallengers = action.challengers;
        draft.loading = false;
        draft.error = false;
        break;
      case types.LOAD_CHALLENGERS_ERROR:
        draft.goodChallengers = false;
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default homePageReducer;
