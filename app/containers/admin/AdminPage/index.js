/**
 *
 * AdminPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import AdminWrapper from 'components/admin/AdminWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import adminActions from './actions';
import makeSelectUser from '../../you/YouPage/selectors';
import userActions from '../../you/YouPage/actions';

export function AdminPage({
  adminState,
  loadCandidatesCallback,
  updateCandidateCallback,
  loadAllUsersCallback,
  loadArticleFeedbackCallback,
  userState,
  dispatch,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  });

  const { candidates, users, loading, error } = adminState;

  const childProps = {
    candidates,
    users,
    loadCandidatesCallback,
    updateCandidateCallback,
    loadAllUsersCallback,
    loadArticleFeedbackCallback,
    loading,
    error,
    user,
  };
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
      </Helmet>
      <AdminWrapper {...childProps} />
    </div>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminState: PropTypes.object,
  loadCandidatesCallback: PropTypes.func,
  updateCandidateCallback: PropTypes.func,
  loadAllUsersCallback: PropTypes.func,
  loadArticleFeedbackCallback: PropTypes.func,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminState: makeSelectAdminPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadCandidatesCallback: chamber =>
      dispatch(adminActions.loadCandidates(chamber)),
    updateCandidateCallback: (id, updatedFields, chamber, isIncumbent) => {
      dispatch(
        adminActions.updateCandidate(id, updatedFields, chamber, isIncumbent),
      );
    },
    loadAllUsersCallback: () => {
      dispatch(adminActions.loadAllUsers());
    },
    loadArticleFeedbackCallback: () => {

    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);
