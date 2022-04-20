import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';

import { PurpleButton } from '../shared/buttons';
import CandidateCard from '../shared/CandidateCard';
import { HomePageContext } from '../../containers/HomePage';
import BlackButton from '../shared/buttons/BlackButton';
import MaxWidth from '/components/shared/MaxWidth';

const Section = styled.section`
  padding: 60px 16px;
`;

const H3 = styled.h3`
  margin: 0 0 45px;
  font-size: 28px;
  line-height: 53px;
  font-weight: 900;
  text-align: center;
`;

const SeeMoreWrapper = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 24px auto 0;
`;

const FeaturedCampaigns = ({ featuredCandidates }) => {
  const context = useContext(HomePageContext);
  let candidates = [];
  if (featuredCandidates) {
    candidates = featuredCandidates;
  } else {
    candidates = context.homepageCandidates;
  }

  return (
    <Section>
      <MaxWidth>
        <H3>Featured Campaigns</H3>
        <Grid container spacing={3}>
          {candidates.map((candidate) => (
            <Grid item xs={12} md={6} lg={4} key={candidate.id}>
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        </Grid>
        <br />
        <SeeMoreWrapper>
          <Link href="/candidates" passHref>
            <a data-cy="campaigns-more-link">
              <BlackButton fullWidth className="outlined pill">
                See More
              </BlackButton>
            </a>
          </Link>
        </SeeMoreWrapper>
      </MaxWidth>
    </Section>
  );
};

FeaturedCampaigns.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default FeaturedCampaigns;
