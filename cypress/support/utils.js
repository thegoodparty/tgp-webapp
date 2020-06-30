export const articlesHelper = (articles, page) =>
  articles.filter(article => {
    let showArticle = false;
    if (!article.pages) {
      return false;
    }
    article.pages.forEach(cmsPage => {
      if (cmsPage === page) {
        showArticle = true;
        return true;
      }
    });
    return showArticle;
  });

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

export const presidentialElectionLink = () => '/elections/presidential';

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
  return '';
};

export const numberFormatter = num => {
  if (!num) return num;
  if (typeof num !== 'number') {
    num = parseFloat(num);
  }
  return `${num
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c,
    )}`;
};

export const isEmptyCandidates = candidates =>
  candidates?.good?.length === 0 &&
  candidates.notGood?.length === 0 &&
  candidates.unknown?.length === 0;
