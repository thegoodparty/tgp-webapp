/**
 *
 * AdminCandidateStageSettingsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminCandidateSettingsWrapper from 'components/admin/AdminCandidateStageSettingsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminCandidateStageSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminCandidateStageSettingsPage({ ssrState, saveCallback }) {
  useInjectReducer({ key: 'adminCandidateStageSettingsPage', reducer });
  useInjectSaga({ key: 'adminCandidateStageSettingsPage', saga });

  const { candidate } = ssrState || {};

  const childProps = {
    candidate,
    saveCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Candidate Stage Settings</title>
      </Helmet>
      <AdminCandidateSettingsWrapper {...childProps} />
    </div>
  );
}

AdminCandidateStageSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  saveCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateStageSettingsPage: makeSelectAdminCandidateStageSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: candidate => {
      dispatch(actions.updateCandidateAction(candidate));
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
)(AdminCandidateStageSettingsPage);
