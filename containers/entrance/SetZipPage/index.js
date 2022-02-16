/**
 *
 * SetZipPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import SetZipWrapper from '/components/entrance/SetZipWrapper';
import profileSaga from '/containers/profile/ProfileSettingsPage/saga';
import profileActions from '/containers/profile/ProfileSettingsPage/actions';
import {
  deleteSignupRedirectCookie,
  getSignupRedirectCookie,
  getUserCookie,
} from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectSetZipPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SetZipPage({ setZipCallback }) {
  useInjectReducer({ key: 'setZipPage', reducer });
  useInjectSaga({ key: 'setZipPage', saga });

  useInjectSaga({ key: 'profileSettingsPage', saga: profileSaga });

  const childProps = {
    setZipCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Set your Zipcode | Good Party"
        description="Set your zipcode"
      />
      <SetZipWrapper {...childProps} />
    </div>
  );
}

SetZipPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  setZipCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  setZipPage: makeSelectSetZipPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setZipCallback: (zip, skip = false) => {
      if (!skip) {
        dispatch(profileActions.updateUserAction({ zip }));
      }
      const user = getUserCookie(true);
      const redirectCookie = getSignupRedirectCookie();
      if (redirectCookie) {
        dispatch(push(redirectCookie.route));
        deleteSignupRedirectCookie();
      } else if (user.candidate) {
        dispatch(push('/candidate-portal'));
      } else {
        dispatch(push('/profile'));
      }
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
)(SetZipPage);
