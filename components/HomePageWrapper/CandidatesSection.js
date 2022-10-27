import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { HomePageContext } from '/containers/HomePage';

import CandidateCard from '../shared/CandidateCard';

const Wrapper = styled.section`
  padding: 20px 0 60px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding-top: 60px;
  }
`;

const H2 = styled.h2`
  font-size: 21px;
  font-weight: 400;

  margin: 0 0 18px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 24px;
    margin: 110px 0 30px;
  }
`;

const More = styled.div`
  margin-top: 48px;
  font-size: 24px;
  font-weight: 900;
  text-decoration: underline;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 85px;
    margin-bottom: 170px;
  }
`;

const CandidatesSection = () => {
  const { homepageCandidates } = useContext(HomePageContext);
  return (
    <Wrapper>
      <H2 data-cy="home-candidates-title">
        Find <u>Good Party Certified</u> candidates who pledge to be{' '}
        <strong>Independent, People Powered and Anti-Corruption</strong>
      </H2>

      <Grid container spacing={8} alignItems="stretch">
        {(homepageCandidates || []).map((candidate) => (
          <Grid item xs={12} md={6} lg={4} key={candidate.id}>
            <CandidateCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
      <More className="text-center">
        <Link href="/candidates" passHref>
          <a id="see-more-candidates" data-cy="see-more-link">
            See More Candidates
          </a>
        </Link>
      </More>
    </Wrapper>
  );
};

export default CandidatesSection;
