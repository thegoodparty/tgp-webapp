/**
 *
 * AdminAddCandidatePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminAddCandidateWrapper from '/components/admin/AdminAddCandidateWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminAddCandidatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { getUserCookie } from '../../../helpers/cookieHelper';
import adminUsersActions from '../AdminUsersPage/actions';

export function AdminAddCandidatePage({
  dispatch,
  createCandidateCallback,
  editCandidateCallback,
  ssrState,
}) {
  useInjectReducer({ key: 'adminAddCandidatePage', reducer });
  useInjectSaga({ key: 'adminAddCandidatePage', saga });
  const user = getUserCookie(true);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      dispatch(push('/'));
    }
  }, []);

  const { candidate } = ssrState || {};
  const mode = candidate ? 'edit' : 'add';

  const childProps = {
    createCandidateCallback,
    editCandidateCallback,
    candidate,
    mode,
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
  editCandidateCallback: PropTypes.func,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminAddCandidatePage: makeSelectAdminAddCandidatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCandidateCallback: (candidate) => {
      dispatch(actions.createCandidateAction(candidate));
    },
    editCandidateCallback: (candidate) => {
      dispatch(actions.editCandidateAction(candidate));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminAddCandidatePage);
