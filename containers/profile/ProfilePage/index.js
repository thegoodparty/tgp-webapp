/**
 *
 * ProfilePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { getUserCookie } from 'helpers/cookieHelper';
import ProfileWrapper from 'components/profile/ProfileWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import userActions from './actions';

export function ProfilePage({ dispatch, profilePage }) {
  const router = useRouter();
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const { loading, crewPreview, crewCount } = profilePage;
  const user = getUserCookie(true);

  useEffect(() => {
    if (user && !crewPreview) {
      dispatch(userActions.loadCrewPreviewAction());
    }
  }, [user]);

  if (typeof window !== 'undefined' && !user) {
    router.push('login');
  }
  console.log('crewPreview', crewPreview);
  const childProps = { user, loading, crewPreview, crewCount };

  return (
    <div>
      <TgpHelmet title="Profile Page" description="Profile Page | Good Party" />
      {user && <ProfileWrapper {...childProps} />}
    </div>
  );
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profilePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
