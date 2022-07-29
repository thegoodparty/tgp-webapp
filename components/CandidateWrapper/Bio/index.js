/**
 *
 * Bio
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { CandidateContext } from '/containers/CandidatePage';
import TopIssues from '../Feed/TopIssues';
import YouTubeLazyPlayer from '../../shared/YouTubeLazyPlayer';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { candidateColor } from '../../../helpers/candidatesHelper';

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

function Bio() {
  const { candidate } = useContext(CandidateContext);
  const { headline, heroVideo, about, color, website } = candidate;
  const brightColor = candidateColor(candidate);
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={9}>
          <Title>{headline}</Title>
          <YouTubeLazyPlayer id={heroVideo} />
          <Title style={{ margin: '36px 0 12px' }}>About the candidate</Title>
          <div dangerouslySetInnerHTML={{ __html: about }} />
          <br />
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="no-underline"
            >
              <BlackButton
                className="outlined"
                style={{ color: brightColor, borderColor: brightColor }}
              >
                <InnerButton>Visit Candidate Website</InnerButton>
              </BlackButton>
            </a>
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          <TopIssues />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Bio;
