/**
 *
 * AdminEditCandidatePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AdminEditCandidate from 'components/admin/AdminEditCandidate';
import NotFoundPage from 'containers/shared/NotFoundPage/Loadable';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import makeSelectAdminPage from '../AdminPage/selectors';
import reducer from '../AdminPage/reducer';
import saga from '../AdminPage/saga';
import adminActions from '../AdminPage/actions';

export function AdminEditCandidatePage({
  userState,
  adminState,
  id,
  chamber,
  saveCandidateCallback,
  deleteUpdateCallback,
  uploadImageCallback,
  dispatch,
}) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const { candidate, loading, error } = adminState;
  const [chamberName, chamberIncumbent] = chamber?.split('-');
  const isIncumbent = chamberIncumbent === 'i';

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(adminActions.loadCandidateAction(id, chamberName, isIncumbent));
    }
  }, [id, chamber]);

  const childProps = {
    candidate,
    chamber,
    saveCandidateCallback,
    deleteUpdateCallback,
    uploadImageCallback,
    loading,
  };
  if (!candidate && error && !loading) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <Helmet>
        <title>Admin Edit Candidate Page</title>
        <meta
          name="description"
          content="Description of AdminEditCandidatePage"
        />
      </Helmet>
      <AdminEditCandidate {...childProps} />
    </div>
  );
}

AdminEditCandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  adminState: PropTypes.object,
  id: PropTypes.string.isRequired,
  chamber: PropTypes.string.isRequired,
  saveCandidateCallback: PropTypes.func,
  deleteUpdateCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminState: makeSelectAdminPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    id: ownProps.match.params.id,
    chamber: ownProps.match.params.chamber,
    saveCandidateCallback: (updatedFields, candidate, updates) => {
      const { id, chamber, isIncumbent } = candidate;
      dispatch(
        adminActions.updateCandidate(
          id,
          updatedFields,
          chamber ? chamber.toLowerCase() : 'presidential',
          isIncumbent,
          true,
          updates,
        ),
      );
    },
    uploadImageCallback: (base64, candidate, chamber) => {
      dispatch(adminActions.updateCandidateImage(base64, candidate, chamber));
    },
    deleteUpdateCallback: (candidateId, chamber, isIncumbent, updateId) => {
      dispatch(
        adminActions.deleteUpdate(candidateId, chamber, isIncumbent, updateId),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminEditCandidatePage);