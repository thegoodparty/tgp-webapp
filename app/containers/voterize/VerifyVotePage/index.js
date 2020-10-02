/**
 *
 * VerifyVotePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import userReducer from 'containers/you/YouPage/reducer';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import VerifyVoteWrapper from 'components/voterize/VerifyVoteWrapper';

import makeSelectVerifyVotePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function VerifyVotePage({
  verifyVoterCallback,
  skipVerifyVoterCallback,
  registerToVoteCallback,
  userState,
  verifyVotePage,
}) {
  useInjectReducer({ key: 'user', reducer: userReducer });

  useInjectReducer({ key: 'verifyVotePage', reducer });
  useInjectSaga({ key: 'verifyVotePage', saga });
  const { user } = userState;
  const { loading, voteStatus, vaResponse } = verifyVotePage;
  const childProps = {
    verifyVoterCallback,
    skipVerifyVoterCallback,
    registerToVoteCallback,
    user,
    voteStatus,
    vaResponse,
    loading,
  };
  return (
    <div>
      <Helmet>
        <title>Verify Your Vote | The Good Party</title>
        <meta name="description" content="Verify Your Vote | The Good Party" />
      </Helmet>
      <VerifyVoteWrapper {...childProps} />
    </div>
  );
}

VerifyVotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  verifyVoterCallback: PropTypes.func,
  skipVerifyVoterCallback: PropTypes.func,
  userState: PropTypes.object,
  verifyVotePage: PropTypes.object,
  registerToVoteCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  verifyVotePage: makeSelectVerifyVotePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    verifyVoterCallback: voter => dispatch(actions.verifyVoterAction(voter)),
    registerToVoteCallback: voter =>
      dispatch(actions.registerVoterAction(voter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VerifyVotePage);
