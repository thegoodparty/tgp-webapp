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
import ActiveEndorsePanel from './ActiveEndorsePanel';

function CandidatePortalHomeWrapper() {
  const { role, candidate, stats } = useContext(CandidatePortalHomePageContext);
  return (
    <PortalPageWrapper
      role={role}
      title={`Analytics Dashboard for ${candidate.firstName} ${candidate.lastName}`}
    >
      {stats?.totals?.impressions > 0 ? (
        <ActiveEndorsePanel />
      ) : (
        <EndorsePanel />
      )}
      <CampaignPanel />
      <GoalsPanel />
    </PortalPageWrapper>
  );
}

export default CandidatePortalHomeWrapper;
