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
