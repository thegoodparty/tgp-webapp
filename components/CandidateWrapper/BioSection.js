/**
 *
 * Bio
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { candidateColor } from '/helpers/candidatesHelper';

import YouTubeLazyPlayer from '../shared/YouTubeLazyPlayer';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Wrapper = styled.section``;

const Title = styled.h3`
  font-size: 21px;
  font-weight: 900;
  margin: 0 0 28px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 24px;
  }
`;

function BioSection() {
  const { candidate } = useContext(CandidateContext);
  const { headline, heroVideo, about, color, website } = candidate;
  const brightColor = candidateColor(candidate);
  return (
    <Wrapper>
      <Title data-cy="bio-title">{headline}</Title>
      <YouTubeLazyPlayer id={heroVideo} />
      <Title style={{ margin: '36px 0 12px' }} data-cy="bio-about">
        About the candidate
      </Title>
      <div dangerouslySetInnerHTML={{ __html: about }} />
      <br />
      {website && (
        <>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline"
            id="candidate-website"
            data-cy="bio-website"
          >
            Visit Candidate Website
          </a>
          <br />
          <br />
          &nbsp;
        </>
      )}
    </Wrapper>
  );
}

export default BioSection;
