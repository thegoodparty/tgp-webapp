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
import { getUserCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProfileSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ProfileSettingsPage() {
  useInjectReducer({ key: 'profileSettingsPage', reducer });
  useInjectSaga({ key: 'profileSettingsPage', saga });

  const user = getUserCookie(true);

  const childProps = {
    user,
  };

  return (
    <div>
      <Helmet>
        <title>ProfileSettingsPage</title>
        <meta name="description" content="Description of ProfileSettingsPage" />
      </Helmet>
      <ProfileSettingsWrapper {...childProps} />
    </div>
  );
}

ProfileSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profileSettingsPage: makeSelectProfileSettingsPage(),
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

export default compose(withConnect)(ProfileSettingsPage);
