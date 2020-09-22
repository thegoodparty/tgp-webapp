/**
 *
 * HomePage
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import HomePageWrapper from 'components/home/HomePageWrapper';

import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import homeActions from './actions';

export function HomePage({ dispatch, homeState }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const { goodChallengers } = homeState;
  const childProps = {
    goodChallengers,
  };
  useEffect(() => {
    dispatch(homeActions.loadChallengersAction());
  }, []);
  return (
    <div>
      <Helmet>
        <title>The Good Party</title>
        <meta name="description" content="The Good Party" />
      </Helmet>
      <HomePageWrapper {...childProps} />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homeState: makeSelectHomePage(),
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

export default compose(
  withConnect,
  memo,
)(HomePage);
