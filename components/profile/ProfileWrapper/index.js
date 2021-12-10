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
import CampaignSection from './CampaignsSection';
import IncompleteProfileBanner from './IncompleteProfileBanner';
import ProfileTabs from './ProfileTabs';
import UpdatesSection from './UpdatesSection';

export const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

export const GrayText = styled.span`
  color: ${({ theme }) => theme.colors.gray6};
  font-weight: 400;
`;

const ContentWrpper = styled(MaxWidth)`
  padding: 24px 8px 48px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 32px 20px 64px;
  }
`;

function ProfileWrapper({ user, userSupported, updates }) {
  return (
    <PageWrapper isFullWidth>
      <TopSection user={user} />
      <IncompleteProfileBanner user={user} />
      <ContentWrpper>
        <ProfileTabs />
        <CampaignSection userSupported={userSupported} />
        <UpdatesSection updates={updates} />
      </ContentWrpper>
    </PageWrapper>
  );
}

ProfileWrapper.propTypes = {
  user: PropTypes.object,
  userSupported: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  updates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ProfileWrapper;
