/**
 *
 * ImageSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BsLock } from 'react-icons/bs';

import UserAvatar from '../../shared/UserAvatar';
import { Body13, H1, H2 } from '../../shared/typogrophy';

import Breadcrumbs from '../../shared/Breadcrumbs';
import { fullFirstLastInitials } from '../../../helpers/userHelper';

const Wrapper = styled.section`
  padding: 24px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 24px;
  }
`;

const Row = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
  }

  &.top {
    display: flex;
    align-items: center;
  }
`;

const Privacy = styled.div`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.colors.purple4};
  padding: 38px;
  border-radius: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray6};
`;

function ImageSection({ user, mode = 'desktop' }) {
  return (
    <Wrapper>
      {(mode === 'top' || mode === 'desktop') && (
        <Row className={mode}>
          <UserAvatar user={user} size="large" />
          <H2 style={{ marginLeft: '12px' }}>
            {fullFirstLastInitials(user.name)}
          </H2>
        </Row>
      )}
      {(mode === 'bottom' || mode === 'desktop') && (
        <Privacy>
          <BsLock size={24} color="#919191" />
          <br />
          Good Party doesn&apos;t sell or share
          <br />
          your personal data
        </Privacy>
      )}
    </Wrapper>
  );
}

ImageSection.propTypes = {
  user: PropTypes.object,
  mode: PropTypes.string,
};

export default ImageSection;
