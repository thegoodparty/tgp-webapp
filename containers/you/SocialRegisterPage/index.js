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
import AnalyticsService from 'services/AnalyticsService';

export function SocialRegisterPage({
  socialLoginCallback,
  socialLoginFailureCallback,
  closeModalCallback,
  twitterButtonCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const [blocName, setBlocName] = useState(false);
  const [candidateName, setCandidateName] = useState(false);

  useEffect(() => {
    // if (user) {
    //   console.log('redirect to  you6');
    //   dispatch(push('/you'));
    // }
    const blocCookie = getSignupRedirectCookie();
    if (blocCookie) {
      setBlocName(blocCookie.options?.blocName);
      setCandidateName(blocCookie.options?.name);
    }
  }, []);

  const childPros = {
    socialLoginCallback,
    socialLoginFailureCallback,
    closeModalCallback,
    blocName,
    candidateName,
    twitterButtonCallback,
  };

  return (
    <div>
      <Head>
        <title data-cy="page-title">Register to the Good Party</title>
        <meta name="description" content="Register to the Good Party" />
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
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    socialLoginCallback: user => {
      AnalyticsService.sendEvent(
        'Signup',
        'Click Signup Method',
        `Click ${user._provider} Signup`,
      );
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
      } else {
        console.log('error social register', err);
        dispatch(
          snackbarActions.showSnakbarAction('Error Registering', 'error'),
        );
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
