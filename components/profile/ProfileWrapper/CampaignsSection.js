/**
 *
 * CampaignSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import { Body19 } from '/components/shared/typogrophy';
import CandidateCard from '/components/shared/CandidateCard';
import { GrayText } from './index';

const Wrapper = styled.section`
  margin-top: 36px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    margin-top: 64px;
  }
`;

const MeetLink = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    margin-top: 24px;
  }
`;

const Feedback = styled.div`
  display: block;
  margin-top: 48px;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    display: none;
  }
`;

function CampaignSection({ userSupported }) {
  return (
    <Wrapper>
      <Body19>
        <strong>Campaigns you’re supporting</strong>
        <br />
        <GrayText>These are the candidates you endorse</GrayText>
        {userSupported && userSupported.length > 0 ? (
          <Grid container spacing={1} style={{ marginTop: '24px' }}>
            {userSupported.map(candidate => (
              <Grid item xs={12} sm={6} lg={4} key={candidate.id}>
                <CandidateCard candidate={candidate} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Link href="candidates" passHref>
            <a>
              <MeetLink>Meet the candidates</MeetLink>
            </a>
          </Link>
        )}
        <a href="mailto:ask@goodparty.org?subject=Feedback%20or%20Suggestion">
          <Feedback>Give feedback or suggestions</Feedback>
        </a>
      </Body19>
    </Wrapper>
  );
}

CampaignSection.propTypes = {
  userSupported: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default CampaignSection;
