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
      name: 'Jaime Harrison',
      state: 'sc',
      district: null,
      party: 'D',
      likelyVoters: 806228,
      votesNeeded: 1166152,
      voterizeMargin: 359924,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/senate/jaime-harrison/161',
      image: 'https://assets.thegoodparty.org/candidates/jaime-harrison-161-j5woly.jpeg',
      smallFunding: 59,
      xTimes: 1,
    },
    {
      name: 'Alek Skarlatos',
      state: 'or',
      district: 4,
      party: 'R',
      likelyVoters: 160109,
      votesNeeded: 192506,
      voterizeMargin: 32971,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/alek-skarlatos/421',
      image: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alek_Skarlatos.jpg',
      smallFunding: 67,
      xTimes: 2,
    },
    {
      name: 'Lisa Savage',
      state: 'me',
      district: 4,
      party: 'I',
      likelyVoters: 8453,
      votesNeeded: 444301,
      voterizeMargin: null,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/senate/lisa-savage/859',
      image: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/lisasavage.jpg',
      smallFunding: 0.51,
      xTimes: 200,
    },
    {
      name: 'Donna Imam',
      state: 'tx',
      district: 31,
      party: 'D',
      likelyVoters: 115794,
      votesNeeded: 169105,
      voterizeMargin: 53311,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/donna-imam/86',
      image: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Donna_ImamTX.png',
      smallFunding: 16,
      xTimes: 6,
    },
    {
      name: 'Stephanie Bice',
      state: 'ok',
      district: 5,
      party: 'R',
      likelyVoters: 144746,
      votesNeeded: 149746,
      voterizeMargin: 5000,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/stephanie-bice/656',
      image: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Stephanie_Bice.jpg',
      smallFunding: 40,
      xTimes: 3,
    },
    {
      name: 'Pam Kieth',
      state: 'fl',
      district: 18,
      party: 'D',
      likelyVoters: 171633,
      votesNeeded: 198029,
      voterizeMargin: 26396,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/pam-keith/1132',
      image: 'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/PamKeith.jpg',
      smallFunding: 7,
      xTimes: 14,
    },
    {
      name: 'David Kim',
      state: 'ca',
      district: 34,
      party: 'D',
      likelyVoters: 23055,
      votesNeeded: 96341,
      voterizeMargin: 73286,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/david-kim/503',
      image: 'https://assets.thegoodparty.org/candidates/david-kim-503-g9nsur.jpeg',
      smallFunding: 7.8,
      xTimes: 13,
    },
    {
      name: 'Adam Christensen',
      state: 'fl',
      district: 3,
      party: 'D',
      likelyVoters: 137481,
      votesNeeded: 190658,
      voterizeMargin: 53177,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/adam-christensen/1239',
      smallFunding: 6.4,
      xTimes: 17,
      image: 'https://assets.thegoodparty.org/candidates/adam-christensen-1239-b8b9ep.jpeg'
    },
  ],
  loading: false,
  error: false
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
