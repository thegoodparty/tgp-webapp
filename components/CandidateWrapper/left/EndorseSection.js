/**
 *
 * EndorseSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { achievementsHelper } from '../../../helpers/achievementsHelper';

import { numberFormatter } from '/helpers/numberHelper';
import { CandidateContext } from '/containers/CandidatePage';

import SupportersProgressBar from './SupportersProgressBar';

const Wrapper = styled.section``;

function EndorseSection() {
  const { supportCount, candidate } = useContext(CandidateContext);
  const achievements = achievementsHelper(supportCount);
  const { color } = candidate;
  const brightColor = color?.color ? color.color : '#000';
  return (
    <Wrapper>
      <div>
        <div style={{ paddingLeft: '10px' }}>
          <strong>
            {supportCount} {supportCount === 1 ? 'person' : 'people'} endorsed.
          </strong>{' '}
          Let&apos;s get to {numberFormatter(achievements.nextStep)}!
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
      </div>
    </Wrapper>
  );
}

export default EndorseSection;
