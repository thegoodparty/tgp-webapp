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
      incumbentRaised: 31863000,
      likelyVoters: 806228,
      name: 'Jaime Harrison',
      party: 'D',
      raised: 28641500,
      state: 'sc',
      votesNeeded: 1166151,
      chamber: 'Senate',
    },
    {
      id: 421,
      district: 4,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alek_Skarlatos.jpg',
      incumbentRaised: 2190660,
      likelyVoters: 160109,
      name: 'Alek Skarlatos',
      party: 'R',
      raised: 1299850,
      state: 'or',
      votesNeeded: 192506,
      chamber: 'House',
    },
    {
      id: 859,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/lisasavage.jpg',
      incumbentRaised: 18097100,
      likelyVoters: 113131,
      name: 'Lisa Savage',
      party: 'I',
      raised: 92228,
      state: 'me',
      votesNeeded: 444301,
      chamber: 'Senate',
    },
    {
      id: 86,
      district: 31,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Donna_ImamTX.png',
      incumbentRaised: 1602200,
      likelyVoters: 115794,
      name: 'Donna Imam',
      party: 'D',
      raised: 249274,
      state: 'tx',
      votesNeeded: 169105,
      chamber: 'House',
    },
    {
      id: 656,
      district: 5,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Stephanie_Bice.jpg',
      incumbentRaised: 3656100,
      likelyVoters: 144747,
      name: 'Stephanie Bice',
      party: 'R',
      raised: 1454920,
      state: 'ok',
      votesNeeded: 149746,
      chamber: 'House',
    },
    {
      id: 1132,
      district: 18,
      image:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/PamKeith.jpg',
      incumbentRaised: 4011770,
      likelyVoters: 171633,
      name: 'Pam Keith',
      party: 'D',
      raised: 282265,
      state: 'fl',
      votesNeeded: 198029,
      chamber: 'House',
    },
    {
      id: 503,
      district: 34,
      image:
        'https://assets.thegoodparty.org/candidates/david-kim-503-g9nsur.jpeg',
      incumbentRaised: 1009520,
      likelyVoters: 23055,
      name: 'David Kim',
      party: 'D',
      raised: 79188,
      state: 'ca',
      votesNeeded: 96341,
      chamber: 'House',
    },
    {
      id: 1239,
      district: 3,
      image:
        'https://assets.thegoodparty.org/candidates/adam-christensen-1239-b8b9ep.jpeg',
      incumbentRaised: 488515,
      likelyVoters: 137481,
      name: 'Adam Christensen',
      party: 'D',
      raised: 31241,
      state: 'fl',
      votesNeeded: 190658,
      chamber: 'House',
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
