/**
 *
 * AdminCompareCandidatesPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminCompareCandidatesPage from './selectors';
import adminCandidateImageReducer from '../AdminCandidateImagePage/reducer';
import saga from './saga';

import reducer from './reducer';
import actions from './actions';
import adminCandidateImageActions from '../AdminCandidateImagePage/actions';
import makeSelectAdminCandidateImagePage from '../AdminCandidateImagePage/selectors';
import AdminCompareCandidatesWrapper from '../../../components/admin/AdminCompareCandidatesWrapper';

export function AdminCompareCandidatesPage({
  dispatch,
  ssrState,
  adminCandidateImagePage,
  saveCallback,
}) {
  useInjectReducer({ key: 'adminCompareCandidatesPage', reducer });
  useInjectSaga({ key: 'adminCompareCandidatesPage', saga });
  useInjectReducer({
    key: 'adminCandidateImagePage',
    reducer: adminCandidateImageReducer,
  });

  const [candidate, setCandidate] = useState(ssrState.candidate);

  const stateCandidate = adminCandidateImagePage.candidate;
  useEffect(() => {
    dispatch(
      adminCandidateImageActions.loadCandidateActionSuccess(
        stateCandidate || candidate,
      ),
    );
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
        <title>AdminCompareCandidatesPage</title>
      </Helmet>
      <AdminCompareCandidatesWrapper {...childProps} />
    </div>
  );
}

AdminCompareCandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  adminCandidateImagePage: PropTypes.object,
  saveCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminCompareCandidatesPage: makeSelectAdminCompareCandidatesPage(),
  adminCandidateImagePage: makeSelectAdminCandidateImagePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: candidate => {
      dispatch(actions.updateComparedCandidateAction(candidate));
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
)(AdminCompareCandidatesPage);
