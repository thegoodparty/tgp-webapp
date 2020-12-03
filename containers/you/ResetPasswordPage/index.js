/**
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import { makeSelectLocation } from 'containers/App/selectors';
import queryHelper from 'helpers/queryHelper';
import userActions from 'containers/you/YouPage/actions';

import ResetPasswordWrapper from 'components/you/ResetPasswordWrapper';

export function ResetPasswordPage({ locationState, resetPasswordCallback }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { search } = locationState;
  const email = queryHelper(search, 'email');
  const token = queryHelper(search, 'token');

  const childProps = {
    email,
    token,
    resetPasswordCallback,
  };
  return <ResetPasswordWrapper {...childProps} />;
}

ResetPasswordPage.propTypes = {
  locationState: PropTypes.object,
  resetPasswordCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPasswordCallback: (email, password, token) => {
      dispatch(userActions.resetPasswordAction(email, password, token));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ResetPasswordPage);
