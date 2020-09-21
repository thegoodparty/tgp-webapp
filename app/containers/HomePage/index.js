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
import reducer from './reducer';
import saga from './saga';
import makeSelectHomePage from './selectors';
import HomePageWrapper from 'components/home/HomePageWrapper';
import homeActions from './actions';

export function HomePage({
  dispatch,
  homeState,
  loadChallengersCallback
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const { goodChallengers } = homeState;
  const childProps = {
    goodChallengers,
  };
  useEffect(() => {
    loadChallengersCallback();
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
  loadChallengersCallback: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  homeState: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadChallengersCallback: () =>
      dispatch(homeActions.loadChallengers()),
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
