/**
 *
 * ProfilePage
 *
 */

import React, { useEffect, useState } from 'react';
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
import actions from './actions';
import { fullFirstLastInitials } from '../../../helpers/userHelper';

export function ProfilePage({ dispatch, profilePage }) {
  const [supported, setSupported] = useState(false);
  const router = useRouter();
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const { loading, crewPreview, crewCount, userSupported } = profilePage;
  const user = getUserCookie(true);

  useEffect(() => {
    if (user && !crewPreview) {
      console.log('loadng crew');
      dispatch(actions.loadCrewPreviewAction());
    }
    if (user && !userSupported) {
      console.log('loadng upport');
      dispatch(actions.loadUserSupportedAction());
    }
    if (typeof window !== 'undefined' && !user) {
      router.push('login');
    }
  }, []);

  useEffect(() => {
    if (userSupported) {
      const tempSupported = [];
      userSupported.forEach(support => {
        if (support.candidate?.data) {
          const parsed = JSON.parse(support.candidate.data);
          parsed.supporters = support.candidate.supporters;
          tempSupported.push(parsed);
        }
      });
      setSupported(tempSupported);
    }
  }, [userSupported]);

  const childProps = {
    user,
    loading,
    crewPreview,
    crewCount,
    userSupported: supported,
  };

  return (
    <div>
      <TgpHelmet
        title="Profile | GOOD PARTY"
        description="Sign into your profile on GOOD PARTY."
      />
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
