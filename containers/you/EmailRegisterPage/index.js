/**
 *
 * RegisterPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import RegisterWrapper from 'components/you/EmailRegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { push } from 'connected-next-router';

export function RegisterPage({ userState, registerCallback, dispatch }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { loading, error, user } = userState;

  useEffect(() => {
    if (user) {
      dispatch(push('/you'));
    }
  }, []);

  const childPros = {
    registerCallback,
    loading,
    error,
  };

  return (
    <div>
      <Head>
        <title data-cy="page-title">Register to the Good Party</title>
        <meta name="description" content="Register to the Good Party" />
      </Head>
      <RegisterWrapper {...childPros} />
    </div>
  );
}

RegisterPage.propTypes = {
  userState: PropTypes.object,
  registerCallback: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerCallback: (email, name, password) => {
      dispatch(userActions.registerAction(email, name, password));
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
)(RegisterPage);
