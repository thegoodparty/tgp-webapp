/**
 *
 * AdminTopIssuesPage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminTopIssuesWrapper from '/components/admin/AdminTopIssuesWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminTopIssuesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { getUserCookie } from '/helpers/cookieHelper';

export const AdminTopIssuesPageContext = createContext();

export function AdminTopIssuesPage({
  dispatch,
  createTopIssueCallback,
  createPositionCallback,
  adminTopIssuesPage,
  deleteTopIssueCallback,
  deletePositionCallback,
}) {
  useInjectReducer({ key: 'adminTopIssuesPage', reducer });
  useInjectSaga({ key: 'adminTopIssuesPage', saga });

  useEffect(() => {
    dispatch(actions.loadTopIssuesAction());
  }, []);

  const { topIssues } = adminTopIssuesPage;
  const childProps = {
    createTopIssueCallback,
    topIssues,
    createPositionCallback,
    deleteTopIssueCallback,
    deletePositionCallback,
  };

  const user = getUserCookie(true);

  return (
    <AdminTopIssuesPageContext.Provider value={childProps}>
      <TgpHelmet title="Admin Top Issues Page" />
      {user.isAdmin && <AdminTopIssuesWrapper />}
    </AdminTopIssuesPageContext.Provider>
  );
}

AdminTopIssuesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminTopIssuesPage: makeSelectAdminTopIssuesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createTopIssueCallback: (name) => {
      dispatch(actions.createTopIssueAction(name));
    },
    createPositionCallback: (name, topIssueId) => {
      dispatch(actions.createPositionAction(name, topIssueId));
    },
    deleteTopIssueCallback: (id) => {
      dispatch(actions.deleteTopIssueAction(id));
    },
    deletePositionCallback: (id) => {
      dispatch(actions.deletePositionAction(id));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminTopIssuesPage);
