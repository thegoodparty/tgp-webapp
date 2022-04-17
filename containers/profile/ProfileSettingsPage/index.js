/**
 *
 * ProfileSettingsPage
 *
 */

import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import ProfileSettingsWrapper from '/components/profile/ProfileSettingsWrapper';
import { deleteCookies, getUserCookie } from '/helpers/cookieHelper';
import TgpHelmet from '/components/shared/TgpHelmet';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectProfileSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import makeSelectUser from '../../you/YouPage/selectors';

export const ProfileSettingsPageContext = createContext();

export function ProfileSettingsPage({
  updateUserCallback,
  changePasswordCallback,
  uploadImageCallback,
  userState,
  deleteAccountCallback,
}) {
  useInjectReducer({ key: 'profileSettingsPage', reducer });
  useInjectSaga({ key: 'profileSettingsPage', saga });
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(userState?.user || getUserCookie(true));
  }, [userState]);
  // const cookieUser = getUserCookie(true);
  // const [user, setUser] = useState(cookieUser);
  // const router = useRouter();
  // const { updated } = router.query;
  // useEffect(() => {
  //   const tempUser = getUserCookie(true);
  //   setUser(tempUser);
  // }, [updated]);
  const setUserCallback = (user) => setUser(user);
  const childProps = {
    user,
    setUserCallback,
    updateUserCallback,
    changePasswordCallback,
    uploadImageCallback,
    deleteAccountCallback,
  };

  return (
    <ProfileSettingsPageContext.Provider value={childProps}>
      <TgpHelmet title="GOOD PARTY | Profile Settings" />
      {user && <ProfileSettingsWrapper />}
    </ProfileSettingsPageContext.Provider>
  );
}

ProfileSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  updateUserCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
  deleteAccountCallback: PropTypes.func,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profileSettingsPage: makeSelectProfileSettingsPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    updateUserCallback: (fields) => {
      // let cleanValue = value;
      // if (key === 'phone') {
      //   cleanValue = value.replace(/\D+/g, '');
      // }
      dispatch(actions.updateUserAction(fields));
    },
    changePasswordCallback: (password, oldPassword) => {
      dispatch(actions.changePasswordAction(password, oldPassword));
    },

    uploadImageCallback: (base64) => {
      dispatch(actions.uploadAvatarAction(base64));
    },

    deleteAccountCallback: () => {
      dispatch(actions.deleteAccountAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfileSettingsPage);
