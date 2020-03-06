/**
 *
 * SplashPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import SplashWrapper from 'components/intro/SplashWrapper';

function SplashPage() {
  return (
    <div>
      <Helmet>
        <title>Splash | TGP</title>
        <meta name="description" content="Description of Splash" />
      </Helmet>
      <SplashWrapper />
    </div>
  );
}

SplashPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SplashPage);
