/**
 *
 * SpreadSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { uuidUrl } from '/helpers/userHelper';

import { Body, Body13 } from '../../shared/typogrophy';
// import { GrayText } from '../ProfileWrapper';

const Wrapper = styled.section`
  margin-top: 48px;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 16px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 0;
  }
`;

const UniqueLink = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 12px;
  }
`;

function SpreadSection({ user }) {
  const [copied, setCopied] = useState(false);
  const uniqueUrl = uuidUrl(user);
  const cleanUrl = uniqueUrl?.replace('https://', '');
  return (
    <Wrapper>
      <Body>
        <strong data-cy="spread-title">Spread the word</strong>
        <br />
        This is your unique link
        <UniqueLink>
          <CopyToClipboard text={uniqueUrl} onCopy={() => setCopied(true)}>
            <span>{cleanUrl}</span>
          </CopyToClipboard>
        </UniqueLink>
        {copied && <Body13>Link copied to clipboard</Body13>}
      </Body>
    </Wrapper>
  );
}

SpreadSection.propTypes = {
  user: PropTypes.object,
};

export default SpreadSection;
