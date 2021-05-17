import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import RegisterBannerContainer from 'containers/shared/RegisterBannerContainer';
import AdminMenu from 'components/admin/AdminMenu';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const NavWrapper = ({ pathname, user, trackShareCallback }) => (
  <>
    <Hidden smDown>
      <DesktopHeader
        user={user}
        pathname={pathname}
        trackShareCallback={trackShareCallback}
      />
      <RegisterBannerContainer />
    </Hidden>
    <Hidden mdUp>
      <MobileHeader user={user} />
    </Hidden>

    {user?.isAdmin && <AdminMenu />}
  </>
);

NavWrapper.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  trackShareCallback: PropTypes.func,
};

export default NavWrapper;
