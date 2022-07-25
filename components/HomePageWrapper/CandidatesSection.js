import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { HomePageContext } from '/containers/HomePage';
import It from '../shared/It';
import CandidatesRoundPreview from '../shared/CandidateRoundPreview';

const Wrapper = styled.section`
  padding: 20px 0 60px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding-top: 60px;
  }
`;

const H2 = styled.h2`
  font-size: 21px;
  font-weight: 900;
  margin: 0 0 18px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 42px;
    margin: 0 0 30px;
  }
`;

const Content = styled.div`
  margin-bottom: 30px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-bottom: 50px;
    font-size: 22px;
  }
`;

const More = styled.div`
  margin-top: 48px;
  font-size: 24px;
  font-weight: 900;
  text-decoration: underline;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 134px;
  }
`;

const CandidatesSection = () => {
  const { homepageCandidates } = useContext(HomePageContext);
  return (
    <Wrapper>
      {' '}
      <H2>
        We meme to beat <span className="red">Red</span> and{' '}
        <span className="blue">Blue</span>{' '}
        <span role="img" aria-label="Money Bag">
          💰
        </span>
      </H2>
      <Content>
        Grow the movement to get good indies elected by following{' '}
        <Link href="/candidates" passHref>
          <a id="good-certified" className="underline">
            Good Certified candidates
          </a>
        </Link>
      </Content>
      <Grid container spacing={4}>
        {(homepageCandidates || []).map((candidate) => (
          <Grid item xs={6} lg={4} key={candidate.id}>
            <CandidatesRoundPreview candidate={candidate} />
          </Grid>
        ))}
      </Grid>
      <More className="text-center">
        <Link href="/candidates" passHref>
          <a id="see-more-candidates">See More Candidates</a>
        </Link>
      </More>
    </Wrapper>
  );
};

export default CandidatesSection;
