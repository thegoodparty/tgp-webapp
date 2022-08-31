/**
 *
 * CampaignProgress
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { achievementsHelper } from '/helpers/achievementsHelper';

import { kFormatter, numberFormatter } from '/helpers/numberHelper';
import { CandidateContext } from '/containers/CandidatePage';

import GoalsChart from 'components/candidate-portal/CandidatePortalHomeWrapper/GoalsChart';
import Row from 'components/shared/Row';

const Wrapper = styled.section`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #fff;
  padding: 24px 24px 18px;
  position: relative;
  z-index: 10;
`;

const ChartStats = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
`;

const Space = styled.div`
  width: 80px;
`;

const Sub = styled.div`
  font-size: 14px;
`;

const Progress = styled.div`
  font-weight: 900;
`;

const This = styled.div`
  font-size: 14px;
  color: #9d9d9d;
`;

function CampaignProgress() {
  const router = useRouter();
  const { supportCount, candidate, followers } = useContext(CandidateContext);
  const { likelyVoters, votesNeeded } = candidate;
  let voters = likelyVoters;
  if (followers?.thisWeek > likelyVoters) {
    voters = followers.thisWeek;
  }
  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between', marginBottom: '48px' }}>
        <Progress data-cy="campaign-progrsss-title">Campaign Progress</Progress>
        <Link href={`${router.asPath}?article=4KOzae6PB45c9GQY9Xi9UX`} passHref>
          <a className="no-underline" data-cy="campaign-progress-ref">
            <This>What`s this?</This>
          </a>
        </Link>
      </Row>
      <GoalsChart candidate={candidate} followers={followers} />
      <ChartStats>
        <div className="text-right" data-cy="campaign-likely-voters">
          🗳 {kFormatter(voters)}
          <Sub>Likely Voters</Sub>
        </div>
        <Space />
        <div  data-cy="campaign-needed-votes">
          {kFormatter(votesNeeded)} 🎉
          <Sub>needed to win </Sub>
        </div>
      </ChartStats>

    </Wrapper>
  );
}

export default CampaignProgress;
