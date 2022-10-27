/**
 *
 * CampaignApplicationsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ProfilePageWrapper from '../shared/ProfilePageWrapper';

import CampaignStaff from './CampaignStaff';
import ApplicationSection from './ApplicationSection';

function CampaignApplicationsWrapper({ isTest = false }) {
  const Content = () => (
    <>
      <CampaignStaff />
      <ApplicationSection />
    </>
  );
  if(isTest) {
    return <Content />;
  }
  return (
    <ProfilePageWrapper>
      <Content />
    </ProfilePageWrapper>
  );
}

CampaignApplicationsWrapper.propTypes = {
  createApplicationCallback: PropTypes.func,
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  deleteApplicationCallback: PropTypes.func,
};

export default CampaignApplicationsWrapper;
