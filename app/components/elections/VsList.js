import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Body9, Body11, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  presidentialCandidateRoute,
} from 'helpers/electionsHelper';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Side = styled.div`
  margin-top: 11px;
  flex-basis: calc(50% - 10px);

  &.right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const Middle = styled.div`
  flex-basis: 2px;
  text-align: center;
  position: relative;

  & > div {
    color: ${({ theme }) => theme.colors.gray9};
  }
`;

const CandidateWrapper = styled.div`
  margin-top: 17px;
  margin-bottom: 30px;
  cursor: pointer;

  &.right {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
`;

const Name = styled(Body13)`
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
`;

const Role = styled(Body9)`
  opacity: 0.8;
`;

const Line = styled.div`
  width: 1px;
  border: solid 0.5px #cdcdcd;
  height: calc(100% - 30px);
  margin-top: 20px;
`;

const Why = styled(Body9)`
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.colors.grayBg};
  padding: 10px 0;
  width: 40px;
  left: -20px;
  text-align: center;
`;

const Vs = styled(Body11)`
  position: absolute;
  top: 150px;
  background-color: ${({ theme }) => theme.colors.grayBg};
  padding: 10px 0;
  width: 20px;
  left: -10px;
  text-align: center;
`;

const noCandidateImage = 'https://assets.thegoodparty.org/no-candidate.svg';

const VsList = ({ candidates = {} }) => {
  if (!candidates || (!candidates.good && !candidates.notGood)) {
    return;
  }

  return (
    <Row>
      <Side>
        <Body9>NOT GOOD ENOUGH</Body9>
        {candidates.notGood.map(candidate => (
          <Link to={presidentialCandidateRoute(candidate)} key={candidate.id}>
            <CandidateWrapper>
              <CandidateAvatar
                size="responsive"
                src={candidate.image || noCandidateImage}
              />
              <Name>{candidate.name}</Name>
              <Role>
                {partyResolver(candidate.party)}
                <br />
                {candidate.isIncumbent && 'INCUMBENT'}
              </Role>
            </CandidateWrapper>
          </Link>
        ))}
      </Side>
      <Middle>
        <Why>WHY?</Why>
        <Line />
        <Vs>VS</Vs>
      </Middle>
      <Side className="right">
        <Body9>GOOD ENOUGH</Body9>
        {candidates.good.map(candidate => (
          <Link to={presidentialCandidateRoute(candidate)} key={candidate.id}>
            <CandidateWrapper className="right">
              <CandidateAvatar
                size="responsive"
                src={candidate.image || noCandidateImage}
                good
              />
              <Name>{candidate.name}</Name>
              <Role>
                {partyResolver(candidate.party)}
                <br />
                {candidate.isIncumbent && 'INCUMBENT'}
              </Role>
            </CandidateWrapper>
          </Link>
        ))}
      </Side>
    </Row>
  );
};

VsList.propTypes = {
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default VsList;
