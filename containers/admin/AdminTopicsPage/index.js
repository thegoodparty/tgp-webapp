/**
 *
 * AdminTopicsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminTopicsWrapper from 'components/admin/AdminTopicsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminTopicsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminTopicsPage({
  dispatch,
  createCallback,
  adminTopicsPage,
  editCallback,
  deleteCallback,
}) {
  useInjectReducer({ key: 'adminTopicsPage', reducer });
  useInjectSaga({ key: 'adminTopicsPage', saga });

  useEffect(() => {
    dispatch(actions.loadTopicsAction());
    dispatch(actions.loadTopicsFeedback());
  }, []);

  const { topics, topicsFeedback } = adminTopicsPage;

  const childProps = {
    createCallback,
    topics,
    editCallback,
    deleteCallback,
    topicsFeedback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Topics Page</title>
      </Helmet>
      <AdminTopicsWrapper {...childProps} />
    </div>
  );
}

AdminTopicsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  adminTopicsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminTopicsPage: makeSelectAdminTopicsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCallback: (name, description) => {
      dispatch(actions.createTopicAction(name, description));
    },
    editCallback: topic => {
      dispatch(actions.editTopicAction(topic));
    },
    deleteCallback: id => {
      dispatch(actions.deleteTopicAction(id));
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
)(AdminTopicsPage);
