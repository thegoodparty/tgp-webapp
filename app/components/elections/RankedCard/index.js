import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Card from 'components/shared/Card';
import { H3, Body9, Body11 } from 'components/shared/typogrophy/index';
import RankedCandidate from '../RankedCandidate';
import SupportersProgressBar from '../SupportersProgressBar';
import { mapCandidateToHash } from '../../../helpers/electionsHelper';

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
  suffixText=''
}) => {
  const rank = Object.keys(rankObj);
  const [candidatesHash, setCandidatesHash] = useState({});
  useEffect(() => {
    const candHash = mapCandidateToHash(candidates);
    setCandidatesHash(candHash);
  }, [candidates]);
  const { topRank } = candidates;

  const votesNeeded = candidates.threshold;

  const candidateRow = (userRank, index) => {
    if (index > 1) {
      return <></>;
    }
    if (candidatesHash !== {}) {
      const candidate = candidatesHash[userRank.candidateId];
      if (candidate) {
        return (
          <RankedCandidate
            candidate={candidate}
            index={index}
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
      />
      <YourChoices>
        {rank.length > 2 ? 'YOUR RANKED CHOICES' : 'YOUR CHOICE'}
      </YourChoices>
      {rank.map((rankedId, index) => (
        <React.Fragment key={rankedId}>
          {candidateRow(rankObj[rankedId], index)}
        </React.Fragment>
      ))}
      {rank.length > 2 ? (
        <MoreChoices>+ {rank.length - 2} MORE CHOICES</MoreChoices>
      ) : (
        <MoreChoices>SEE DETAILS</MoreChoices>
      )}
    </Card>
  );
};

RankedCard.propTypes = {
  title: PropTypes.string,
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rank: PropTypes.array,
  suffixText: PropTypes.string
};

export default RankedCard;
