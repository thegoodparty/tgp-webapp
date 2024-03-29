/**
 *
 * RegisterPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { getExperiment } from '/helpers/optimizeHelper';
import TgpHelmet from '/components/shared/TgpHelmet';
import RegisterWrapper from '/components/entrance/RegisterWrapper';
import { guestAccessOnly } from '/helpers/userHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import Modal from '../../../components/shared/Modal';

export function RegisterPage({
  dispatch,
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
  modalMode,
  verifyRecaptchaCallback,
  registerPage,
}) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  const [experimentVariant, setExperimentVariant] = useState('0');
  useEffect(() => {
    getExperiment('Social login-register', 'hVOoMzyVTb2rqzKmWFwTNw', (type) => {
      setExperimentVariant(type);
    });
  }, []);
  console.log('experimentVariant', experimentVariant, typeof experimentVariant);

  const { score } = registerPage;

  useEffect(() => {
    guestAccessOnly(dispatch);
  }, []);

  const router = useRouter();
  let queryEmail;
  if (router?.query?.email) {
    queryEmail = router.query.email;
  }

  const childProps = {
    registerCallback,
    socialRegisterCallback,
    socialRegisterFailureCallback,
    twitterButtonCallback,
    queryEmail,
    modalMode,
    verifyRecaptchaCallback,
    score,
    experimentVariant,
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LefrpgiAAAAAKay43dREi6vvU3afzdoyEBQgZeN"
      useEnterprise={true}
      scriptProps={{
        async: true,
      }}
      // container={{
      //   // optional to render inside custom element
      //   element: '[required_id_or_htmlelement]',
      //   parameters: {
      //     badge: '[inline|bottomright|bottomleft]', // optional, default undefined
      //     theme: 'dark', // optional, default undefined
      //   },
      // }}
    >
      {!modalMode && (
        <TgpHelmet
          title="Register | GOOD PARTY"
          description="Create an account on GOOD PARTY"
        />
      )}
      <RegisterWrapper {...childProps} />
    </GoogleReCaptchaProvider>
  );
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerCallback: PropTypes.func,
  socialRegisterCallback: PropTypes.func,
  socialRegisterFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
  modalMode: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerCallback: (name, email, zip) => {
      dispatch(actions.registerAction(name, email, zip, false, 'registerPage'));
    },
    socialRegisterCallback: (socialUser) => {
      dispatch(actions.socialRegisterAction(socialUser));
    },
    socialRegisterFailureCallback: () => {
      console.log('socialRegisterFailure');
      // dispatch(snackbarActions.showSnakbarAction('Error Registering', 'error'));
    },
    twitterButtonCallback: () => {
      dispatch(actions.twitterRegisterAction());
    },
    verifyRecaptchaCallback: (token) => {
      dispatch(actions.verifyRecaptchaAction(token));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RegisterPage);
