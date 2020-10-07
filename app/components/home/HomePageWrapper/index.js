import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';
import MoneyCorruptionSection from '../MoneyCorruptionSection';
import TellMeMoreSection from '../TellMeMoreSection';
import StatsSection from '../StatsSection';
import RockTheVoteSection from '../RockTheVoteSection';
import CreatorsSection from '../CreatorsSection';
import ChallengersSection from '../ChallengersSection';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 140px);
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  &.gray {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.gray11};
  }
  padding: 0 10px;
`;
const GrayWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray11};
`;
const HomePageWrapper = ({ goodChallengers, subscribeEmailCallback }) => (
  <PageWrapper isFullWidth white>
    <ContentWrapper>
      <MoneyCorruptionSection />
      <StatsSection />
      <TellMeMoreSection subscribeEmailCallback={subscribeEmailCallback} />
    </ContentWrapper>
    <GrayWrapper>
      <RockTheVoteSection />
    </GrayWrapper>
    <ContentWrapper>
      <ChallengersSection challengers={goodChallengers} />
      <CreatorsSection />
    </ContentWrapper>
  </PageWrapper>
);

HomePageWrapper.propTypes = {
  goodChallengers: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  subscribeEmailCallback: PropTypes.func,
};

export default HomePageWrapper;
