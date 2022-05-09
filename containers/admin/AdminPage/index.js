/**
 *
 * AdminPage
 *
 */

import React, { useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminWrapper from '/components/admin/AdminWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';

import adminUsersReducer from '../AdminUsersPage/reducer';
import adminUsersSaga from '../AdminUsersPage/saga';
import adminUsersActions from '../AdminUsersPage/actions';
import makeSelectAdminUsersPage from '../AdminUsersPage/selectors';
import actions from '../AdminUsersPage/actions';

export const AdminPageContext = createContext();

export function AdminPage({ userState, dispatch, adminUsersPage, loadUsersCallback }) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });
  useInjectReducer({ key: 'adminUsersPage', reducer: adminUsersReducer });
  useInjectSaga({ key: 'adminUsersPage', saga: adminUsersSaga });

  const { user } = userState;
  const { users } = adminUsersPage;

  useEffect(() => {
    dispatch(adminUsersActions.loadAllUsers('All time'));
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
    <AdminPageContext.Provider value={childProps}>
      <TgpHelmet title="Admin Dashboard | Good Party" />
      <AdminWrapper />
    </AdminPageContext.Provider>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  adminUsersPage: PropTypes.object,
  loadUsersCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // adminState: makeSelectAdminPage(),
  userState: makeSelectUser(),
  adminUsersPage: makeSelectAdminUsersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUsersCallback: (dateRange) => {
      dispatch(adminUsersActions.loadAllUsers(dateRange));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminPage);
