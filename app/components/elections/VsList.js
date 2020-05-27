import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { Body9, Body11, Body13, Body } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  candidateRoute,
  candidateRanking,
  candidateBlocName,
  generateEmptyBlocCandidate,
} from 'helpers/electionsHelper';
import { numberFormatter, numberNth } from 'helpers/numberHelper';

import LoadingAnimation from '../shared/LoadingAnimation';

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

const GoodTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.green};
  letter-spacing: 0;
  font-weight: 700;
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

const BlocCount = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  font-weight: 500;
  margin-top: 4px;
`;

const JoinButton = styled(Body11)`
  padding: 0.8rem 2.5rem;
  border-radius: 40px;
  margin-top: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.blue};
  color: #fff;
  text-align: center;
`;

const GrowWrapper = styled.div`
  display: inline-block;
  min-width: 95%;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 80%;
  }
`;

const GrowWrapperUnknown = styled.div`
  max-width: 420px;
`;

const GrowButtonWrapper = styled.div`
  padding: 0.8rem 2.5rem;
  border: solid 2px ${({ theme }) => theme.colors.blue};
  border-radius: 40px;
  margin-top: 8px;
  cursor: pointer;
  text-align: center;
`;
const BlueBody11 = styled(Body11)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
`;
const WhyNot = styled(BlueBody11)`
  margin-top: 8px;
`;

const ChosenCandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  width: 120px;
  left: -60px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 160px;
    left: -80px;
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

const UnknownWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.grayC};
  border-radius: 8px;
  padding: 24px;
  margin-top: 48px;
`;

const NominateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  margin-top: 32px;
`;

const NominateText = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 600;
  margin-left: 4px;
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
  goodBloc,
  chamber,
  state,
  districtNumber,
  handleGrowCallback,
  user,
}) => {
  const { good, notGood, unknown } = candidates;
  if (!candidates || (!good && !notGood && !unknown)) {
    return <LoadingAnimation />;
  }
  const noneYetCandidate = generateEmptyBlocCandidate(
    districtNumber,
    chamber,
    state,
  );

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

  if (good.length === 0 && ranking[(noneYetCandidate?.id)]) {
    nextChoice++;
  }

  const onGrow = (candidate, e) => {
    e.stopPropagation();
    e.preventDefault();
    handleGrowCallback(candidate);
  };

  const choiceButton = candidate => {
    const candidateRank = candidateRanking(ranking, candidate);
    if (candidateRank) {
      return (
        <GrowWrapper>
          <GrowButtonWrapper onClick={e => onGrow(candidate, e)}>
            {candidate.id === noneYetCandidate.id ? (
              <BlueBody11>GROW #GoodBloc</BlueBody11>
            ) : (
              <BlueBody11>
                GROW {candidateBlocName(candidate, chamber)}
              </BlueBody11>
            )}
          </GrowButtonWrapper>
          <ChosenCandWrapper onClick={e => handleDeselect(candidate, e)}>
            <CheckMark />{' '}
            <ChosenCand>{numberNth(candidateRank)} CHOICE </ChosenCand>
            <CloseIcon />
          </ChosenCandWrapper>
        </GrowWrapper>
      );
    }
    return (
      <GrowWrapper>
        <JoinButton onClick={e => handleChoice(candidate, e)}>
          JOIN{' '}
          {candidate.id === noneYetCandidate.id
            ? '#GoodBloc'
            : candidateBlocName(candidate, chamber)}
        </JoinButton>
      </GrowWrapper>
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
      handleDeselectCandidate(ranking[candidate.id]);
    }
  };

  const blocCountSection = candidate => {
    const candidateRank = candidateRanking(ranking, candidate);
    let rank = candidate.ranking;

    if (candidateRank && !user) {
      // no user - need to add the guest count
      rank++;
    }

    return (
      <BlocCount>
        {numberFormatter(rank)} {rank === 1 ? 'is' : 'are'} in{' '}
        {candidateBlocName(candidate, chamber)}
      </BlocCount>
    );
  };

  let displayBloc = goodBloc;
  if (chamber === 'house') {
    displayBloc =
      goodBloc.substring(0, 2) + '-' + goodBloc.substring(2, goodBloc.length);
  }

  let goodEmptyBloc = candidates.goodEmptyBloc;
  if (!user && ranking[(noneYetCandidate?.id)]) {
    goodEmptyBloc++;
  }
  return (
    <div>
      <Row>
        <Side>
          <GoodTitle>POTENTIALLY GOOD</GoodTitle>
          {good.map(candidate => (
            <Link to={candidateRoute(candidate)} key={candidate.id}>
              <CandidateWrapper>
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
                {blocCountSection(candidate)}
                {choiceButton(candidate)}
              </CandidateWrapper>
            </Link>
          ))}
          {good.length === 0 && (
            <CandidateWrapper>
              <CandidateAvatar
                size="responsive"
                src={noneYetCandidate.image}
                good
              />
              <Name className="gray">NONE YET</Name>
              <Role>GOOD PARTY APPROVED</Role>
              <BlocCount>
                {numberFormatter(goodEmptyBloc)}{' '}
                {goodEmptyBloc === 1 ? 'is' : 'are'} in #GoodBloc of{' '}
                {displayBloc}
              </BlocCount>
              {choiceButton(noneYetCandidate)}
            </CandidateWrapper>
          )}
        </Side>
        <Middle>
          <FiltersWRapper>
            <FiltersButton onClick={openFiltersCallback}>
              GOOD CRITERIA
            </FiltersButton>
          </FiltersWRapper>
          <Line />
          <Vs>VS</Vs>
        </Middle>
        <Side className="right">
          <NotGoodTitle>NOT GOOD ENOUGH</NotGoodTitle>
          {notGood.map(candidate => (
            <Link to={candidateRoute(candidate)} key={candidate.id}>
              <CandidateWrapper className="right">
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  name={candidate.name}
                />
                <Name>{candidate.name}</Name>
                <Role className="text-right">
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                <WhyNot>Why not good enough?</WhyNot>
              </CandidateWrapper>
            </Link>
          ))}
        </Side>
      </Row>
      {good.length === 0 && (
        <a href="https://forms.gle/kydnhUp6xqF6RUpb9" target="_blank">
          <NominateWrapper>
            <MailOutlineIcon />{' '}
            <NominateText>Nominate a candidate</NominateText>
          </NominateWrapper>
        </a>
      )}
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
                {blocCountSection(candidate)}
                <GrowWrapperUnknown>
                  {choiceButton(candidate)}
                </GrowWrapperUnknown>
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
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openFiltersCallback: PropTypes.func,
  handleChoiceCallback: PropTypes.func,
  handleGrowCallback: PropTypes.func,
  handleDeselectCandidate: PropTypes.func,
  goodBloc: PropTypes.string,
  districtNumber: PropTypes.string,
  chamber: PropTypes.string,
  state: PropTypes.string,
};

export default VsList;
