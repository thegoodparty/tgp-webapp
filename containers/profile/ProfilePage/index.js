/**
 *
 * ProfilePage
 *
 */

import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { deleteCookies, getUserCookie } from '/helpers/cookieHelper';
import ProfileWrapper from '/components/profile/ProfileWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export const ProfilePageContext = createContext();

export function ProfilePage({ dispatch, signoutCallback, profilePage }) {
  const router = useRouter();
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const user = getUserCookie(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('login');
    }
    dispatch(actions.loadCandidatesAction());
  }, []);

  const { candidates, loading } = profilePage;

  const childProps = {
    user,
    signoutCallback,
    loading,
    candidates,
  };

  console.log('candidates', candidates);

  return (
    <ProfilePageContext.Provider value={childProps}>
      <TgpHelmet
        title="Profile | GOOD PARTY"
        description="Sign into your profile on GOOD PARTY."
      />
      {user && <ProfileWrapper />}
    </ProfilePageContext.Provider>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profilePage: PropTypes.object,
  signoutCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutCallback: () => {
      deleteCookies();
      window.location.replace('/');
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
