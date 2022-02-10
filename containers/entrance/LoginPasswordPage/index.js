/**
 *
 * LoginPasswordPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import LoginPasswordWrapper from '/components/entrance/LoginPasswordWrapper';
import { getCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectLoginPasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function LoginPasswordPage({
  dispatch,
  loginCallback,
  forgotPasswordCallback,
}) {
  useInjectReducer({ key: 'loginPasswordPage', reducer });
  useInjectSaga({ key: 'loginPasswordPage', saga });

  const value = getCookie('login-value');
  const valueType = getCookie('login-value-type');
  useEffect(() => {
    if (!value) {
      dispatch(push('/login'));
    }
  }, []);

  const childProps = {
    value,
    valueType,
    loginCallback,
    forgotPasswordCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Enter your account password | Good Party"
        description="Enter your account password into login to your Good Party account"
      />
      <LoginPasswordWrapper {...childProps} />
    </div>
  );
}

LoginPasswordPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginCallback: PropTypes.func,
  forgotPasswordCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginPasswordPage: makeSelectLoginPasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginCallback: (email, password, valueType) => {
      dispatch(actions.loginAction(email, password, valueType));
    },
    forgotPasswordCallback: (value, valueType) => {
      dispatch(actions.forgotPasswordAction(value, valueType));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPasswordPage);
