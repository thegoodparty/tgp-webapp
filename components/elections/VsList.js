import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ShareIcon from 'public/images/icons/share-icon-white.svg';
import { Body9, Body11, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import {
  partyResolver,
  candidateRoute,
  candidateRanking,
  generateEmptyBlocCandidate,
} from 'helpers/electionsHelper';
import { numberFormatter, numberNth } from 'helpers/numberHelper';

import LoadingAnimation from '../shared/LoadingAnimation';
import SupportersProgressBar from './SupportersProgressBar';
import FollowTheMoney from './CandidateWrapper/FollowTheMoney';
import WonLostElection from '../shared/WonLostElection';

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
  margin-bottom: 18px;
`;

const BlocCount = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  font-weight: 500;
  margin-top: 4px;
`;

const PercWrapper = styled(Body13)`
  font-weight: 700;
  display: inline-block;
`;

const JoinButton = styled(Body11)`
  padding: 0.8rem 0.6rem;
  width: 100%;
  min-width: 140px;
  border-radius: 40px;
  margin-top: 8px;
  cursor: pointer;
  border: solid 2px ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 2rem;
    min-width: 220px;
  }
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
  padding: 0.8rem 0.6rem;
  position: relative;
  width: 100%;
  min-width: 140px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: #fff;
  border-radius: 40px;
  margin-top: 8px;
  cursor: pointer;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.8rem 2rem;
    min-width: 220px;
  }
`;
const BlueBody11 = styled(Body11)`
  font-weight: 500;
`;
const WhiteBody11 = styled(Body11)`
  font-weight: 500;
  color: #fff;
`;

const Img = styled.img`
  position: absolute;
  top: 9px;
  left: 24px;
  width: 16px;
  height: auto;
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

  .bar-bg {
    background-color: ${({ theme }) => theme.colors.grayBg};
  }
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
  handleDeselectCandidate,
  chamber,
  state,
  districtNumber,
  incumbent,
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

  const choiceButton = candidate => {
    const candidateRank = candidateRanking(ranking, candidate);

    if (candidateRank) {
      return (
        <GrowWrapper>
          <Link href={`${candidateRoute(candidate)}?share=true`}>
            <GrowButtonWrapper>
              <WhiteBody11>
                <Img src={ShareIcon} alt="share" /> SHARE
              </WhiteBody11>
            </GrowButtonWrapper>
          </Link>
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
        <Link href={candidateRoute(candidate)}>
          <JoinButton>See Campaign</JoinButton>
        </Link>
      </GrowWrapper>
    );
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
    const { votesReceived, votesNeeded, likelyVoters } = candidate;
    const votes = votesReceived === 0 ? likelyVoters : votesReceived;
    const percNeeded = (votes * 100) / votesNeeded;

    return (
      <BlocCount data-cy="block-count">
        <span title={`${numberFormatter(votes)} Votes`}>
          <PercWrapper>{percNeeded.toFixed(1)}%</PercWrapper> of{' '}
        </span>
        {numberFormatter(votesNeeded)} votes needed to win {inText(candidate)}
        <SupportersProgressBar
          peopleSoFar={votes}
          votesNeeded={votesNeeded}
          showSupporters={false}
          alignLeft
          showSuffix={false}
          color="green"
        />
        <FollowTheMoney
          candidate={candidate}
          incumbent={incumbent}
          layout="vertical"
        />
      </BlocCount>
    );
  };

  const inText = candidate => {
    if (chamber === 'house') {
      return `${candidate.state.toUpperCase()}-${candidate.district}`;
    }
    if (chamber === 'senate') {
      return `${candidate.state.toUpperCase()}`;
    }
    return '';
  };

  return (
    <div data-cy="vs-list">
      <Row>
        <Side data-cy="good-side">
          <GoodTitle data-cy="side-title">POTENTIALLY GOOD</GoodTitle>
          {good.map(candidate => (
            <Link
              href={candidateRoute(candidate)}
              key={candidate.id}
              data-cy="candidate"
            >
              <CandidateWrapper>
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  name={candidate.name}
                  good
                />
                <Name data-cy="candidate-name">{candidate.name}</Name>
                <Role data-cy="candidate-role">
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                <WonLostElection candidate={candidate} />
                {blocCountSection(candidate)}
                {choiceButton(candidate)}
              </CandidateWrapper>
            </Link>
          ))}
          {good.length === 0 && (
            <CandidateWrapper data-cy="candidate">
              <CandidateAvatar
                size="responsive"
                src={noneYetCandidate.image}
                good
              />
              <Name className="gray" data-cy="candidate-name">
                NONE YET
              </Name>
              <Role data-cy="candidate-role">GOOD PARTY APPROVED</Role>
            </CandidateWrapper>
          )}
        </Side>
        <Middle>
          <FiltersWRapper>
            <FiltersButton onClick={openFiltersCallback} data-cy="open-filter">
              GOOD CRITERIA
            </FiltersButton>
          </FiltersWRapper>
          <Line />
          <Vs data-cy="vs">VS</Vs>
        </Middle>
        <Side className="right" data-cy="not-good-side">
          <NotGoodTitle data-cy="side-title">NOT GOOD ENOUGH</NotGoodTitle>
          {notGood.map(candidate => (
            <Link
              href={candidateRoute(candidate)}
              key={candidate.id}
              data-cy="candidate"
            >
              <CandidateWrapper className="right">
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  name={candidate.name}
                />
                <Name data-cy="candidate-name">{candidate.name}</Name>
                <Role className="text-right" data-cy="candidate-role">
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                <WhyNot data-cy="why-not">Why not good enough?</WhyNot>
                <div style={{ height: '16px' }} />
                <FollowTheMoney
                  candidate={candidate}
                  incumbent={incumbent}
                  layout="vertical"
                />
              </CandidateWrapper>
            </Link>
          ))}
        </Side>
      </Row>
      {unknown && unknown.length > 0 && (
        <UnknownWrapper data-cy="unknown-side">
          <UnknownTitle data-cy="side-title">NOT YET RATED</UnknownTitle>
          {unknown.map(candidate => (
            <Link
              href={candidateRoute(candidate)}
              key={candidate.id}
              data-cy="candidate"
            >
              <CandidateWrapper className="center">
                <CandidateAvatar
                  size="responsive"
                  src={candidate.image}
                  good={null}
                  name={candidate.name}
                />
                <Name data-cy="candidate-name">{candidate.name}</Name>
                <Role data-cy="candidate-role">
                  {partyResolver(candidate.party)}
                  <br />
                  {candidate.isIncumbent && 'INCUMBENT'}
                </Role>
                <WonLostElection candidate={candidate} whiteBorder />
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

  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openFiltersCallback: PropTypes.func,
  ranking: PropTypes.object,
  handleDeselectCandidate: PropTypes.func,
  districtNumber: PropTypes.string,
  chamber: PropTypes.string,
  state: PropTypes.string,
};

export default VsList;
