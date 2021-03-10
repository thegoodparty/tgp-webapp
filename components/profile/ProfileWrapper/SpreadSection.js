/**
 *
 * SpreadSection
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
  margin-top: 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
  }
`;

const UniqueLink = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 12px;
  }
`;

const Feedback = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    margin-top: 50px;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

function SpreadSection({ user }) {
  const uniqueUrl = uuidUrl(user);
  const cleanUrl = uniqueUrl?.replace('https://', '');
  return (
    <Wrapper>
      <Body19>
        <strong>Spread the word</strong>
        <br />
        <GrayText>This is your unique link</GrayText>
        <UniqueLink>{cleanUrl}</UniqueLink>
        <Feedback>Give feedback or suggestions</Feedback>
      </Body19>
    </Wrapper>
  );
}

SpreadSection.propTypes = {
  user: PropTypes.object,
};

export default SpreadSection;
