/**
 *
 * RegisterPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import RegisterWrapper from 'components/entrance/RegisterWrapper';
import { guestAccessOnly } from 'helpers/userHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import snackbarActions from '../../shared/SnackbarContainer/actions';

export function RegisterPage({
  dispatch,
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
}) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  useEffect(() => {
    guestAccessOnly(dispatch);
  }, []);

  const childProps = {
    registerCallback,
    socialRegisterCallback,
    socialRegisterFailureCallback,
    twitterButtonCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Register | GOOD PARTY"
        description="Create an account on GOOD PARTY"
      />
      <RegisterWrapper {...childProps} />
    </div>
  );
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerCallback: PropTypes.func,
  socialRegisterCallback: PropTypes.func,
  socialRegisterFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerCallback: (name, email, phone, zip) => {
      dispatch(actions.registerAction(name, email, phone, zip));
    },
    socialRegisterCallback: socialUser => {
      dispatch(actions.socialRegisterAction(socialUser));
    },
    socialRegisterFailureCallback: () => {
      console.log('socialRegisterFailure');
      // dispatch(snackbarActions.showSnakbarAction('Error Registering', 'error'));
    },
    twitterButtonCallback: () => {
      dispatch(actions.twitterRegisterAction());
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
