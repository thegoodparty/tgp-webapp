import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import RegisterBannerContainer from '/containers/shared/RegisterBannerContainer';
import AdminMenu from '/components/admin/AdminMenu';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import FeedbackContainer from '/containers/shared/FeedbackContainer';

const NavWrapper = ({ pathname, user, trackShareCallback, purpleNav }) => (
  <>
    <Hidden smDown>
      <DesktopHeader
        user={user}
        pathname={pathname}
        trackShareCallback={trackShareCallback}
        purpleNav={purpleNav}
      />
      <RegisterBannerContainer />
      <FeedbackContainer />
    </Hidden>
    <Hidden mdUp>
      <MobileHeader user={user} purpleNav={purpleNav} />
    </Hidden>
  </>
);

NavWrapper.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  trackShareCallback: PropTypes.func,
  purpleNav: PropTypes.bool,
};

export default NavWrapper;
