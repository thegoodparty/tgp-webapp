/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { createStructuredSelector } from 'reselect';

import HomePageWrapper from 'components/intro/HomePageWrapper';

function HomePage({ userState, dispatch }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { user } = userState;
  useEffect(() => {
    const { pathname } = window.location;
    if (user && pathname !== '/home') {
      dispatch(push('/party'));
    } else {
      dispatch(userActions.loadUserFromCookieAction());
      dispatch(userActions.generateUuidAction());
    }
  }, [userState]);

  return (
    <div>
      <Head>
        <title>The Good Party</title>
        <meta name="description" content="The Good Party" />
      </Head>
      <HomePageWrapper />
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginCallback: email => {
      dispatch(userActions.loginAction(email));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
