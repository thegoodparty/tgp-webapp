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

export function AdminTopicsPage({ dispatch, createCallback, adminTopicsPage }) {
  useInjectReducer({ key: 'adminTopicsPage', reducer });
  useInjectSaga({ key: 'adminTopicsPage', saga });

  useEffect(() => {
    dispatch(actions.loadTopicsAction());
  }, []);

  const { topics } = adminTopicsPage;

  const childProps = {
    createCallback,
    topics,
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
