import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import RegisterBannerContainer from '/containers/shared/RegisterBannerContainer';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import FeedbackContainer from '/containers/shared/FeedbackContainer';

export const SmOnly = styled.div`
  display: block;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const MdUpOnly = styled.div`
  display: none;
  @media only screen and (min-width: 768px) {
    display: block;
  }
`;

const NavWrapper = ({ pathname, user, trackShareCallback, purpleNav }) => (
  <>
    <MdUpOnly>
      <DesktopHeader
        user={user}
        pathname={pathname}
        trackShareCallback={trackShareCallback}
        purpleNav={purpleNav}
      />
      <RegisterBannerContainer />
      <FeedbackContainer />
    </MdUpOnly>
    <SmOnly>
      <MobileHeader user={user} purpleNav={purpleNav} />
    </SmOnly>
  </>
);

NavWrapper.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  trackShareCallback: PropTypes.func,
  purpleNav: PropTypes.bool,
};

export default NavWrapper;
