/**
 *
 * RegisterBannerContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import candidateReducer from 'containers/elections/CandidatePage/reducer';

import RegisterBannerWrapper from 'components/shared/RegisterBannerWrapper';
import makeSelectCandidate from '../../elections/CandidatePage/selectors';
import makeSelectUser, { makeSelectRanking } from '../../you/YouPage/selectors';
import { getRankFromUserOrState } from '../../../helpers/electionsHelper';
import { makeSelectLocation } from '../../App/selectors';
import userActions from '../../you/YouPage/actions';

export function RegisterBannerContainer({
  userState,
  candidateState,
  locationState,
  rankingObj,
  dispatch,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const { user, ranking } = userState;
  useEffect(() => {
    if (!user && !ranking) {
      dispatch(userActions.guestRankingAction());
    }
  }, [ranking]);

  if (user) {
    return <></>;
  }
  const { pathname } = locationState;

  const presidentialRank = rankingObj['presidential'];
  const senateRank = rankingObj['senate'];
  const houseRank = rankingObj['house'];

  const presidentialCount = Object.keys(presidentialRank).length;
  const senateCount = Object.keys(senateRank).length;
  const houseCount = Object.keys(houseRank).length;

  const count = presidentialCount + senateCount + houseCount;

  let showBanner = true;
  if (user) {
    showBanner = false;
  }
  if (count === 0) {
    showBanner = false;
  }
  if (pathname.includes('register')) {
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
  locationState: PropTypes.object,
  rankingObj: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  locationState: makeSelectLocation(),
  rankingObj: makeSelectRanking(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterBannerContainer);
