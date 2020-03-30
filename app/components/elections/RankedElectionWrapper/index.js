import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body, Body13, H1, H3 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import AmaContainer from 'containers/shared/AmaContainer';
import articlesHelper from 'helpers/articlesHelper';
import GrayWrapper from 'components/shared/GrayWrapper';
import UsMapImage from 'images/us-map.svg';
import {
  mapCandidateToHash,
  presidentialVotesThreshold,
} from 'helpers/electionsHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import { numberFormatter } from '../../../helpers/numberHelper';
import RankedCandidate from '../RankedCandidate';
import { BlueButton } from '../../shared/buttons';
import ShareButton from '../../shared/ShareButton';

const Description = styled(Body)`
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RankedChoicesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 48px;
`;

const SupportersWrapper = styled.div`
  flex: 6;
`;

const SupportersCount = styled(H1)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const SuppoetersBody = styled(Body)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const MapWrapper = styled.div`
  flex: 4;
  img {
    width: 100%;
    height: auto;
  }
`;

const ButtonWrapper = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-top: 24px;
`;

const RankedElectionWrapper = ({
  chamber,
  candidates = {},
  content,
  userCounts,
  rank = [],
  votesNeeded,
  state,
  districtNumber,
}) => {
  const [candidatesHash, setCandidatesHash] = useState({});
  useEffect(() => {
    const candHash = mapCandidateToHash(candidates);
    setCandidatesHash(candHash);
  }, [candidates]);

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }

  let chamberCount = 0;
  if (userCounts) {
    if (chamber === 'Presidential') {
      chamberCount = userCounts.totalUsers;
    } else if (chamber === 'Senate') {
      chamberCount = userCounts.stateUsers;
    } else if (chamber === 'House') {
      chamberCount = userCounts.districtUsers;
    }
  }

  const candidateRow = (rankedId, index) => {
    if (candidatesHash !== {}) {
      const candidate = candidatesHash[rankedId];
      if (candidate) {
        return <RankedCandidate candidate={candidate} index={index} />;
      }
    }
    return <></>;
  };

  const rankPage = () => {
    if (chamber === 'Presidential') {
      return '/elections/rank-candidates/presidential';
    }
    if (chamber === 'Senate') {
      return `/elections/rank-candidates/senate/${state}`;
    }
    if (chamber === 'House') {
      return `/elections/rank-candidates/house/${state}/${districtNumber}`;
    }
    return '/elections/rank-candidates/presidential';
  };

  return (
    <GrayWrapper>
      {candidates ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader showShare />

            <H1>{chamber} Elections</H1>
            <Description>
              Spread the word and let’s grow the Good Party Supporters, so we
              can get enough votes to elect your choices below!
            </Description>
            <H3 style={{ margin: '18px 0 12px' }}>{chamber} Race Progress</H3>
            <Row>
              <SupportersWrapper>
                <SupportersCount>
                  {numberFormatter(chamberCount)}
                </SupportersCount>
                <SuppoetersBody>Good Party Supporters</SuppoetersBody>
                <SupportersProgressBar
                  votesNeeded={votesNeeded}
                  peopleSoFar={chamberCount}
                  showSupporters={false}
                  alignLeft
                />
              </SupportersWrapper>
              <MapWrapper>
                <img src={UsMapImage} alt="" />
              </MapWrapper>
            </Row>
            <RankedChoicesRow>
              <H3>Your Ranked Choices</H3>
              <Body13>
                <Link to={rankPage()}>Edit</Link>
              </Body13>
            </RankedChoicesRow>
            {rank.map((rankedId, index) => (
              <React.Fragment key={rankedId}>
                {candidateRow(rankedId, index)}
              </React.Fragment>
            ))}

            <ButtonWrapper>
              <ShareButton />
            </ButtonWrapper>

            <TopQuestions articles={articles} />
          </Wrapper>
          <AmaContainer />
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GrayWrapper>
  );
};

RankedElectionWrapper.propTypes = {
  chamber: PropTypes.string,
  candidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changeFiltersCallback: PropTypes.func,
  filters: PropTypes.object,
  userCounts: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rank: PropTypes.array,
  votesNeeded: PropTypes.number,
  state: PropTypes.string,
  districtNumber: PropTypes.string,
};

export default RankedElectionWrapper;
