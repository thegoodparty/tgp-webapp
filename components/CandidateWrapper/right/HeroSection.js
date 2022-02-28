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

const Wrapper = styled.section`
  margin: 48px 0;
  position: relative;
`;

const DaysUntil = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.purple};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 12px 18px;
`;

const Days = styled.div`
  font-size: 35px;
  font-weight: 900;
`;

function HeroSection() {
  const { candidate } = useContext(CandidateContext);
  const { headline, heroVideo } = candidate;
  return (
    <Wrapper>
      <DaysUntil>
        <Days>62</Days>
        Days until
        <br />
        election
      </DaysUntil>
      <FontH2>
        <span role="img" aria-label="Megaphone">
          📣
        </span>{' '}
        {headline}
      </FontH2>
      <YouTubeLazyPlayer id={heroVideo} />
    </Wrapper>
  );
}

export default HeroSection;
