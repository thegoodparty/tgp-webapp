/**
 *
 * AdminAddCandidatePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminAddCandidatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import AdminAddCandidateWrapper from '../../../components/admin/AdminAddCandidateWrapper';

export function AdminAddCandidatePage() {
  useInjectReducer({ key: 'adminAddCandidatePage', reducer });
  useInjectSaga({ key: 'adminAddCandidatePage', saga });

  return (
    <div>
      <Helmet>
        <title>Admin Add Candidate</title>
      </Helmet>
      <AdminAddCandidateWrapper />
    </div>
  );
}

AdminAddCandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminAddCandidatePage: makeSelectAdminAddCandidatePage(),
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

export default compose(withConnect)(AdminAddCandidatePage);
