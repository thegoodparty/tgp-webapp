import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import CandidateCard from '../../shared/CandidateCard';
import BlackButton from '../../shared/buttons/BlackButton';
import MaxWidth from '../../shared/MaxWidth';

const Section = styled.section`
  padding: 60px 24px 0;

  &.no-padding {
    padding: 60px 0 0;
  }
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

const FeaturedCampaigns = ({ featuredCandidates, removePadding = false }) => {
  let candidates = featuredCandidates;
  if (!candidates || candidates.length === 0) {
    return <></>;
  }

  return (
    <Section className={removePadding && 'no-padding'}>
      <MaxWidth>
        <H3 data-cy="campaigns-title">Featured Campaigns</H3>
        <Grid container spacing={3}>
          {candidates.map((candidate) => (
            <Grid item xs={12} md={6} lg={4} key={candidate.id} data-cy="campaign-card">
              <CandidateCard candidate={candidate} />
            </Grid>
          ))}
        </Grid>
        <br />
        <SeeMoreWrapper>
          <Link href="/candidates" passHref>
            <a className="no-underline" data-cy="campaigns-more-link">
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
