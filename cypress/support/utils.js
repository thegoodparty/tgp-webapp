import {
  presidentialElectionLink,
  senateElectionLink,
  houseElectionLink,
} from '../../app/helpers/electionsHelper';
export { userDistrict } from '../../app/helpers/userHelper';
export const getElectionCount = (senateCandidates, houseCandidates) => {
  let electionCount = 3;
  if (
    senateCandidates?.good?.length < 2 &&
    senateCandidates.notGood.length === 0 &&
    senateCandidates.unknown.length === 0
  ) {
    electionCount--;
  }
  if (
    houseCandidates?.good?.length < 2 &&
    houseCandidates.notGood.length === 0 &&
    houseCandidates.unknown.length === 0
  ) {
    electionCount--;
  }
  return electionCount;
};

export const getCdsWithPerc = (approxPctArr, cds) => {
  const approxArr = approxPctArr ? JSON.parse(approxPctArr) : [];
  const cdWithPerc = [];
  approxArr.forEach(approxDist => {
    cds.forEach(cd => {
      if (approxDist.districtId === cd.id) {
        cdWithPerc.push({ ...cd, pct: approxDist.pct });
      }
    });
  });
  return cdWithPerc;
};

export const emptyCandidate = candidate => Object.keys(candidate).length === 0;

export const rankPageLink = (chamberName, state = null, district = null) => {
  if (chamberName === 'presidential') {
    return presidentialElectionLink();
  }
  if (chamberName === 'senate') {
    return senateElectionLink(state);
  }
  return houseElectionLink(state, district);
};

export const rankPageGrowLink = (candidate, chamberName) => {
  const { name, state, district, id } = candidate;
  const query = `?grow=${id}&name=${encodeURI(name)}`;
  if (chamberName === 'presidential') {
    return presidentialElectionLink() + query;
  }
  if (chamberName === 'senate') {
    return senateElectionLink(state) + query;
  }
  return houseElectionLink(state, district) + query;
};
export const rankPageJoinLink = (candidate, chamberName, user = null) => {
  const { name, state, district, id } = candidate;
  if (user) {
    const query = `?join=${id}&name=${encodeURI(name)}`;
    if (chamberName === 'presidential') {
      return presidentialElectionLink() + query;
    }
    if (chamberName === 'senate') {
      return senateElectionLink(state) + query;
    }
    return houseElectionLink(state, district) + query;
  }
  return '?register=true';
};

export const parseCookie = cookie => JSON.parse(decodeURIComponent(cookie));

export const getRankingObj = ranking => {
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
        blocName, // only valid for guest ranking. Used for the register banner
      } = userRank;
      rankingObj[chamber][candidate] = {
        id,
        rank,
        candidateId: candidate,
        isIncumbent,
        blocName,
      };
    });
  }
  return rankingObj;
};
