/**
 *
 * Nav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import NavWrapper from 'components/shared/navigation/NavWrapper';
import makeSelectZipFinderPage from '../intro/ZipFinderPage/selectors';

export function Nav({ dispatch, pathname }) {
  const childProps = {
    pathname,
  };
  console.log(pathname)

  return <NavWrapper {...childProps} />;
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pathname: PropTypes.string,
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
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
