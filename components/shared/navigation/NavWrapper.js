import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@material-ui/core/Hidden';

import RegisterBannerContainer from '/containers/shared/RegisterBannerContainer';
import AdminMenu from '/components/admin/AdminMenu';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import FeedbackContainer from '/containers/shared/FeedbackContainer';

const NavWrapper = ({
  pathname,
  user,
  trackShareCallback,
  purpleNav,
  asCandidate,
  logoutAsCandidateCallback,
}) => (
  <>
    <Hidden smDown>
      <DesktopHeader
        user={user}
        pathname={pathname}
        trackShareCallback={trackShareCallback}
        purpleNav={purpleNav || asCandidate}
        asCandidate={asCandidate}
        logoutAsCandidateCallback={logoutAsCandidateCallback}
      />
      <RegisterBannerContainer />
    </Hidden>
    <Hidden mdUp>
      <MobileHeader
        user={user}
        purpleNav={purpleNav || asCandidate}
        asCandidate={asCandidate}
        logoutAsCandidateCallback={logoutAsCandidateCallback}
      />
    </Hidden>

    {user?.isAdmin && <AdminMenu />}
    {user?.isAdmin === false && user?.candidate && <AdminMenu candidateMode />}
    {user && <FeedbackContainer />}
  </>
);

NavWrapper.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  trackShareCallback: PropTypes.func,
  purpleNav: PropTypes.bool,
  asCandidate: PropTypes.bool,
  logoutAsCandidateCallback: PropTypes.func,
};

export default NavWrapper;
