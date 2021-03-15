/* eslint-disable import/no-unresolved */
/**
 *
 * EmailConfirmationPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-next-router';
import { useRouter } from 'next/router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import queryHelper from 'helpers/queryHelper';

import EmailConfirmationWrapper from 'components/you/EmailConfirmationWrapper';

export function EmailConfirmationPage({
  userState,
  resendEmailCallback,
  dispatch,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });
  const router = useRouter();
  const { asPath } = router;
  const email = queryHelper(`?${asPath.split('?')[1]}`, 'email');
  const token = queryHelper(`?${asPath.split('?')[1]}`, 'token');
  const { loading, error } = userState;

  useEffect(() => {
    if (email && token) {
      dispatch(userActions.confirmEmailAction(email, token));
    } else {
      dispatch(push('/'));
    }
  }, []);

  const childProps = {
    loading,
    error,
    resendEmailCallback,
  };
  return <EmailConfirmationWrapper {...childProps} />;
}

EmailConfirmationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  locationState: PropTypes.object,
  resendEmailCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resendEmailCallback: email => {
      dispatch(userActions.resendEmailAction(email));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailConfirmationPage);
