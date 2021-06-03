/**
 *
 * AdminCampaignSettingsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import AdminCampaignSettingsWrapper from 'components/admin/AdminCampaignSettingsWrapper';
import { getUserCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectAdminCampaignSettingsPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';

import reducer from '../AdminPage/reducer';
import saga from '../AdminPage/saga';
import adminActions from '../AdminPage/actions';
import makeSelectAdminPage from '../AdminPage/selectors';

export function AdminCampaignSettingsPage({ dispatch, adminState }) {
  // useInjectReducer({ key: 'adminCampaignSettingsPage', reducer });
  // useInjectSaga({ key: 'adminCampaignSettingsPage', saga });

  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const { candidates } = adminState;

  useEffect(() => {
    dispatch(adminActions.loadCandidates('local'));
  }, []);

  const user = getUserCookie(true);
  const { isAdmin } = user;

  const childProps = {
    candidates,
  };

  if (!isAdmin) {
    return <>Forbidden</>;
  }
  return (
    <div>
      <TgpHelmet title="Admin Campaign Settings" />
      <AdminCampaignSettingsWrapper {...childProps} />
    </div>
  );
}

AdminCampaignSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // adminCampaignSettingsPage: makeSelectAdminCampaignSettingsPage(),
  adminState: makeSelectAdminPage(),
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

export default compose(
  withConnect,
  memo,
)(AdminCampaignSettingsPage);
