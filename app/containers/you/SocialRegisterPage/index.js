/**
 *
 * SocialRegisterPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SocialRegisterWrapper from 'components/you/SocialRegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import { push } from 'connected-react-router';

export function SocialRegisterPage({
  userState,
  dispatch,
  socialLoginCallback,
  socialLoginFailureCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { user } = userState;

  useEffect(() => {
    if (user) {
      dispatch(push('/you'));
    }
  }, []);

  const childPros = {
    socialLoginCallback,
    socialLoginFailureCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Register to the Good Party</title>
        <meta name="description" content="Register to the Good Party" />
      </Helmet>
      <SocialRegisterWrapper {...childPros} />
    </div>
  );
}

SocialRegisterPage.propTypes = {
  userState: PropTypes.object,
  dispatch: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    socialLoginCallback: user => {
      console.log('page', user);
      dispatch(userActions.socialRegisterAction(user));
    },
    socialLoginFailureCallback: err => {
      dispatch(snackbarActions.showSnakbarAction('Error Registering', 'error'));
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
)(SocialRegisterPage);
