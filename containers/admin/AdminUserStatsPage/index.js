/**
 *
 * AdminUserStatsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import AdminUserStats from '/components/admin/AdminUserStats';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminUserStatsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import adminUsersReducer from '../AdminUsersPage/reducer';
import adminUsersSaga from '../AdminUsersPage/saga';
import actions from '../AdminUsersPage/actions';
import makeSelectAdminUsersPage from '../AdminUsersPage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

export function AdminUserStatsPage({
  dispatch,
  adminUsersPage,
  userState,
  loadUsersCallback,
}) {
  useInjectReducer({ key: 'adminUserStatsPage', reducer });
  useInjectSaga({ key: 'adminUserStatsPage', saga });

  useInjectReducer({ key: 'adminUsersPage', reducer: adminUsersReducer });
  useInjectSaga({ key: 'adminUsersPage', saga: adminUsersSaga });

  const { user } = userState;
  const { users } = adminUsersPage;

  useEffect(() => {
    dispatch(actions.loadAllUsers('All time'));
  }, []);

  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);

  const childProps = {
    users,
    loadUsersCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin User Stats</title>
        <meta name="description" content="Description of AdminUserStatsPage" />
      </Helmet>
      <AdminUserStats {...childProps} />
    </div>
  );
}

AdminUserStatsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminUsersPage: PropTypes.object,
  userState: PropTypes.object,
  loadUsersCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminUserStatsPage: makeSelectAdminUserStatsPage(),
  adminUsersPage: makeSelectAdminUsersPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUsersCallback: dateRange => {
      dispatch(actions.loadAllUsers(dateRange));
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
)(AdminUserStatsPage);
