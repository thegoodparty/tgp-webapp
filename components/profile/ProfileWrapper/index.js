/**
 *
 * ProfileWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import PageWrapper from 'components/shared/PageWrapper';
import TopSection from './TopSection';
import PeopleSection from './PeopleSection';
import SpreadSection from './SpreadSection';
import CampaignSection from './CampaignsSection';

export const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixelsPixels.contentMax};
  margin: 0 auto;
`;

export const GrayText = styled.span`
  color: ${({ theme }) => theme.colors.gray6};
  font-weight: 400;
`;

const ContentWrpper = styled(MaxWidth)`
  padding: 24px 20px 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixelsPixels.md}) {
    padding: 32px 20px 64px;
  }
`;

function ProfileWrapper({ user, crewPreview, crewCount, userSupported }) {
  return (
    <PageWrapper purple isFullWidth>
      <TopSection user={user} />
      <ContentWrpper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PeopleSection
              user={user}
              crewPreview={crewPreview}
              crewCount={crewCount}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SpreadSection user={user} />
          </Grid>
        </Grid>
        <CampaignSection userSupported={userSupported} />
      </ContentWrpper>
    </PageWrapper>
  );
}

ProfileWrapper.propTypes = {
  user: PropTypes.object,
  crewPreview: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  crewCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  userSupported: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ProfileWrapper;
