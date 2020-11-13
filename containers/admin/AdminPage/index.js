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
import { makeSelectContent } from '../../App/selectors';

export function AdminPage({
  adminState,
  loadCandidatesCallback,
  updateCandidateCallback,
  loadAllUsersCallback,
  loadArticleFeedbackCallback,
  deleteUserCallback,
  loadVoterizeCallback,
  updateVoterizeCallback,
  userState,
  content,
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

  const {
    candidates,
    users,
    articlesFeedback,
    voterizeList,
    loading,
    error,
    isUpdated,
  } = adminState;

  const childProps = {
    candidates,
    users,
    voterizeList,
    isUpdated,
    articles: articlesFeedback,
    loadCandidatesCallback,
    updateCandidateCallback,
    loadAllUsersCallback,
    loadArticleFeedbackCallback,
    deleteUserCallback,
    loadVoterizeCallback,
    updateVoterizeCallback,
    loading,
    error,
    user,
    content,
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
  deleteUserCallback: PropTypes.func,
  userState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  adminState: makeSelectAdminPage(),
  userState: makeSelectUser(),
  content: makeSelectContent(),
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
      dispatch(adminActions.loadArticlesFeedback());
    },
    deleteUserCallback: user => {
      dispatch(adminActions.deleteUser(user));
    },
    loadVoterizeCallback: () => dispatch(adminActions.loadVoterizeAction()),
    updateVoterizeCallback: voterize =>
      dispatch(adminActions.updateVoterizeAction(voterize)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);
