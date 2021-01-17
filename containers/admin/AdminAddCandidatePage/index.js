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
import actions from './actions';

export function AdminAddCandidatePage({ createCandidateCallback }) {
  useInjectReducer({ key: 'adminAddCandidatePage', reducer });
  useInjectSaga({ key: 'adminAddCandidatePage', saga });

  const childProps = {
    createCandidateCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Add Candidate</title>
      </Helmet>
      <AdminAddCandidateWrapper {...childProps} />
    </div>
  );
}

AdminAddCandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createCandidateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminAddCandidatePage: makeSelectAdminAddCandidatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCandidateCallback: candidate => {
      dispatch(actions.createCandidateAction(candidate));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminAddCandidatePage);
