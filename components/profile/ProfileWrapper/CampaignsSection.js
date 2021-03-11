/**
 *
 * CampaignSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { uuidUrl } from 'helpers/userHelper';

import { Body13, Body19, Body9, H1 } from '../../shared/typogrophy';
import { GrayText } from './index';

const Wrapper = styled.section`
  margin-top: 36px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 64px;
  }
`;

const MeetLink = styled.div`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 24px;
  }
`;

const Feedback = styled.div`
  display: block;
  margin-top: 48px;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

function CampaignSection({ user }) {
  return (
    <Wrapper>
      <Body19>
        <strong>Campaigns you’re supporting</strong>
        <br />
        <GrayText>These are the candidates you endorse</GrayText>
        <Link href="candidates" passHref>
          <a>
            <MeetLink>Meet the candidates</MeetLink>
          </a>
        </Link>
        <a href="mailto:ask@goodparty.org?subject=Feedback%20or%20Suggestion">
          <Feedback>Give feedback or suggestions</Feedback>
        </a>
      </Body19>
    </Wrapper>
  );
}

CampaignSection.propTypes = {
  user: PropTypes.object,
};

export default CampaignSection;
