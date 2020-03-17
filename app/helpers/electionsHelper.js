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
  return '';
};

export const presidentialCandidateRoute = candidate => {
  if (!candidate) {
    return '/';
  }
  return `/elections/presidential-candidate/${slugify(candidate.name)}/${
    candidate.id
  }`;
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
    totalThreshold: 10000000,
  },
  [CHAMBER_ENUM.SENATE]: {
    totalThreshold: 2000000,
  },
  [CHAMBER_ENUM.HOUSE]: {
    totalThreshold: 500000,
  },
};

export const defaultFilters = {
  smallDonors: true,
  smallFunding: true,
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
  candidates.forEach(candidate => {
    const isGood = isCandidateGood(candidate, filters, chamber);

    if (typeof isGood === 'undefined') {
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
  return {
    good,
    notGood,
    unknown,
  };
};

export const isCandidateGood = (candidate, filters, chamber) => {
  let isGood;
  const { combinedRaised, smallContributions } = candidate;
  const totalRaised = combinedRaised || 1;
  const largeDonorPerc = (totalRaised - smallContributions) / totalRaised;
  if (filters.smallFunding && largeDonorPerc && largeDonorPerc < 0.5) {
    isGood = true;
  } else if (
    filters.smallDonors &&
    totalRaised &&
    totalRaised < chamberThresholds[chamber].totalThreshold
  ) {
    isGood = true;
  } else if (
    filters.mostlyBigDonors &&
    largeDonorPerc &&
    largeDonorPerc >= 0.5
  ) {
    isGood = false;
  }
  return isGood;
};
