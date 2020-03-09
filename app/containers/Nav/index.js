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

import NavWrapper from 'components/shared/navigation/NavWrapper';
import makeSelectUser from 'containers/you/YouPage/selectors';
import userActions from 'containers/you/YouPage/actions';
import { makeSelectLocation } from '../App/selectors';

export function Nav({ userState, dispatch, locationState }) {
  const [user, setUser] = React.useState(0);
  const stateUser = userState.user;
  const { pathname } = locationState;

  useEffect(() => {
    if (!stateUser) {
      dispatch(userActions.loadUserFromCookieAction());
    } else {
      setUser(stateUser);
    }
  }, [stateUser]);

  const childProps = {
    pathname,
    user,
  };

  return <NavWrapper {...childProps} />;
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.string,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Nav);
