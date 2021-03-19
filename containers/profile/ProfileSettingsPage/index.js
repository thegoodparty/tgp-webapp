/**
 *
 * ProfileSettingsPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import ProfileSettingsWrapper from 'components/profile/ProfileSettingsWrapper';
import { deleteCookies, getUserCookie } from 'helpers/cookieHelper';
import TgpHelmet from 'components/shared/TgpHelmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfileSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ProfileSettingsPage({
  signoutCallback,
  updateUserCallback,
  changePasswordCallback,
  uploadImageCallback,
}) {
  useInjectReducer({ key: 'profileSettingsPage', reducer });
  useInjectSaga({ key: 'profileSettingsPage', saga });

  const cookieUser = getUserCookie(true);
  const [user, setUser] = useState(cookieUser);
  const router = useRouter();
  const { updated } = router.query;
  useEffect(() => {
    const tempUser = getUserCookie(true);
    setUser(tempUser);
  }, [updated]);

  const childProps = {
    user,
    signoutCallback,
    updateUserCallback,
    changePasswordCallback,
    uploadImageCallback,
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
  changePasswordCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
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
    changePasswordCallback: (password, oldPassword) => {
      console.log('in page');
      dispatch(actions.changePasswordAction(password, oldPassword));
    },

    uploadImageCallback: base64 => {
      dispatch(actions.uploadAvatarAction(base64));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileSettingsPage);
