/**
 *
 * EndorseSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { achievementsHelper } from '/helpers/achievementsHelper';

import { kFormatter, numberFormatter } from '/helpers/numberHelper';
import { CandidateContext } from '/containers/CandidatePage';

import SupportersProgressBar from './SupportersProgressBar';
import GoalsChart from '../../candidate-portal/CandidatePortalHomeWrapper/GoalsChart';
import SupportButton from './SupportButton';
import Row from '../../shared/Row';

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

function EndorseSection() {
  const router = useRouter();
  const { supportCount, candidate } = useContext(CandidateContext);
  const achievements = achievementsHelper(supportCount);
  const { color, likelyVoters, votesNeeded } = candidate;
  const brightColor = color?.color ? color.color : '#000';
  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between', marginBottom: '48px' }}>
        <Progress>Campaign Progress</Progress>
        <Link href={`${router.asPath}?article=4KOzae6PB45c9GQY9Xi9UX`} passHref>
          <a className="no-underline">
            <This>What`s this?</This>
          </a>
        </Link>
      </Row>
      <GoalsChart candidate={candidate} />
      <ChartStats>
        <div className="text-right">
          🗳 {kFormatter(likelyVoters)}
          <Sub>Likely Voters</Sub>
        </div>
        <Space />
        <div>
          {kFormatter(votesNeeded)} 🎉
          <Sub>needed to win</Sub>
        </div>
      </ChartStats>
      <div>
        <div data-cy="endorse-supportcount-wrapper">
          <strong data-cy="endorse-supportcount">
            {supportCount} endorsement{supportCount === 1 ? '' : 's'} so far.
          </strong>
        </div>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={achievements.nextStep}
          peopleSoFar={supportCount}
          fullWidth
          showSuffix={false}
          withAchievement
          color={brightColor}
        />
        <div style={{ height: '26px' }}>&nbsp;</div>
        <SupportButton />
      </div>
    </Wrapper>
  );
}

export default EndorseSection;
