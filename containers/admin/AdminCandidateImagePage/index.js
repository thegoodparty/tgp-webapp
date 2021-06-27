/**
 *
 * AdminCandidateImagePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminCandidateImageWrapper from 'components/admin/AdminCandidateImageWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminCandidateImagePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminCandidateImagePage({
  dispatch,
  ssrState,
  saveCallback,
  adminCandidateImagePage,
}) {
  useInjectReducer({ key: 'adminCandidateImagePage', reducer });
  useInjectSaga({ key: 'adminCandidateImagePage', saga });
  const [candidate, setCandidate] = useState(ssrState.candidate);

  const stateCandidate = adminCandidateImagePage.candidate;
  useEffect(() => {
    dispatch(actions.loadCandidateActionSuccess(stateCandidate || candidate));
  }, []);

  useEffect(() => {
    if (stateCandidate) {
      setCandidate(stateCandidate);
    }
  }, [stateCandidate]);

  const childProps = {
    candidate,
    saveCallback,
  };

  return (
    <div>
      <Helmet>
        <title>AdminCandidateImagePage</title>
        <meta
          name="description"
          content="Description of AdminCandidateImagePage"
        />
      </Helmet>
      <AdminCandidateImageWrapper {...childProps} />
    </div>
  );
}

AdminCandidateImagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  saveCallback: PropTypes.func,
  adminCandidateImagePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateImagePage: makeSelectAdminCandidateImagePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: candidate => {
      dispatch(actions.updateCandidateImageAction(candidate));
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
)(AdminCandidateImagePage);
