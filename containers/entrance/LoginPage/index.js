/**
 *
 * LoginPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-next-router';
import { createStructuredSelector } from 'reselect';

import { getExperiment } from '/helpers/optimizeHelper';
import userActions from '/containers/you/YouPage/actions';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';

import LoginWrapper from '/components/entrance/LoginWrapper';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';

import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function LoginPage({
  dispatch,
  loginCallback,
  socialLoginCallback,
  socialLoginFailureCallback,
  twitterButtonCallback,
  modalMode,
}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    const user = getUserCookie();
    if (user) {
      dispatch(push('/'));
    }
  }, []);

  const childProps = {
    loginCallback,
    socialLoginCallback,
    socialLoginFailureCallback,
    twitterButtonCallback,
    modalMode,
  };

  return (
    <div>
      {!modalMode && (
        <TgpHelmet
          title="Sign into your account | Good Party"
          description="Login to your Good Party account"
        />
      )}
      <LoginWrapper {...childProps} />
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginPage: PropTypes.object,
  loginCallback: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  forgotPasswordCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
  modalMode: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginCallback: (value, valueType) => {
      dispatch(actions.loginAction(value, valueType));
    },
    socialLoginCallback: (user) => {
      dispatch(actions.socialLoginAction(user));
    },
    socialLoginFailureCallback: () => {
      dispatch(snackbarActions.showSnakbarAction('Sign in error', 'error'));
    },
    twitterButtonCallback: () => {
      dispatch(userActions.twitterLoginAction());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
