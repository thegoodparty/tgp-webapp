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

export function AdminCandidateStageSettingsPage({ ssrState }) {
  useInjectReducer({ key: 'adminCandidateStageSettingsPage', reducer });
  useInjectSaga({ key: 'adminCandidateStageSettingsPage', saga });

  const { candidate } = ssrState || {};

  const childProps = {
    candidate,
  };

  return (
    <div>
      <Helmet>
        <title>AdminCandidateStageSettingsPage</title>
        <meta
          name="description"
          content="Description of AdminCandidateStageSettingsPage"
        />
      </Helmet>
      <AdminCandidateSettingsWrapper {...childProps} />
    </div>
  );
}

AdminCandidateStageSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateStageSettingsPage: makeSelectAdminCandidateStageSettingsPage(),
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
)(AdminCandidateStageSettingsPage);
