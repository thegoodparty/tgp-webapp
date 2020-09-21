/*
 *
 * CreatorsPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  goodChallengers: [
    {
      name: 'Jaime Harrison',
      state: 'SC',
      district: null,
      party: 'Democrat',
      likelyVoters: 806228,
      votesNeeded: 1166152,
      voterizeMargin: 359924,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/senate/jaime-harrison/161',
      avatar:
        'https://assets.thegoodparty.org/candidates/jaime-harrison-161-j5woly.jpeg',
      funding: 59,
      disadvantage: 1,
      chamber: 'senate',
    },
    {
      name: 'Alek Skarlatos',
      state: 'OR',
      district: 4,
      party: 'Republican',
      likelyVoters: 160109,
      votesNeeded: 192506,
      voterizeMargin: 32971,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/alek-skarlatos/421',
      avatar:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Alek_Skarlatos.jpg',
      funding: 67,
      disadvantage: 2,
      chamber: 'house',
    },
    {
      name: 'Lisa Savage',
      state: 'ME',
      district: 4,
      party: 'Independent',
      likelyVoters: 8453,
      votesNeeded: 444301,
      voterizeMargin: null,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/senate/lisa-savage/859',
      avatar:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/lisasavage.jpg',
      funding: 0.51,
      disadvantage: 200,
      chamber: 'senate',
    },
    {
      name: 'Donna Imam',
      state: 'TX',
      district: 31,
      party: 'Democrat',
      likelyVoters: 115794,
      votesNeeded: 169105,
      voterizeMargin: 53311,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/donna-imam/86',
      avatar:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Donna_ImamTX.png',
      funding: 16,
      disadvantage: 6,
      chamber: 'house',
    },
    {
      name: 'Stephanie Bice',
      state: 'OK',
      district: 5,
      party: 'Republican',
      likelyVoters: 144746,
      votesNeeded: 149746,
      voterizeMargin: 5000,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/stephanie-bice/656',
      avatar:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Stephanie_Bice.jpg',
      funding: 40,
      disadvantage: 3,
      chamber: 'house',
    },
    {
      name: 'Pam Kieth',
      state: 'FL',
      district: 18,
      party: 'Democrat',
      likelyVoters: 171633,
      votesNeeded: 198029,
      voterizeMargin: 26396,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/pam-keith/1132',
      avatar:
        'https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/PamKeith.jpg',
      funding: 7,
      disadvantage: 14,
      chamber: 'house',
    },
    {
      name: 'David Kim',
      state: 'CA',
      district: 34,
      party: 'Democrat',
      likelyVoters: 23055,
      votesNeeded: 96341,
      voterizeMargin: 73286,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/david-kim/503',
      avatar:
        'https://assets.thegoodparty.org/candidates/david-kim-503-g9nsur.jpeg',
      funding: 7.8,
      disadvantage: 13,
      chamber: 'house',
    },
    {
      name: 'Adam Christensen',
      state: 'FL',
      district: 3,
      party: 'Democrat',
      likelyVoters: 137481,
      votesNeeded: 190658,
      voterizeMargin: 53177,
      tgpLink:
        'https://thegoodparty.org/elections/candidate/house/adam-christensen/1239',
      funding: 6.4,
      disadvantage: 17,
      avatar:
        'https://assets.thegoodparty.org/candidates/adam-christensen-1239-b8b9ep.jpeg',
      chamber: 'house',
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default homePageReducer;
