// returns only articles that match the page.
import { slugify } from './articlesHelper';
import { getCookie } from './cookieHelper';

export const partyResolver = partyLetter => {
  if (partyLetter === 'D') {
    return 'DEMOCRAT';
  }
  if (partyLetter === 'R') {
    return 'REPUBLICAN';
  }
  if (partyLetter === 'GP') {
    return 'GREEN PARTY';
  }
  if (partyLetter === 'LP' || partyLetter === 'L') {
    return 'LIBERTARIAN';
  }
  if (partyLetter === 'I') {
    return 'INDEPENDENT';
  }
  if (partyLetter === 'W') {
    return 'AS A WRITE-IN';
  }
  if (partyLetter === 'VC') {
    return 'VETTING CHALLENGERS';
  }
  if (partyLetter === 'U') {
    return 'UNITY';
  }
  if (partyLetter === 'UUP') {
    return 'UNITED UTAH PARTY';
  }
  return '';
};

export const candidateRoute = candidate => {
  if (!candidate) {
    return '/';
  }
  const { isIncumbent, chamber } = candidate;
  const chamberLower = chamber ? chamber.toLowerCase() : 'presidential';
  const name = slugify(candidate.name);
  return `/elections/candidate/${chamberLower}${
    isIncumbent ? '-i' : ''
  }/${name}/${candidate.id}`;
};

export const rankText = number => {
  if (number === 1) return 'FIRST';
  if (number === 2) return 'SECOND';
  if (number === 3) return 'THIRD';
  // after 3 return num representation
  const j = number % 10,
    k = number % 100;
  if (j === 1 && k !== 11) {
    return number + 'ST';
  }
  if (j === 2 && k !== 12) {
    return number + 'ND';
  }
  if (j === 3 && k !== 13) {
    return number + 'RD';
  }
  return number + 'TH';
};

const hoursPerMonth = 2000 / 12;

const calcHours = candidate => {
  const { isIncumbent, chamber, outsideReportDate, reportDate } = candidate;
  // presidential has chamber undeifned
  // if (!isIncumbent && typeof chamber !== 'undefined') {
  //   return 1;
  // }
  const date = reportDate || outsideReportDate || '02/12/2020';
  let dateInOffice = '01/20/2016';
  if (chamber === 'Senate') {
    dateInOffice = '01/03/2014';
  } else if (chamber === 'House') {
    dateInOffice = '01/03/2018';
  }
  const months = monthsDiff(dateInOffice, date);
  return months * hoursPerMonth;
};

function yearsDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date2.getFullYear() - date1.getFullYear();
}

function monthsDiff(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const years = yearsDiff(d1, d2);
  return years * 12 + (date2.getMonth() - date1.getMonth());
}

export const candidateCalculatedFields = orgCandidate => {
  if (!orgCandidate) {
    return {};
  }
  const candidate = { ...orgCandidate };
  const { combinedRaised, raised, smallContributions } = candidate;
  const totalRaised = combinedRaised || raised;
  const largeDonorPerc =
    totalRaised === 0 ? 0 : (totalRaised - smallContributions) / totalRaised;
  const smallDonorPerc = 1 - largeDonorPerc;
  const hours = calcHours(candidate);
  const largeDonorPerHour = (totalRaised * largeDonorPerc) / hours;
  const smallDonorPerHour = (totalRaised * smallDonorPerc) / hours;

  candidate.totalRaised = totalRaised;
  candidate.largeDonorPerc = largeDonorPerc;
  candidate.largeDonorPerHour = largeDonorPerHour;
  candidate.smallDonorPerc = smallDonorPerc;
  candidate.smallDonorPerHour = smallDonorPerHour;

  return candidate;
};

export const getRankFromUserOrState = (user, candidateState, rankType) => {
  let rank;
  if (user && user[rankType]) {
    if (typeof user[rankType] === 'string') {
      rank = JSON.parse(user[rankType]);
    }
  } else if (candidateState && candidateState[rankType]) {
    rank = candidateState[rankType];
  } else {
    const cookie = getCookie(rankType);
    if (cookie) {
      rank = JSON.parse(cookie);
    }
  }
  return rank;
};

export const shortToLongState = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

export const mapCandidateToHash = candidates => {
  const candHash = {};
  if (candidates && candidates.good) {
    candidates.good.forEach(cand => {
      candHash[cand.id] = { ...cand, isGood: true };
    });
    candidates.unknown.forEach(cand => {
      candHash[cand.id] = { ...cand, isGood: null };
    });
    candidates.notGood.forEach(cand => {
      candHash[cand.id] = { ...cand, isGood: false };
    });
  }

  return candHash;
};

export const presidentialElectionLink = () => {
  return '/elections/presidential';
};

export const senateElectionLink = state => {
  if (!state) {
    return '';
  }
  return `/elections/senate/${state.toLowerCase()}`;
};

export const houseElectionLink = (state, district) => {
  if (!state || !district) {
    return '';
  }
  return `/elections/house/${state.toLowerCase()}/${district}`;
};

export const isDistrictInCds = (districtNumber, cds) => {
  if (!districtNumber || !cds) {
    return false;
  }
  for (let i = 0; i < cds.length; i++) {
    if (parseInt(districtNumber, 10) === parseInt(cds[i].code, 10)) {
      return true;
    }
  }
  return false;
};

export const candidateFirstName = candidate => {
  if (!candidate) {
    return '';
  }
  const nameArr = candidate.name ? candidate.name.split(' ') : [];
  return candidate.name ? nameArr[0] : '';
};

export const candidateLastName = candidate => {
  if (!candidate) {
    return '';
  }
  const nameArr = candidate.name ? candidate.name.split(' ') : [];

  return candidate.name ? nameArr[nameArr.length - 1] : '';
};

export const candidateBlocName = candidate => {
  if (!candidate) {
    return '';
  }
  if (candidate.twitter) {
    return `@${candidate.twitter
      .replace('https://www.twitter.com/', '')
      .replace('https://twitter.com/', '')}`;
  }
  if (candidate.blocName) {
    return `#${candidate.blocName}`;
  }
  if (candidate.id < 0) {
    return '#GoodBloc';
  }
  const lastName = candidateLastName(candidate);
  return `#${lastName}Bloc`;
};

export const blocNameSuffix = blocName => {
  if (blocName?.charAt(0) === '@') {
    return 'Bloc';
  }
  return '';
};

export const candidateBlocLink = (candidate, chamber) => {
  if (!candidate) {
    return '';
  }
  const { state, district } = candidate;

  if (candidate.id < 0) {
    return `GoodBloc-${candidate.state}${
      chamber === 'house' ? candidate.id * -1 : ''
    }`;
  }

  const blocName = candidateBlocName(candidate).replace('#', '');

  if (chamber === 'presidential') {
    return blocName;
  }
  if (chamber === 'senate') {
    return `${blocName}-${state.toUpperCase()}`;
  }

  return `${blocName}-${state.toUpperCase()}${district}`;
};

export const candidateRanking = (ranking, candidate) => {
  const rankObj = candidateRankObj(ranking, candidate);
  return rankObj ? rankObj.rank : false;
};

export const candidateRankObj = (ranking, candidate) => {
  if (!ranking || !candidate) {
    return false;
  }

  if (
    ranking[candidate.id] &&
    ranking[candidate.id].isIncumbent === !!candidate.isIncumbent
  ) {
    return ranking[candidate.id];
  }
  return false;
};

export const findBlocCandidate = (candidates, blocCandidate) => {
  if (!candidates || !blocCandidate) {
    return null;
  }
  for (let i = 0; i < candidates.good.length; i++) {
    const candidate = candidates.good[i];
    if (
      candidate.id === blocCandidate.id &&
      candidate.name === candidate.name
    ) {
      return candidate;
    }
  }
  for (let i = 0; i < candidates.unknown.length; i++) {
    const candidate = candidates.unknown[i];
    if (
      candidate.id === blocCandidate.id &&
      candidate.name === candidate.name
    ) {
      return candidate;
    }
  }
  return null;
};

export const generateEmptyBlocCandidate = (districtNumber, chamber, state) => {
  return {
    id: districtNumber ? districtNumber * -1 : -1,
    isGood: true,
    name: 'Somebody Good',
    party: 'VC',
    chamber,
    state,
    image: 'https://assets.thegoodparty.org/gray-heart.png',
  };
};

export const isEmptyCandidates = candidates => {
  return (
    candidates?.good?.length === 0 &&
    candidates.notGood?.length === 0 &&
    candidates.unknown?.length === 0
  );
};

export const getElectionLink = zip => {
  let electionLink;
  if (zip) {
    electionLink = `/elections/district/${zip}`;
  } else {
    electionLink = `/intro/zip-finder`;
  }
  return electionLink;
}

export const rankPageGrowLink = (candidate, chamberName, state, district) => {
  if (!candidate) {
    return '';
  }
  const query = `?grow=${candidate.id}&name=${encodeURI(candidate.name)}`;
  if (chamberName === 'presidential') {
    return presidentialElectionLink() + query;
  }
  if (chamberName === 'senate') {
    return senateElectionLink(state) + query;
  }
  return houseElectionLink(state, district) + query;
};

export const rankPageLink = (chamberName, state, district) => {
  if (chamberName === 'presidential') {
    return presidentialElectionLink();
  }
  if (chamberName === 'senate') {
    return senateElectionLink(state);
  }
  return houseElectionLink(state, district);
};

export const rankPageJoinLink = (user, candidate, chamberName, state, district) => {
  if (user) {
    const query = `?join=${candidate.id}&name=${encodeURI(candidate.name)}`;
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

export const electionRoute = (user, zipCode = null) => {
  let zip;
  if (user?.zipCode) {
    zip = user.zipCode.zip;
  } else if (zipCode) {
    zip = zipCode.zip;
  } else {
    let cookieZip = getCookie('zip');
    if (cookieZip) {
      cookieZip = JSON.parse(cookieZip);
      zip = cookieZip.zip;
    }
  }
  if (zip) {
    return `/elections/district/${zip}`;
  }
  return '/intro/zip-finder';
};
