/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React, { useContext } from 'react';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPageWrapper from '../shared/PortalPageWrapper';

import EndorsePanel from './EndorsePanel';
import CampaignPanel from './CampaignPanel';
import GoalsPanel from './GoalsPanel';

function CandidatePortalHomeWrapper() {
  const { role, candidate } = useContext(CandidatePortalHomePageContext);
  return (
    <PortalPageWrapper
      role={role}
      title={`Analytics Dashboard for ${candidate.firstName} ${candidate.lastName}`}
    >
      <EndorsePanel />
      <CampaignPanel />
      <GoalsPanel />
    </PortalPageWrapper>
  );
}

export default CandidatePortalHomeWrapper;
