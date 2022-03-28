/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPageWrapper from '../shared/PortalPageWrapper';
import CampaignStats from './CampaignStats';

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

      {/*<Wrapper>*/}
      {/*  <div>*/}
      {/*    {candidate && (*/}
      {/*      <div className="text-left">*/}
      {/*        <Grid container spacing={3} alignItems="stretch">*/}
      {/*          <Grid item xs={12} md={6}>*/}
      {/*            Tip of the day*/}
      {/*          </Grid>*/}
      {/*          <Grid item xs={12} md={6}>*/}
      {/*            <CampaignStats stats={stats} loadStatsCallback={loadStatsCallback} />*/}
      {/*          </Grid>*/}
      {/*        </Grid>*/}
      {/*        <CampaignStats*/}
      {/*          stats={stats}*/}
      {/*          loadStatsCallback={loadStatsCallback}*/}
      {/*        />*/}
      {/*        <UpdatesWrapper>*/}
      {/*          <H3>Campaign Updates</H3>*/}
      {/*          <CandidatePortalUpdatesContainer*/}
      {/*            candidate={candidate}*/}
      {/*            pageLevel={false}*/}
      {/*          />*/}
      {/*        </UpdatesWrapper>*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</Wrapper>*/}
    </PortalPageWrapper>
  );
}

export default CandidatePortalHomeWrapper;
