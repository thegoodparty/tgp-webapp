/**
 *
 * SocialRegisterPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SocialRegisterWrapper from 'components/you/SocialRegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import globalActions from 'containers/App/actions';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import { push } from 'connected-react-router';
import { getSignupRedirectCookie } from '../../../helpers/cookieHelper';

export function SocialRegisterPage({
  socialLoginCallback,
  socialLoginFailureCallback,
  closeModalCallback,
  twitterButtonCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const [blocName, setBlocName] = useState(false);

  useEffect(() => {
    // if (user) {
    //   console.log('redirect to  you6');
    //   dispatch(push('/you'));
    // }
    const blocCookie = getSignupRedirectCookie();
    if (blocCookie) {
      setBlocName(blocCookie.options?.blocName);
    }
  }, []);

  const childPros = {
    socialLoginCallback,
    socialLoginFailureCallback,
    closeModalCallback,
    blocName,
    twitterButtonCallback,
  };

  return (
    <div>
      <Helmet>
        <title data-cy="page-title">Register to the Good Party</title>
        <meta name="description" content="Register to the Good Party" />
      </Helmet>
      <SocialRegisterWrapper {...childPros} />
    </div>
  );
}

SocialRegisterPage.propTypes = {
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  closeModalCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    socialLoginCallback: user => {
      dispatch(userActions.socialRegisterAction(user));
    },
    socialLoginFailureCallback: err => {
      if (err.toString().includes('[google][load] Failed to load SDK')) {
        dispatch(
          snackbarActions.showSnakbarAction(
            'Your browser is blocking Google Cookies.',
            'error',
          ),
        );
        dispatch(
          globalActions.logErrorAction(
            'Error in social register - google sdk is blocked',
            err,
          ),
        );
      } else {
        console.log('error social register', err);
        dispatch(
          snackbarActions.showSnakbarAction('Error Registering', 'error'),
        );
        dispatch(globalActions.logErrorAction('Error in social register', err));
      }
    },
    closeModalCallback: () => {
      dispatch(push(window.location.pathname));
    },

    twitterButtonCallback: () => {
      dispatch(userActions.twitterLoginAction());
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
