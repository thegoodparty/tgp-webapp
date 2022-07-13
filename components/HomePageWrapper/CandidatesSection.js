import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { HomePageContext } from '/containers/HomePage';
import It from '../shared/It';
import CandidatesRoundPreview from '../shared/CandidateRoundPreview';

const Wrapper = styled.section`
  padding: 20px 0 60px;
`;

const H2 = styled.h2`
  font-size: 35px;
  font-weight: 900;
  margin: 0 0 48px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 64px;
    margin: 0 0 72px;
  }
`;

const Content = styled.div`
  margin-bottom: 30px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-bottom: 50px;
  }
`;

const CandidatesSection = () => {
  const { homepageCandidates } = useContext(HomePageContext);
  return (
    <Wrapper>
      {' '}
      <H2>What does partying accomplish?</H2>
      <Content>
        When we get enough @goodparty people, we’ll be able to elect some good
        people who will serve us, instead of <It />.
        <br />
        <br />
        Meet some Good Certified candidates:
      </Content>
      <Grid container spacing={4}>
        {(homepageCandidates || []).map((candidate) => (
          <Grid item xs={6} lg={4} key={candidate.id}>
            <CandidatesRoundPreview candidate={candidate} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default CandidatesSection;
