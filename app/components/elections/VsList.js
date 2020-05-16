import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { Body9, Body11, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  candidateRoute,
  candidateRanking,
} from 'helpers/electionsHelper';
import { OutlinedButton } from '../shared/buttons';
import LoadingAnimation from '../shared/LoadingAnimation';
import { numberNth } from '../../helpers/numberHelper';

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

const NotGoodTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.red};
  letter-spacing: 0;
  font-weight: 700;
`;

const NotGoodSubtitle = styled(Body9)`
  color: ${({ theme }) => theme.colors.red};
  letter-spacing: 0;
`;

const GoodTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.green};
  letter-spacing: 0;
  font-weight: 700;
`;

const GoodSubtitle = styled(Body9)`
  color: ${({ theme }) => theme.colors.green};
  letter-spacing: 0;
  text-align: right;
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

  &.center {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Name = styled(Body13)`
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};

  &.gray {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Role = styled(Body9)`
  opacity: 0.8;
`;

const ChoiceButton = styled(Body9)`
  color: ${({ theme }) => theme.colors.blue};
  border-radius: 20px;
  border: solid 1px ${({ theme }) => theme.colors.blue};
  padding: 7px 12px;
  display: inline-block;
  margin-top: 8px;
  pointer: cursor;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color 0.3s, color 0.3s;

  &: hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;

const ChosenCandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const ChosenCand = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  margin: 0 6px;
  text-transform: uppercase;
`;

const CheckMark = styled(CheckIcon)`
  color: ${({ theme }) => theme.colors.lightBlue};
  && {
    font-size: 9px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 12px;
    }
  }
`;

const CloseIcon = styled(HighlightOffIcon)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  && {
    font-size: 9px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 12px;
    }
  }
`;

const Line = styled.div`
  width: 1px;
  border: solid 0.5px #cdcdcd;
  height: calc(100% - 30px);
  margin-top: 20px;
`;

const FiltersWRapper = styled.div`
  position: absolute;
  top: 50px;
  background-color: ${({ theme }) => theme.colors.grayBg};
  padding: 10px 0;
  width: 80px;
  left: -40px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 120px;
    left: -60px;
  }
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

const FiltersButton = styled(Body9)`
  background-color: #fff;
  border-radius: 40px;
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.colors.blue};
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07), 0px 0px 12px rgba(0, 0, 0, 0.08),
    0px 0px 16px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  text-align: center;
`;

const EditChoices = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  padding: 16px 0 8px;
  cursor: pointer;
`;

const UnknownWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 8px;
  padding: 24px;
  margin-top: 48px;
`;

const UnknownTitle = styled(Body9)`
  letter-spacing: 0.5px;
  font-weight: 500;
  text-align: center;
`;

const VsList = ({
  candidates = {},
  openFiltersCallback = () => {},
  ranking,
  handleChoiceCallback,
  handleDeselectCandidate,
  rankingMode,
  editRankingCallback,
}) => {
  const { good, notGood, unknown } = candidates;
  if (!candidates || (!good && !notGood && !unknown)) {
    return <LoadingAnimation />;
  }
  let nextChoice = 1;
  if (candidates) {
    [...good, ...notGood, ...unknown].forEach(candidate => {
      if (
        ranking[candidate.id] &&
        ranking[candidate.id].isIncumbent === !!candidate.isIncumbent
      ) {
        nextChoice++;
      }
    });
  }
  const choiceButton = candidate => {
    const candidateRank = candidateRanking(ranking, candidate);
    if (candidateRank) {
      return (
        <ChosenCandWrapper onClick={e => handleDeselect(candidate, e)}>
          <CheckMark />{' '}
          <ChosenCand>{numberNth(candidateRank)} CHOICE </ChosenCand>
          <CloseIcon />
        </ChosenCandWrapper>
      );
    }
    if (!rankingMode) {
      return <></>;
    }
    return (
      <ChoiceButton onClick={e => handleChoice(candidate, e)}>
        {numberNth(nextChoice)} CHOICE
      </ChoiceButton>
    );
  };

  const handleChoice = (candidate, e) => {
    e.stopPropagation();
    e.preventDefault();
    handleChoiceCallback(candidate, nextChoice);
  };

  const handleDeselect = (candidate, e) => {
    e.stopPropagation();
    e.preventDefault();
    const candidateRank = candidateRanking(ranking, candidate);
    if (candidateRank !== false) {
      handleDeselectCandidate(ranking[candidate.id].id);
    }
  };

  const noneYetCandidate = {
    id: -1,
    isGood: true,
  };

  return (
    <div>
      <Row>
        <Side>
          <NotGoodTitle>NOT GOOD ENOUGH</NotGoodTitle>
          <NotGoodSubtitle>BIG MONEY CANDIDATES</NotGoodSubtitle>
          {notGood.map(candidate => (
            <Link to={candidateRoute(candidate)} key={candidate.id}>
              <CandidateWrapper>
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  name={candidate.name}
                />
                <Name>{candidate.name}</Name>
                <Role>
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                {choiceButton(candidate)}
              </CandidateWrapper>
            </Link>
          ))}
        </Side>
        <Middle>
          <FiltersWRapper>
            <FiltersButton onClick={openFiltersCallback}>FILTERS</FiltersButton>
            {!rankingMode && (
              <EditChoices onClick={editRankingCallback}>
                Edit Choices
              </EditChoices>
            )}
          </FiltersWRapper>
          <Line />
          <Vs>VS</Vs>
        </Middle>
        <Side className="right">
          <GoodTitle>GOOD OPTIONS</GoodTitle>
          <GoodSubtitle>SMALL MONEY CANDIDATES</GoodSubtitle>
          {good.map(candidate => (
            <Link to={candidateRoute(candidate)} key={candidate.id}>
              <CandidateWrapper className="right">
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  name={candidate.name}
                  good
                />
                <Name>{candidate.name}</Name>
                <Role>
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                {choiceButton(candidate)}
              </CandidateWrapper>
            </Link>
          ))}
          {good.length === 0 && (
            <CandidateWrapper className="right">
              <CandidateAvatar size="responsive" src="blank" good />
              <Name className="gray">NONE YET</Name>
              <Role className="text-right">
                CHOOSE TO GET NOTIFIED
                <br />
                OF ANY GOOD CHALLENGERS
              </Role>
              {choiceButton(noneYetCandidate)}
            </CandidateWrapper>
          )}
        </Side>
      </Row>
      {unknown && unknown.length > 0 && (
        <UnknownWrapper>
          <UnknownTitle>NOT YET RATED</UnknownTitle>
          {unknown.map(candidate => (
            <Link to={candidateRoute(candidate)} key={candidate.id}>
              <CandidateWrapper className="center">
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  good={null}
                  name={candidate.name}
                />
                <Name>{candidate.name}</Name>
                <Role>
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                {choiceButton(candidate)}
              </CandidateWrapper>
            </Link>
          ))}
        </UnknownWrapper>
      )}
    </div>
  );
};

VsList.propTypes = {
  candidates: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.bool,
  ]),
  openFiltersCallback: PropTypes.func,
  handleChoiceCallback: PropTypes.func,
  handleDeselectCandidate: PropTypes.func,
  editRankingCallback: PropTypes.func,
  rankingMode: PropTypes.bool,
};

export default VsList;
