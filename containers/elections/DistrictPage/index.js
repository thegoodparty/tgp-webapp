/**
 *
 * DistrictPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-next-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import candidateReducer from 'containers/elections/CandidatePage/reducer';

import saga from 'containers/intro/ZipFinderPage/saga';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import DistrictWrapper from 'components/elections/DistrictWrapper';
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';
import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';
import userActions from 'containers/you/YouPage/actions';
import TgpHelmet from 'components/shared/TgpHelmet';

import makeSelectCandidate from '../CandidatePage/selectors';
import candidateActions from '../CandidatePage/actions';

export function DistrictPage({
  content,
  districtState,
  zip,
  cd,
  dispatch,
  changeDistrictCallback,
  deleteRankingCallback,
  changeZipCallback,
  userState,
  rankingObj,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const [cdIndex, setCdIndex] = useState(0);
  const { user, ranking } = userState;

  const { zipWithDistricts } = districtState;
  const { presidential, houseCandidates, senateCandidates } = districtState;

  useEffect(() => {
    if (!zipWithDistricts) {
      dispatch(districtActions.loadZipAction(zip));
    }
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
  }, [zip]);

  useEffect(() => {
    if (user && !ranking) {
      dispatch(userActions.userRankingAction());
    }
  }, [user]);

  if (!user && !ranking) {
    dispatch(userActions.guestRankingAction());
  }

  useEffect(() => {
    if (zipWithDistricts) {
      const { stateShort, cds, approxPctArr } = zipWithDistricts;

      const shortState = stateShort ? stateShort.toUpperCase() : '';
      let districtNumber;
      let tempCd = 0;
      const approxPct = approxPctArr ? JSON.parse(approxPctArr) : [];

      if (typeof cd !== 'undefined') {
        setCdIndex(parseInt(cd, 10));
        tempCd = parseInt(cd, 10);
      } else if (user && user.congDistrict && cds.length > 0) {
        // no cd was given in url, and the user already set their cd, show that one.
        approxPct.forEach((district, index) => {
          if (district.districtId === user.congDistrict) {
            setCdIndex(index);
            tempCd = index;
          }
        });
      }

      if (cds.length < cd) {
        dispatch(push(`/elections/district/${zip}`));
      } else if (cds && cds.length > tempCd) {
        cds.forEach(district => {
          if (district.id === approxPct[tempCd].districtId) {
            districtNumber = district.code;
          }
        });
      }

      if (shortState && districtNumber) {
        dispatch(
          districtActions.loadHouseCandidatesAction(shortState, districtNumber),
        );
      }

      if (shortState) {
        dispatch(districtActions.loadSenateCandidatesAction(shortState));
      }
    }
  }, [zipWithDistricts, zip, cd, user]);

  const childProps = {
    district: zipWithDistricts,
    cdIndex,
    presidential,
    houseCandidates,
    senateCandidates,
    content,
    changeDistrictCallback,
    deleteRankingCallback,
    changeZipCallback,
    user,
    ranking: rankingObj,
  };

  return (
    <div>
      <TgpHelmet
        title="Elections | District Page"
        description="Elections | District Page"
      />
      <DistrictWrapper {...childProps} />
    </div>
  );
}

DistrictPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  districtState: PropTypes.object,
  zip: PropTypes.string,
  cd: PropTypes.string,
  changeDistrictCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
  changeZipCallback: PropTypes.func,
  userState: PropTypes.object,
  candidateState: PropTypes.object,
  rankingObj: PropTypes.object,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    zip: ownProps.match.params.zip,
    cd: ownProps.match.params.cd,
    changeDistrictCallback: (districtId, districtIndex, zip, user) => {
      dispatch(push(`/elections/district/${zip}/${districtIndex}`));
      if (user && districtId) {
        dispatch(userActions.updateUserAction({ districtId }));
      }
    },
    deleteRankingCallback: (state, district) => {
      dispatch(
        candidateActions.saveRankHouseCandidateAction([], state, district),
      );
      dispatch(candidateActions.saveRankSenateCandidateAction([], state));
      dispatch(userActions.deleteAllUserRankingsAction());
    },
    changeZipCallback: () => {
      dispatch(push('/intro/zip-finder'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  search: makeSelectLocation(),
  userState: makeSelectUser(),
  candidateState: makeSelectCandidate(),
  rankingObj: makeSelectRanking(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DistrictPage);
