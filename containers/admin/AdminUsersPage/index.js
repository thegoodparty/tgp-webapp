/**
 *
 * AdminUsersPage
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
import AdminUsersList from '/components/admin/AdminUsersList';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminUsersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function AdminUsersPage({
  deleteUserCallback,
  dispatch,
  adminUsersPage,
  userState,
}) {
  useInjectReducer({ key: 'adminUsersPage', reducer });
  useInjectSaga({ key: 'adminUsersPage', saga });

  const { user } = userState;
  const { users } = adminUsersPage;

  useEffect(() => {
    dispatch(actions.loadAllUsers());
  }, []);

  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);

  const childProps = {
    users,
    deleteUserCallback,
  };

  return (
    <div>
      <TgpHelmet title="Admin Users Page" />
      <AdminUsersList {...childProps} />
    </div>
  );
}

AdminUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminUsersPage: PropTypes.object,
  deleteUserCallback: PropTypes.func,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminUsersPage: makeSelectAdminUsersPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteUserCallback: user => {
      dispatch(actions.deleteUser(user));
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
)(AdminUsersPage);
