/**
 *
 * TopSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import { Body13, H1 } from '../../shared/typogrophy';

import Breadcrumbs from '../../shared/Breadcrumbs';
import ImageSection from './ImageSection';
import { PurpleButton } from '../../shared/buttons';

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
const Action = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  padding-left: 24px;
`;
function TopSection({ user, signoutCallback, uploadImageCallback }) {
  return (
    <Wrapper>
      <Breadcrumbs links={breadcrumbsLinks} />
      <Row>
        <StyledH1>Settings</StyledH1>
        <Action onClick={signoutCallback}>Sign Out</Action>
      </Row>
      <Hidden mdUp>
        <ImageSection
          user={user}
          mode="top"
          uploadImageCallback={uploadImageCallback}
        />
      </Hidden>
    </Wrapper>
  );
}

TopSection.propTypes = {
  user: PropTypes.object,
  signoutCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
};

export default TopSection;
