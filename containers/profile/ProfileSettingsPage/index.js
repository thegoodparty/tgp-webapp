/**
 *
 * ProfileSettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ProfileSettingsWrapper from 'components/profile/ProfileSettingsWrapper';
import { deleteCookies, getUserCookie } from 'helpers/cookieHelper';
import TgpHelmet from 'components/shared/TgpHelmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfileSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ProfileSettingsPage({ signoutCallback, updateUserCallback }) {
  useInjectReducer({ key: 'profileSettingsPage', reducer });
  useInjectSaga({ key: 'profileSettingsPage', saga });

  const user = getUserCookie(true);

  const childProps = {
    user,
    signoutCallback,
    updateUserCallback,
  };

  return (
    <div>
      <TgpHelmet title="GOOD PARTY | Profile Settings" />
      <ProfileSettingsWrapper {...childProps} />
    </div>
  );
}

ProfileSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signoutCallback: PropTypes.func,
  updateUserCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profileSettingsPage: makeSelectProfileSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutCallback: () => {
      deleteCookies();
      window.location.replace('/');
    },
    updateUserCallback: (key, value) => {
      console.log('updte', key, value);
      let cleanValue = value;
      if (key === 'phone') {
        cleanValue = value.replace(/\D+/g, '');
      }
      dispatch(actions.updateUserAction({ [key]: cleanValue }));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileSettingsPage);
