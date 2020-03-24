/**
 *
 * Nav
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';

import NavWrapper from 'components/shared/navigation/NavWrapper';
import userActions from 'containers/you/YouPage/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import { getCookie } from 'helpers/cookieHelper';

export function Nav({
  userState,
  dispatch,
  locationState,
  navigateCallback,
  hideMobileNav = false,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const [user, setUser] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const stateUser = userState.user;
  const { pathname } = locationState;

  useEffect(() => {
    if (!stateUser) {
      dispatch(userActions.loadUserFromCookieAction());
    } else {
      setUser(stateUser);
      setZipCode(stateUser.zipCode);
    }
  }, [stateUser]);

  const childProps = {
    pathname,
    user,
    zipCode,
    navigateCallback,
    hideMobileNav,
  };

  return <NavWrapper {...childProps} />;
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
  userState: PropTypes.object,
  navigateCallback: PropTypes.func,
  hideMobileNav: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
  userState: makeSelectUser(),
});

/* eslint-disable prefer-destructuring */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    navigateCallback: (screen, user, zipCode) => {
      if (screen === '/elections') {
        alert('elections');
        let zip;
        if (zipCode) {
          alert('elections1');
          zip = zipCode.zip;
        } else if (user && user.zipCode) {
          alert('elections2');
          zip = user.zipCode.zip;
          alert('election3');
        } else {
          alert('elections4');
          let cookieZip = getCookie('zip');
          alert('elections5');
          if (cookieZip) {
            alert('elections6 ' + cookieZip);
            alert('elections6b ' + typeof cookieZip);
            cookieZip = JSON.parse(cookieZip);
            alert('elections7');
            zip = cookieZip.zip;
            alert('election8');
          }
          alert('elections9');
        }
        alert('elections10');
        if (zip) {
          alert('found 11zip');
          dispatch(push(`/elections/district/${zip}`));
        } else {
          alert('12 no zip');
          dispatch(push('/intro/zip-finder'));
        }
        alert('elections13');
      } else {
        dispatch(push(screen));
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Nav);
