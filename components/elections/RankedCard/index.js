import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Card from 'components/shared/Card';
import { H3, Body9, Body11 } from 'components/shared/typogrophy/index';
import RankedCandidate from '../RankedCandidate';
import SupportersProgressBar from '../SupportersProgressBar';
import {
  generateEmptyBlocCandidate,
  mapCandidateToHash,
} from '../../../helpers/electionsHelper';

const YourChoices = styled(Body11)`
  margin: 32px 0 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray7};
  font-weight: 500;
`;

const MoreChoices = styled(Body9)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
  text-align: center;
  margin-top: 18px;
`;

const RankedCard = ({
  title,
  candidates = {},
  rankObj = {},
  suffixText = '',
  chamber,
  district,
  state,
}) => {
  const [candidatesHash, setCandidatesHash] = useState({});
  const [sortedRank, setSortedRank] = useState([]);
  useEffect(() => {
    const candHash = mapCandidateToHash(candidates);
    setCandidatesHash(candHash);
  }, [candidates]);

  useEffect(() => {
    const rank = Object.keys(rankObj);
    rank.sort((a, b) => rankObj[a].rank - rankObj[b].rank);
    setSortedRank(rank);
  }, [rankObj]);

  const { topRank } = candidates;

  const votesNeeded = candidates.threshold;

  const candidateRow = userRank => {
    // empty candidate
    if (userRank?.candidateId < 0) {
      const emptyCandidate = generateEmptyBlocCandidate(
        district,
        chamber,
        state,
      );
      return (
        <RankedCandidate
          candidate={emptyCandidate}
          index={userRank.rank}
          withLink={false}
        />
      );
    }
    if (candidatesHash !== {}) {
      const candidate = candidatesHash[(userRank?.candidateId)];
      if (candidate) {
        return (
          <RankedCandidate
            candidate={candidate}
            index={userRank.rank}
            withLink={false}
          />
        );
      }
    }
    return <></>;
  };
  return (
    <Card>
      <H3>{title}</H3>

      <SupportersProgressBar
        peopleSoFar={topRank}
        votesNeeded={votesNeeded}
        suffixText={suffixText}
        userState={candidates.userState}
      />
      <YourChoices>YOUR CHOICE{sortedRank.length > 1 && 'S'}</YourChoices>
      {sortedRank.map((rankedId, index) => (
        <React.Fragment key={rankedId}>
          {candidateRow(rankObj[rankedId], index)}
        </React.Fragment>
      ))}
      <MoreChoices>SEE DETAILS</MoreChoices>
    </Card>
  );
};

RankedCard.propTypes = {
  title: PropTypes.string,
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  suffixText: PropTypes.string,
  rankObj: PropTypes.object,
  chamber: PropTypes.string,
  district: PropTypes.string,
  state: PropTypes.string,
};

export default RankedCard;
