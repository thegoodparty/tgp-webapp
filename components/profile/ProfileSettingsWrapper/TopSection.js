/**
 *
 * TopSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';

import Link from 'next/link';

import UserAvatar from '../../shared/UserAvatar';
import { Body13, H1 } from '../../shared/typogrophy';

import Breadcrumbs from '../../shared/Breadcrumbs';
import ImageSection from './ImageSection';

const Wrapper = styled.section`
  padding: 32px 0 0;
`;

const StyledH1 = styled(H1)`
  font-size: 23px;
  margin-top: 24px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const breadcrumbsLinks = [
  { href: '/profile', label: 'Your Profile' },
  {
    label: 'Settings',
  },
];

function TopSection({ user, signoutCallback }) {
  return (
    <Wrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Row>
        <StyledH1>Settings</StyledH1>
        <Body13 onClick={signoutCallback}>
          <span className="purple-text">Sign Out</span>
        </Body13>
      </Row>
      <Hidden mdUp>
        <ImageSection user={user} mode="top" />
      </Hidden>
    </Wrapper>
  );
}

TopSection.propTypes = {
  user: PropTypes.object,
  signoutCallback: PropTypes.func,
};

export default TopSection;
