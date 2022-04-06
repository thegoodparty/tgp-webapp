/**
 *
 * PasswordCreationPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import PasswordCreationWrapper from '/components/entrance/PasswordCreationWrapper';
import { getUserCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPasswordCreationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function PasswordCreationPage({ dispatch, savePasswordCallback }) {
  useInjectReducer({ key: 'passwordCreationPage', reducer });
  useInjectSaga({ key: 'passwordCreationPage', saga });

  const user = getUserCookie(true);
  if (user && user.hasPassword) {
    dispatch(push('/'));
  }

  const childProps = {
    savePasswordCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Password Creation | GOOD PARTY"
        description="Create an account on GOOD PARTY"
      />
      <PasswordCreationWrapper {...childProps} />
    </div>
  );
}

PasswordCreationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  savePasswordCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  passwordCreationPage: makeSelectPasswordCreationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    savePasswordCallback: password => {
      dispatch(actions.setPasswordAction(password));
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
)(PasswordCreationPage);
