import React from 'react';
import { toPrecision } from './numberHelper';
import { partyResolver, shortToLongState } from './electionsHelper';
export const getVotesNeededState = (chamberName, district, state) => {
  let votesNeededState;
  if (chamberName === 'presidential') {
    votesNeededState = '';
  } else if (chamberName === 'senate') {
    votesNeededState = state || '';
  } else {
    votesNeededState = `${state}-${district}`;
  }
  return votesNeededState;
};

export const convertURI = (url) => {
  let converted;
  try {
    converted = url ? decodeURI(url) : null;
  } catch (e) {
    converted = url;
    // console.log(e);
  }
  return converted;
};

export const getComparedIncumbent = (totalRaised, incumbent) => {
  const raised = incumbent.raised || incumbent.combinedRaised;
  let bigFundsPerc = (raised - incumbent.smallContributions) / raised;
  bigFundsPerc = toPrecision(bigFundsPerc);
  const comparedIncumbent = {
    name: incumbent.name,
    raised,
    bigFundsPerc,
    isFakeIncumbent: incumbent.isFakeIncumbent,
  };
  comparedIncumbent.xTimes = (raised / totalRaised).toFixed(2);
  comparedIncumbent.relativePerc = ((totalRaised * 100) / raised).toFixed(2);

  comparedIncumbent.xTimes = toPrecision(raised / totalRaised);
  comparedIncumbent.relativePerc = toPrecision((totalRaised * 100) / raised);
  comparedIncumbent.bigMoneyFunds = raised * bigFundsPerc;
  return comparedIncumbent;
};

export const getFakeIncumbentOrIncumbentLabel = (isFakeIncumbent) =>
  isFakeIncumbent ? 'top funded candidate' : 'incumbent';

export const getCombinedReportDate = (
  { reportDate, outsideReportDate },
  incumbent,
) =>
  reportDate ||
  outsideReportDate ||
  (incumbent && incumbent.reportDate) ||
  '02/12/2020';

export const getOpenSecretLink = (chamber, candidate) => {
  const { openSecretsId, uuid, isIncumbent } = candidate;
  let openSecretLink = 'https://www.opensecrets.org/';
  if (chamber === 'presidential') {
    openSecretLink += `2020-presidential-race/candidate?id=${openSecretsId}`;
  } else if (isIncumbent) {
    openSecretLink += `members-of-congress/summary?cycle=2020&type=C&cid=${openSecretsId}`;
  } else if (uuid) {
    const stateDistrict = uuid.split('_')[1];
    openSecretLink += `races/candidates?cycle=2020&id=${stateDistrict}&spec=N`;
  }
  return openSecretLink;
};

export const countCandidates = (chamber) => {
  let count = 0;
  if (chamber && typeof chamber.good !== 'undefined') {
    count =
      chamber.good.length + chamber.notGood.length + chamber.unknown.length;
  }
  return count;
};

export const getCandidateTitle = (chamber) => {
  if (!chamber) {
    return '';
  }
  let chamberTitle = 'President';
  if (chamber.toLowerCase() === 'senate') {
    chamberTitle = 'the U.S. Senate';
  } else if (chamber.toLowerCase() === 'house') {
    chamberTitle = 'the U.S. House of Representatives';
  }
  return chamberTitle;
};

export const getCandidateChamberDistrict = (candidate) => {
  const { chamber } = candidate;
  let chamberTitle = 'President';
  if (chamber?.toLowerCase() === 'senate') {
    chamberTitle = `${candidate.state.toUpperCase()} Senate`;
  } else if (chamber?.toLowerCase() === 'house') {
    chamberTitle = `${candidate.state.toUpperCase()}-${
      candidate.district
    } House`;
  }
  return chamberTitle;
};

export const getCandidateChamberDistrictOnly = (candidate) => {
  if (!candidate) {
    return '';
  }
  const { chamber } = candidate;
  let chamberTitle = 'US';
  if (chamber?.toLowerCase() === 'senate') {
    chamberTitle = `${candidate.state.toUpperCase()}`;
  } else if (chamber?.toLowerCase() === 'house') {
    chamberTitle = `${candidate.state.toUpperCase()}-${candidate.district}`;
  }
  return chamberTitle;
};

export const getPartyImage = (partyBadge, party, hideBadge) => {
  let PartyImg;
  if (partyBadge) {
    PartyImg = '/images/icons/certification-badge.svg';
  } else if (party === 'D') {
    PartyImg = '/images/icons/democrat.png';
  } else if (party === 'R') {
    PartyImg = '/images/icons/republican.png';
  } else if (party === 'I') {
    PartyImg = '/images/icons/certification-badge.svg';
  } else if (party === 'L') {
    PartyImg = '/images/icons/libertarian.png';
  } else if (party === 'LI') {
    PartyImg = '/images/icons/liberation.png';
  } else if (party === 'P') {
    PartyImg = '/images/icons/progressive.png';
  } else if (party === 'G' || party === 'GP') {
    PartyImg = '/images/icons/green-party.png';
  }
  if (hideBadge) {
    PartyImg = false;
  }
  return PartyImg;
};

export const partyRace = (candidate, withLineBreak = true) => {
  const {
    party,
    otherParty,
    race,
    office,
    state,
    district,
    counties,
    didWin,
    term,
    raceDate,
  } = candidate;
  let resolvedRace = '';
  let raceDone = false;
  if (raceDate) {
    if (new Date() > new Date(raceDate)) {
      raceDone = true;
    }
  }
  let raceYear;
  if (raceDone) {
    raceYear = new Date(raceDate).getFullYear();
  }

  if (office) {
    resolvedRace = `${state ? shortToLongState[state] : ''} ${office} ${
      district ? `| District ${district}` : ''
    }`;
  } else {
    resolvedRace = race;
  }
  return (
    <>
      {raceDone && didWin === 'Yes' && <strong>IN OFFICE: </strong>}
      {raceDone && didWin === 'No' && <strong>{raceYear} Campaign: </strong>}
      {partyResolver(party, otherParty)} | {resolvedRace}
      {didWin && term && (
        <div style={{ marginTop: '7px' }}>
          <strong>TERM:</strong> {term}
        </div>
      )}
      {counties && (
        <div style={{ marginTop: '7px', color: '#868686' }}>
          <strong>Counties Served</strong>: {counties}
        </div>
      )}
    </>
  );
};

export const candidateColor = (candidate) => {
  const { color, isClaimed } = candidate;
  if (color?.color) {
    return color.color;
  }
  return '#000';
};

export const candidateHash = (candidate) => {
  if (!candidate) {
    return '';
  }
  if (candidate.hashtag) {
    return candidate.hashtag;
  }
  return `${candidate.firstName}${candidate.lastName}2022`;
};
