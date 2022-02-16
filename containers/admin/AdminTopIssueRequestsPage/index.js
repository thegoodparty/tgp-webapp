/**
 *
 * AdminTopIssueRequestsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminTopIssueRequestsWrapper from '/components/admin/AdminTopIssueRequestsWrapper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import adminIssueTopicsPageReducer from '../AdminIssueTopicsPage/reducer';
import makeSelectAdminIssueTopicsPage from '../AdminIssueTopicsPage/selectors';
import adminIssueTopicsSaga from '../AdminIssueTopicsPage/saga';
import adminIssueTopicsActions from '../AdminIssueTopicsPage/actions';
import makeSelectAdminTopIssueRequestsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function AdminTopIssueRequestsPage({
  dispatch,
  userState,
  adminTopIssueRequestsPage,
  adminIssueTopicsPage,
  acceptIssueRequestCallback,
  rejectIssueRequestCallback,
}) {
  useInjectReducer({ key: 'adminTopIssueRequestsPage', reducer });
  useInjectSaga({ key: 'adminTopIssueRequestsPage', saga });

  useInjectReducer({
    key: 'adminIssueTopicsPage',
    reducer: adminIssueTopicsPageReducer,
  });
  useInjectSaga({ key: 'adminIssueTopicsPage', saga: adminIssueTopicsSaga });

  const { user } = userState;
  useEffect(() => {
    dispatch(adminIssueTopicsActions.loadIssueTopicsAction());
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);
  useEffect(() => {
    dispatch(actions.loadTopIssuesAction());
  }, []);

  const { topIssues } = adminTopIssueRequestsPage;
  const { topics } = adminIssueTopicsPage;

  const childProps = {
    topics,
    topIssues,
    acceptIssueRequestCallback,
    rejectIssueRequestCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Update Requests</title>
      </Helmet>
      <AdminTopIssueRequestsWrapper {...childProps} />
    </div>
  );
}

AdminTopIssueRequestsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminTopIssueRequestsPage: PropTypes.object,
  userState: PropTypes.object,
  acceptIssueRequestCallback: PropTypes.func,
  rejectIssueRequestCallback: PropTypes.func,
  adminIssueTopicsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminTopIssueRequestsPage: makeSelectAdminTopIssueRequestsPage(),
  adminIssueTopicsPage: makeSelectAdminIssueTopicsPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    acceptIssueRequestCallback: id => {
      dispatch(actions.acceptIssueRequestAction(id));
    },
    rejectIssueRequestCallback: id => {
      dispatch(actions.rejectIssueRequestAction(id));
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
)(AdminTopIssueRequestsPage);
