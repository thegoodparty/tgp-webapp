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
      district: 2,
      image: "https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/jaimeharrison.jpg",
      incumbentRaised: 1010460,
      likelyVoters: 806228,
      name: "Jaime Harrison",
      party: "D",
      raised: 28641500,
      state: "sc",
      votesNeeded: 1166151
    },
    {
      district: 5,
      image: "https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Stephanie_Bice.jpg",
      incumbentRaised: 3656100,
      likelyVoters: 144746,
      name: "Stephanie Bice",
      party: "R",
      raised: 1454920,
      state: "ok",
      votesNeeded: 149746,
    },
    {
      district: 4,
      image: "https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alek_Skarlatos.jpg",
      incumbentRaised: 2190660,
      likelyVoters: 160109,
      name: "Alek Skarlatos",
      party: "R",
      raised: 1299850,
      state: "or",
      votesNeeded: 192506,
    },
    {
      district: 31,
      image: "https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Donna_ImamTX.png",
      incumbentRaised: 1602200,
      likelyVoters: 115794,
      name: "Donna Imam",
      party: "D",
      raised: 249274,
      state: "tx",
      votesNeeded: 169105
    },
    {
      district: 34,
      image: "",
      incumbentRaised: 1009520,
      likelyVoters: 23055,
      name: "David Kim",
      party: "D",
      raised: 79188,
      state: "ca",
      votesNeeded: 96341,
    },
    {
      district: 2,
      image: "https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/lisasavage.jpg",
      incumbentRaised: 2787080,
      likelyVoters: 113131,
      name: "Lisa Savage",
      party: "I",
      raised: 92228,
      state: "me",
      votesNeeded: 444301,
    }
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
