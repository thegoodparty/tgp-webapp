/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React, { useContext, useState } from 'react';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPageWrapper from '../shared/PortalPageWrapper';

import EndorsePanel from './EndorsePanel';
import CampaignPanel from './CampaignPanel';
import GoalsPanel from './GoalsPanel';
import ActiveEndorsePanel from './ActiveEndorsePanel';

function CandidatePortalHomeWrapper() {
  const { role, candidate, stats, loadStatsCallback } = useContext(
    CandidatePortalHomePageContext,
  );
  const [range, setRange] = useState(7);
  const handleChangeRange = (newRange) => {
    setRange(newRange);
    loadStatsCallback(newRange, candidate.id);
  };
  return (
    <PortalPageWrapper
      role={role}
      title={`Analytics Dashboard for ${candidate.firstName} ${candidate.lastName}`}
    >
      {stats?.totals?.impressions > 0 ? (
        <ActiveEndorsePanel range={range} onChangeRange={handleChangeRange} />
      ) : (
        <EndorsePanel />
      )}
      <CampaignPanel range={range} onChangeRange={handleChangeRange} />
      <GoalsPanel />
    </PortalPageWrapper>
  );
}

export default CandidatePortalHomeWrapper;
