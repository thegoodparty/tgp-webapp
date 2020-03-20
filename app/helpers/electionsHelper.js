// returns only articles that match the page.
import { slugify } from './articlesHelper';

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
  if (partyLetter === 'LP') {
    return 'LIBERTARIAN';
  }
  if (partyLetter === 'I') {
    return 'INDEPENDENT';
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

export const CHAMBER_ENUM = {
  PRESIDENTIAL: 0,
  SENATE: 1,
  HOUSE: 2,
};

const chamberThresholds = {
  [CHAMBER_ENUM.PRESIDENTIAL]: {
    totalThreshold: 40000000,
  },
  [CHAMBER_ENUM.SENATE]: {
    totalThreshold: 2000000,
  },
  [CHAMBER_ENUM.HOUSE]: {
    totalThreshold: 250000,
  },
};

export const defaultFilters = {
  smallDonors: true,
  smallFunding: false,
  mostlyBigDonors: true,
};

export const filterCandidates = (
  candidates = [],
  filters = defaultFilters,
  chamber = CHAMBER_ENUM.PRESIDENTIAL,
) => {
  const good = [];
  const notGood = [];
  const unknown = [];
  if (candidates) {
    candidates.forEach(candidate => {
      const isGood = isCandidateGood(candidate, filters, chamber);

      if (isGood === null) {
        unknown.push({
          ...candidate,
          unknown: true,
        });
      } else if (isGood) {
        good.push({
          ...candidate,
          isGood,
        });
      } else {
        notGood.push({
          ...candidate,
          isGood,
        });
      }
    });
  }
  return {
    good,
    notGood,
    unknown,
  };
};

export const isCandidateGood = (candidate, filters, chamber) => {
  let isGood = false;
  let isNotGood = false;
  const { combinedRaised, smallContributions, raised } = candidate;
  const totalRaised = combinedRaised || raised;
  const largeDonorPerc = (totalRaised - smallContributions) / totalRaised;
  if (
    totalRaised < chamberThresholds[chamber].totalThreshold &&
    !filters.smallFunding
  ) {
    if (chamber === CHAMBER_ENUM.PRESIDENTIAL) {
      return true;
    }
    return null;
  }
  if (
    totalRaised < chamberThresholds[chamber].totalThreshold &&
    filters.smallFunding
  ) {
    isGood = true;
  } else if (largeDonorPerc <= 0.5 && filters.smallDonors) {
    isGood = true;
  } else if (filters.mostlyBigDonors && largeDonorPerc > 0.5) {
    isNotGood = true;
  }

  if (isGood) {
    return true;
  }
  if (isNotGood) {
    return false;
  }
  return null;
};

export const candidateCalculatedFields = orgCandidate => {
  const candidate = { ...orgCandidate };
  const { combinedRaised, raised, smallContributions } = candidate;
  const totalRaised = combinedRaised || raised;
  const largeDonorPerc = (totalRaised - smallContributions) / totalRaised;
  const smallDonorPerc = 1 - largeDonorPerc;
  const hours = 10000;
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
  }
  return rank;
};

export const isSmallCandidate = (totalRaised, chamber) => {
  let threshold = chamberThresholds[CHAMBER_ENUM.PRESIDENTIAL].totalThreshold;
  if (chamber === 'presidential') {
    threshold = chamberThresholds[CHAMBER_ENUM.PRESIDENTIAL].totalThreshold;
  }
  if (chamber === 'senate') {
    threshold = chamberThresholds[CHAMBER_ENUM.SENATE].totalThreshold;
  }
  if (chamber === 'house') {
    threshold = chamberThresholds[CHAMBER_ENUM.HOUSE].totalThreshold;
  }

  return totalRaised < threshold;
};
