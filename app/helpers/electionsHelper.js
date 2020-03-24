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
    totalThreshold: 50000000,
  },
  [CHAMBER_ENUM.SENATE]: {
    totalThreshold: 2000000,
  },
  [CHAMBER_ENUM.HOUSE]: {
    totalThreshold: 500000,
  },
};

export const presidentialThreshold =
  chamberThresholds[CHAMBER_ENUM.PRESIDENTIAL].totalThreshold;

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
  let incumbentRaised;
  if (chamber === CHAMBER_ENUM.PRESIDENTIAL) {
    incumbentRaised = presidentialThreshold;
  } else {
    incumbentRaised = findIncumbentRaised(candidates);
  }
  if (candidates) {
    candidates.forEach(candidate => {
      const isGood = isCandidateGood(
        candidate,
        filters,
        chamber,
        incumbentRaised,
      );

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

export const isCandidateGood = (
  candidate,
  filters,
  chamber,
  incumbentRaised,
) => {
  let isGood = false;
  let isNotGood = false;
  const {
    combinedRaised,
    smallContributions,
    raised,
    isApproved,
    isCertified,
  } = candidate;
  const totalRaised = combinedRaised || raised;
  const largeDonorPerc = (totalRaised - smallContributions) / totalRaised;

  if (isCertified) {
    return true;
  }

  if (totalRaised < incumbentRaised) {
    // small funding
    if (filters.smallFunding && isApproved) {
      return true;
    }
    return null;
  }
  // large funding
  if (largeDonorPerc <= 0.5 && filters.smallDonors) {
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

const calcHours = candidate => {
  const { isIncumbent, chamber, outsideReportDate, reportDate } = candidate;
  if (!isIncumbent) {
    return 1;
  }
  const date = reportDate || outsideReportDate;
  let dateInOffice = '01/20/2016';
  if (chamber === 'Senate') {
    dateInOffice = '01/03/2014';
  } else if (chamber === 'House') {
    dateInOffice = '01/03/2018';
  }
  const hoursPerMonth = 2000 / 12;
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
  const candidate = { ...orgCandidate };
  const { combinedRaised, raised, smallContributions } = candidate;
  const totalRaised = combinedRaised || raised;
  const largeDonorPerc = (totalRaised - smallContributions) / totalRaised;
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
  }
  return rank;
};

const findIncumbentRaised = candidates => {
  for (let i = 0; i < candidates.length; i++) {
    if (candidates[i].isIncumbent) {
      return candidates[i].raised * 0.5;
    }
  }
  return 1;
};
