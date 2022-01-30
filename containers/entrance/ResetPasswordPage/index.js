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
import { makeSelectLocation } from 'containers/App/selectors';
import queryHelper from 'helpers/queryHelper';

import ResetPasswordWrapper from 'components/entrance/ResetPasswordWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import actions from './actions';
import saga from './saga';

export function ResetPasswordPage({ locationState, resetPasswordCallback }) {
  useInjectSaga({ key: 'resetPasswordPage', saga });

  const { search } = locationState;
  const email = queryHelper(search, 'email');
  const phone = queryHelper(search, 'phone');
  const token = queryHelper(search, 'token');

  const childProps = {
    email,
    phone,
    token,
    resetPasswordCallback,
  };
  return (
    <div>
      <TgpHelmet
        title="Reset your password | Good Party"
        description="Reset your password for your Good Party account"
      />
      <ResetPasswordWrapper {...childProps} />
    </div>
  );
}

ResetPasswordPage.propTypes = {
  locationState: PropTypes.object,
  resetPasswordCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    resetPasswordCallback: (email, phone, password, token) => {
      console.log('reset password lalback', actions.resetPasswordAction);
      dispatch(actions.resetPasswordAction(email, phone, password, token));
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
