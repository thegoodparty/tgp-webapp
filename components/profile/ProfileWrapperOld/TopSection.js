/**
 *
 * TopSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'next/link';

import UserAvatar from '../../shared/UserAvatar';
import { Body13, H1 } from '../../shared/typogrophy';
import MaxWidth from './MaxWidth';

const Wrapper = styled.section`
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.purple4};
  position: relative;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const StyledH1 = styled(H1)`
  font-size: 23px;
`;

const TopRowText = styled.div`
  margin-left: 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-left: 24px;
  }
`;

const Settings = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
  display: flex;
  align-items: center;
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    position: static;
  }
`;

function TopSection({ user }) {
  return (
    <Wrapper>
      <MaxWidth>
        <Row>
          <UserAvatar user={user} size="large" />
          <TopRowText>
            <StyledH1>{user.name}</StyledH1>
          </TopRowText>
        </Row>
      </MaxWidth>
    </Wrapper>
  );
}

TopSection.propTypes = {
  user: PropTypes.object,
};

export default TopSection;
