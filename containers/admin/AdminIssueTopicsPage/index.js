/**
 *
 * AdminIssueTopicsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-next-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getUserCookie } from 'helpers/cookieHelper';
import TgpHelmet from 'components/shared/TgpHelmet';
import AdminIssueTopicsWrapper from 'components/admin/AdminIssueTopicsWrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminIssueTopicsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminIssueTopicsPage({
  dispatch,
  createCallback,
  adminIssueTopicsPage,
  editCallback,
  deleteCallback,
}) {
  useInjectReducer({ key: 'adminIssueTopicsPage', reducer });
  useInjectSaga({ key: 'adminIssueTopicsPage', saga });

  const user = getUserCookie(true);
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);

  useEffect(() => {
    dispatch(actions.loadIssueTopicsAction());
  }, []);

  const { topics } = adminIssueTopicsPage;
  const childProps = {
    createCallback,
    topics,
    editCallback,
    deleteCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Admin Issue Topics Page"
        description="Admin Issue Topics Page"
      />
      {user && user.isAdmin ? (
        <AdminIssueTopicsWrapper {...childProps} />
      ) : (
        <div>No Admin Access</div>
      )}
    </div>
  );
}

AdminIssueTopicsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminIssueTopicsPage: PropTypes.object,
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminIssueTopicsPage: makeSelectAdminIssueTopicsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCallback: (topic, positions) => {
      dispatch(actions.createIssueTopicAction(topic, positions));
    },
    editCallback: topic => {
      dispatch(actions.editIssueTopicAction(topic));
    },
    deleteCallback: id => {
      dispatch(actions.deleteIssueTopicAction(id));
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
)(AdminIssueTopicsPage);
