/**
 *
 * AdminReleasesPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminReleasesWrapper from 'components/admin/AdminReleasesWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminReleasesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminReleasesPage({
  dispatch,
  createCallback,
  adminReleasesPage,
  editCallback,
  deleteCallback,
}) {
  useInjectReducer({ key: 'adminReleasesPage', reducer });
  useInjectSaga({ key: 'adminReleasesPage', saga });

  useEffect(() => {
    dispatch(actions.loadReleasesAction());
  }, []);

  const { releases } = adminReleasesPage;

  const childProps = {
    createCallback,
    releases,
    editCallback,
    deleteCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Releases Page</title>
      </Helmet>
      <AdminReleasesWrapper {...childProps} />
    </div>
  );
}

AdminReleasesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  adminReleasesPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminReleasesPage: makeSelectAdminReleasesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCallback: release => {
      dispatch(actions.createReleaseAction(release));
    },
    editCallback: release => {
      dispatch(actions.editReleaseAction(release));
    },
    deleteCallback: id => {
      dispatch(actions.deleteReleaseAction(id));
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
)(AdminReleasesPage);
