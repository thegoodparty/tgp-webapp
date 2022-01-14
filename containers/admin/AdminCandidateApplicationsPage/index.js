/**
 *
 * AdminCandidateApplicationsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminCandidateApplicationsWrapper from 'components/admin/AdminCandidateApplicationsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminCandidateApplicationsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function AdminCandidateApplicationsPage({
  dispatch,
  userState,
  adminCandidateApplicationsPage,
}) {
  useInjectReducer({ key: 'adminCandidateApplicationsPage', reducer });
  useInjectSaga({ key: 'adminCandidateApplicationsPage', saga });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);
  useEffect(() => {
    dispatch(actions.loadApplicationsAction());
  }, []);

  const { applications } = adminCandidateApplicationsPage;
  console.log('applications', applications);

  const childProps = {
    applications,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Candidate Applications Page</title>
      </Helmet>
      <AdminCandidateApplicationsWrapper {...childProps} />
    </div>
  );
}

AdminCandidateApplicationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  adminCandidateApplicationsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateApplicationsPage: makeSelectAdminCandidateApplicationsPage(),
  userState: makeSelectUser(),
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
)(AdminCandidateApplicationsPage);
