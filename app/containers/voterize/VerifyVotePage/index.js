/**
 *
 * VerifyVotePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import userReducer from 'containers/you/YouPage/reducer';
import queryHelper from 'helpers/queryHelper';
import AnalyticsService from 'services/AnalyticsService';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import VerifyVoteWrapper from 'components/voterize/VerifyVoteWrapper';

import makeSelectVerifyVotePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function VerifyVotePage({
  dispatch,
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
  useEffect(() => {
    const registerQuery = queryHelper(window.location.search, 'register');
    if (user && registerQuery === 'true') {
      dispatch(push(window.location.pathname));
    } else if (!user && registerQuery !== 'true') {
      dispatch(push('?register=true'));
    }
    AnalyticsService.sendEvent('Voter Registration', 'View Voterize Page');
  }, [user]);
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
    verifyVoterCallback: (voter, user) => {
      if (user) {
        dispatch(actions.verifyVoterAction(voter, user));
      } else {
        dispatch(push('?register=true'));
      }
    },
    registerToVoteCallback: voter =>
      dispatch(actions.registerVoterAction(voter)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VerifyVotePage);
