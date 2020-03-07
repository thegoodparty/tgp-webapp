// returns only articles that match the page.
export const partyResolver = partyLetter => {
  if (partyLetter === 'D') {
    return 'DEMOCRAT';
  }
  if (partyLetter === 'R') {
    return 'REPUBLICAN';
  }
  if (partyLetter === 'G') {
    return 'GREEN PARTY';
  }
  if (partyLetter === 'L') {
    return 'LIBERTARIAN';
  }
};

const slugify = text => {
  return text.replace(/[^\w ]+/g, '').replace(/ +/g, '-');
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
