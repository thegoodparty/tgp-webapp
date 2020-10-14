/**
 *
 * AddVoteContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AddVoteModal from 'components/elections/CandidateWrapper/AddVoteModal';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddVoteContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import candidateReducer from '../CandidatePage/reducer';
import makeSelectCandidate from '../CandidatePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

export function AddVoteContainer({
  closeCallback,
  goToShareCallback,
  candidateState,
  showStepper,
  // userState,
}) {
  useInjectReducer({ key: 'addVoteContainer', reducer });
  useInjectSaga({ key: 'addVoteContainer', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  // const { user } = userState;
  const { candidate } = candidateState;

  const childProps = {
    closeCallback,
    goToShareCallback,
    candidate,
    showStepper,
    // user,
  };

  return <AddVoteModal {...childProps} />;
}

AddVoteContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  closeCallback: PropTypes.func,
  goToShareCallback: PropTypes.func,
  showStepper: PropTypes.bool,
  candidateState: PropTypes.object,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  addVoteContainer: makeSelectAddVoteContainer(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
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

export default compose(withConnect)(AddVoteContainer);
