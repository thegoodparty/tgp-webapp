/**
 *
 * VoterizePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import VoterizeWrapper from 'components/voterize/VoterizeWrapper';
import makeSelectUser from 'containers/you/YouPage/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectVoterizePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function VoterizePage({ userState, mode, dispatch }) {
  useInjectReducer({ key: 'voterizePage', reducer });
  useInjectSaga({ key: 'voterizePage', saga });
  const voteMode = mode || 'verify';


  const { user } = userState;
  useEffect(() => {
    if (user) {
      const { name, email } = user;
      const nameArr = name.split(' ');
      const firstName = nameArr[0];
      const lastName = nameArr[nameArr.length - 1];
      dispatch(
        push(
          `/voterize/${voteMode}?first_name=${firstName}&last_name=${lastName}&email=${email}`,
        ),
      );
    }
  }, [user]);

  const childPros = {
    voteMode,
  };

  return (
    <div>
      <Helmet>
        <title>Check Your Voter Registration</title>
        <meta name="description" content="Check Your Voter Registration" />
      </Helmet>
      <VoterizeWrapper {...childPros} />
    </div>
  );
}

VoterizePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  mode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  voterizePage: makeSelectVoterizePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    mode: ownProps.match.params.mode,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VoterizePage);
