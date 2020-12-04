/* eslint-disable import/no-unresolved */
/**
 *
 * LoginConfirmPage
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

import LoginConfirmWrapper from 'components/you/LoginConfirmWrapper';

export function LoginConfirmPage({
  userState,
  dispatch,
  confirmLoginCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { loginEmail } = userState;
  useEffect(() => {
    if (!loginEmail) {
      dispatch(push('/login'));
    }
  }, []);

  const childProps = {
    confirmLoginCallback,
    email: loginEmail,
  };
  return (
    <div>
      <Head>
        <title data-cy="page-title">Login Code Confirmation</title>
        <meta name="description" content="Login Code Confirmation" />
      </Head>
      <LoginConfirmWrapper {...childProps} />
    </div>
  );
}

LoginConfirmPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  confirmLoginCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    confirmLoginCallback: (email, code) => {
      dispatch(userActions.confirmEmailAction(email, code, true));
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
)(LoginConfirmPage);
