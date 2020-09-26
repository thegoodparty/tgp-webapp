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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectVerifyVotePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import VerifyVoteWrapper from '../../../components/voterize/VerifyVoteWrapper';

export function VerifyVotePage() {
  useInjectReducer({ key: 'verifyVotePage', reducer });
  useInjectSaga({ key: 'verifyVotePage', saga });

  return (
    <div>
      <Helmet>
        <title>Verify Your Vote | The Good Party</title>
        <meta name="description" content="Verify Your Vote | The Good Party" />
      </Helmet>
      <VerifyVoteWrapper />
    </div>
  );
}

VerifyVotePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  verifyVotePage: makeSelectVerifyVotePage(),
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

export default compose(withConnect)(VerifyVotePage);
