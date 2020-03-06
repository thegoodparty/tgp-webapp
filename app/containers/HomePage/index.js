/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import HomePageWrapper from 'components/HomePageWrapper';

function HomePage() {
  return (
    <div>
      <Helmet>
        <title>The Good Party</title>
        <meta name="description" content="The Good Party" />
      </Helmet>
      <HomePageWrapper />
    </div>
  );
}

HomePage.propTypes = {
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
)(HomePage);
