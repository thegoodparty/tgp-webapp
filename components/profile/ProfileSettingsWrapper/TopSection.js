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
import MaxWidth from '../ProfileWrapper/MaxWidth';

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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 24px;
  }
`;

function TopSection({ user }) {
  return (
    <Wrapper>
      <MaxWidth>
        <TopRowText>
          <StyledH1>{user.name}</StyledH1>
        </TopRowText>
      </MaxWidth>
    </Wrapper>
  );
}

TopSection.propTypes = {
  user: PropTypes.object,
};

export default TopSection;
