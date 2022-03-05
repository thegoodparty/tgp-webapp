/**
 *
 * HeroSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { FontH2 } from '../../shared/typogrophy';
import YouTubeLazyPlayer from '../../shared/YouTubeLazyPlayer';
import { daysTill } from '../../../helpers/dateHelper';

const Wrapper = styled.section`
  margin: 48px 0;
  position: relative;
`;

const DaysUntil = styled.div`
  display: none;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 12px 18px;
  }
`;

const StyledFontH2 = styled(FontH2)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding-right: 120px;
  }
`;

const Days = styled.div`
  font-size: 35px;
  font-weight: 900;
`;

function HeroSection() {
  const { candidate } = useContext(CandidateContext);
  const { headline, heroVideo, raceDate } = candidate;
  console.log('rr', raceDate);
  return (
    <Wrapper>
      <DaysUntil>
        <Days>{daysTill(raceDate)}</Days>
        Days until
        <br />
        election
      </DaysUntil>
      <StyledFontH2>
        <span role="img" aria-label="Megaphone">
          📣
        </span>{' '}
        {headline}
      </StyledFontH2>
      <YouTubeLazyPlayer id={heroVideo} />
    </Wrapper>
  );
}

export default HeroSection;
