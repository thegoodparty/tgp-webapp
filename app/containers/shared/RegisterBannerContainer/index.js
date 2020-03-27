/**
 *
 * RegisterBannerContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import candidateReducer from 'containers/elections/CandidatePage/reducer';

import RegisterBannerWrapper from 'components/shared/RegisterBannerWrapper';
import makeSelectCandidate from '../../elections/CandidatePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import { getRankFromUserOrState } from '../../../helpers/electionsHelper';

export function RegisterBannerContainer({ userState, candidateState }) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const { user } = userState;

  const presidentialRank = getRankFromUserOrState(
    user,
    candidateState,
    'presidentialRank',
  );
  const senateRank = getRankFromUserOrState(user, candidateState, 'senateRank');
  const houseRank = getRankFromUserOrState(user, candidateState, 'houseRank');

  const presidentialCount = presidentialRank ? presidentialRank.length : 0;
  const senateCount = senateRank ? senateRank.length : 0;
  const houseCount = houseRank ? houseRank.length : 0;

  const count = presidentialCount + senateCount + houseCount;

  let showBanner = true;
  console.log(1);
  if (user) {
    console.log(2);
    showBanner = false;
  }
  if (count === 0) {
    console.log(3);
    showBanner = false;
  }

  const childProps = {
    count,
    showBanner,
  };
  return <RegisterBannerWrapper {...childProps} />;
}

RegisterBannerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidateState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterBannerContainer);
