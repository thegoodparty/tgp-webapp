/**
 *
 * RegisterPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import RegisterWrapper from 'components/entrance/RegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function RegisterPage({
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
}) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });

  const childProps = {
    registerCallback,
    socialRegisterCallback,
    socialRegisterFailureCallback,
    twitterButtonCallback,
  };

  return (
    <div>
      <Helmet>
        <TgpHelmet
          title="Register | GOOD PARTY"
          description="Create an account on GOOD PARTY"
        />
      </Helmet>
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
    registerCallback: (email, password) => {
      console.log(email, password);
    },
    socialRegisterCallback: socialAccount => {
      console.log('socialAccount', socialAccount);
    },
    socialRegisterFailureCallback: () => {},
    twitterButtonCallback: () => {},
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
