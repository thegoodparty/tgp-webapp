/**
 *
 * SocialRegisterPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SocialRegisterWrapper from 'components/you/SocialRegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import { push } from 'connected-next-router';
import { getSignupRedirectCookie } from 'helpers/cookieHelper';
import { logEvent } from 'services/AnalyticsService';

export function SocialRegisterPage({
  socialLoginCallback,
  socialLoginFailureCallback,
  closeModalCallback,
  twitterButtonCallback,
  emailRegisterCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  // const [blocName, setBlocName] = useState(false);
  // const [candidateName, setCandidateName] = useState(false);

  // useEffect(() => {
  //   // if (user) {
  //   //   console.log('redirect to  you6');
  //   //   dispatch(push('/profile'));
  //   // }
  //   const blocCookie = getSignupRedirectCookie();
  //   if (blocCookie) {
  //     setBlocName(blocCookie.options?.blocName);
  //     setCandidateName(blocCookie.options?.name);
  //   }
  // }, []);

  const childPros = {
    socialLoginCallback,
    socialLoginFailureCallback,
    closeModalCallback,
    // blocName,
    // candidateName,
    twitterButtonCallback,
    emailRegisterCallback,
  };

  return (
    <div>
      <Head>
        <title data-cy="page-title">Sign up | GOOD PARTY</title>
        <meta
          name="description"
          content="Sign up for GOOD PARTY, and join our movement to change politics for good!"
        />
      </Head>
      <SocialRegisterWrapper {...childPros} />
    </div>
  );
}

SocialRegisterPage.propTypes = {
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  closeModalCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
  emailRegisterCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    socialLoginCallback: user => {
      logEvent(
        'Social Register Success',
        `${user._provider} Signup`,
        `Register`,
      );
      dispatch(userActions.socialRegisterAction(user));
    },
    socialLoginFailureCallback: err => {
      if (err.toString().includes('[google][load] Failed to load SDK')) {
      } else {
        logEvent('Social Register Error', `${user._provider} SSO`, `Register`);
        dispatch(
          snackbarActions.showSnakbarAction('Error Registering', 'error'),
        );
      }
    },
    closeModalCallback: () => {
      dispatch(push(window.location.pathname));
    },

    twitterButtonCallback: () => {
      logEvent('Social Register Success', 'Twitter SSO', `Register`);
      dispatch(userActions.twitterLoginAction());
    },

    emailRegisterCallback: (name, email) => {
      logEvent('Email Register', 'Email Register', `Register`);
      dispatch(userActions.registerAction(email, name));
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
