import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { PurpleButton } from '../shared/buttons';
import CandidateMiniCard from './CandidateMiniCard';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 24px auto 0;
  padding: 48px 0;
  background: url('https://assets.goodparty.org/homepage/campaign-bg.svg')
    center center no-repeat;
  background-size: contain;

  .hidden {
    opacity: 0;
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CandidatesWrapper = styled.div`
  padding: 0 48px;
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: -120px auto 0;
`;

const SeeMoreWrapper = styled.div`
  width: 90%;
  max-width: 300px;
  margin: 24px auto 0;
`;

const FeaturedCampaigns = ({ homepageCandidates }) => {
  return (
    <>
      <Wrapper>
        <img
          src="https://assets.goodparty.org/homepage/campaign-bg.svg"
          className="hidden"
        />
        <TextWrapper> Featured Campaigns</TextWrapper>
      </Wrapper>
      <CandidatesWrapper>
        <Grid container spacing={3}>
          {homepageCandidates.map(candidate => (
            <>
              <Grid xs={12} md={4} key={candidate.id}>
                <CandidateMiniCard candidate={candidate} />
              </Grid>
              <Grid xs={12} md={4} key={candidate.id}>
                <CandidateMiniCard candidate={candidate} />
              </Grid>
              <Grid xs={12} md={4} key={candidate.id}>
                <CandidateMiniCard candidate={candidate} />
              </Grid>
            </>
          ))}
        </Grid>
        <br />
        <SeeMoreWrapper>
          <PurpleButton fullWidth className="outline">
            See More
          </PurpleButton>
        </SeeMoreWrapper>
      </CandidatesWrapper>
    </>
  );
};

FeaturedCampaigns.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default FeaturedCampaigns;
