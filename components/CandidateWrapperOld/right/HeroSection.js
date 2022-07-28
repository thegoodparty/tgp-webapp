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
import { dateUsHelper, daysTill } from '/helpers/dateHelper';

const Wrapper = styled.section`
  margin: 48px 0;
  position: relative;
`;

const Relative = styled.div`
  min-height: 80px;

  &.active {
    position: relative;
  }
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
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 12px 18px;

    &.with-video {
      top: -50px;
    }
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
  const { headline, heroVideo, raceDate, color } = candidate;
  const days = daysTill(raceDate);

  const brightColor = color?.color ? color.color : '#000';

  return (
    <Wrapper>
      <StyledFontH2>
        `<span role="img" aria-label="Megaphone">`
          📣
        </span>{' '}
        {headline}
      </StyledFontH2>
      <Relative className={heroVideo && 'active'}>
        {raceDate && (
          <DaysUntil
            style={{ backgroundColor: brightColor }}
            className={heroVideo && 'with-video'}
          >
            {days >= 0 ? (
              <>
                <Days data-cy="hero-days">{days}</Days>
                Day{days !== 1}s until
                <br />
                election
              </>
            ) : (
              <div className="text-center">
                <Days data-cy="hero-year">{new Date(raceDate).getFullYear()}</Days>
                <br />
                <strong>Archived</strong>
              </div>
            )}
          </DaysUntil>
        )}
        <YouTubeLazyPlayer id={heroVideo} />
      </Relative>
    </Wrapper>
  );
}

export default HeroSection;
