import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Card from 'components/shared/Card';
import { H3, Body9, Body11, Body13 } from 'components/shared/typogrophy/index';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import noCandidateImage from 'components/shared/noCandidateImageUrl';
import { partyResolver } from 'helpers/electionsHelper';
import { numberFormatter } from '../../../helpers/numberHelper';

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
`;

const BarBg = styled.div`
  margin: 10px 0;
  width: 80%;
  position: relative;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 3px;
  overflow: hidden;
`;

const Bar = styled.div`
  position: absolute;
  height: 5px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.blue};
  left: 0;
  top: 0;
  width: 0;
  transition: width 0.5s;
`;

const YourChoices = styled(Body11)`
  margin: 32px 0 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray7};
  font-weight: 500;
`;

const BarBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const BarBody9 = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const RankIndex = styled(Body9)`
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const CandName = styled(Body9)`
  margin-left: 16px;
`;

const Party = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const MoreChoices = styled(Body9)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
  text-align: center;
  margin-top: 18px;
`;

const RankedCard = ({
  title,
  peopleSoFar,
  votesNeeded,
  candidates = {},
  rank = [],
}) => {
  const progress = (peopleSoFar * 100) / votesNeeded;
  const [candidatesHash, setCandidatesHash] = useState({});
  useEffect(() => {
    if (candidates && candidates.good) {
      const candHash = {};
      candidates.good.forEach(cand => {
        candHash[cand.id] = { ...cand, isGood: true };
      });
      candidates.unknown.forEach(cand => {
        candHash[cand.id] = { ...cand, isGood: null };
      });
      candidates.notGood.forEach(cand => {
        candHash[cand.id] = { ...cand, isGood: false };
      });

      setCandidatesHash(candHash);
    }
  }, [candidates]);

  const candidateRow = (rankedId, index) => {
    if (index > 1) {
      return <></>;
    }
    if (candidatesHash !== {}) {
      const candidate = candidatesHash[rankedId];
      if (candidate) {
        return (
          <Row>
            <RankIndex>{index + 1}</RankIndex>
            <CandidateAvatar
              size="responsive"
              src={candidate.image}
              good={candidate.isGood}
            />
            <CandName>
              <Body13>{candidate.name}</Body13>
              <Party>{partyResolver(candidate.party)}</Party>
            </CandName>
          </Row>
        );
      }
    }
    return <></>;
  };
  return (
    <Card>
      <H3>{title}</H3>

      <ProgressBarWrapper>
        <BarBody11>
          {numberFormatter(peopleSoFar)} Good Party People so far
        </BarBody11>
        <BarBg>
          <Bar style={{ width: `${progress}%` }} />
        </BarBg>
        <BarBody9>{numberFormatter(votesNeeded)} VOTES NEEDED TO WIN!</BarBody9>
      </ProgressBarWrapper>
      <YourChoices>YOUR RANKED CHOICES</YourChoices>
      {rank.map((rankedId, index) => (
        <>{candidateRow(rankedId, index)}</>
      ))}
      {rank.length > 2 && (
        <MoreChoices>+ {rank.length - 2} MORE CHOICES</MoreChoices>
      )}
    </Card>
  );
};

RankedCard.propTypes = {
  title: PropTypes.string,
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  peopleSoFar: PropTypes.number,
  votesNeeded: PropTypes.number,
  rank: PropTypes.array,
};

export default RankedCard;
