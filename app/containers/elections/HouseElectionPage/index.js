/**
 *
 * HouseElectionPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import saga from 'containers/intro/ZipFinderPage/saga';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import ElectionWrapper from 'components/elections/ElectionWrapper';
import { CHAMBER_ENUM, filterCandidates } from 'helpers/electionsHelper';
import { makeSelectContent } from 'containers/App/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

export function HouseElectionPage({
  dispatch,
  districtState,
  userState,
  stateDistrict,
  content,
  changeFiltersCallback,
  rankingLinkCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  const [state, districtNumber] = stateDistrict.split('-');

  const [candidates, setCandidates] = useState([]);
  const { houseCandidates, filters } = districtState;

  useEffect(() => {
    if (!houseCandidates) {
      dispatch(
        districtActions.loadHouseCandidatesAction(state, districtNumber),
      );
    }
    // if the state changed
    if (
      houseCandidates &&
      houseCandidates.length > 0 &&
      houseCandidates[0].state !== state
    ) {
      dispatch(
        districtActions.loadHouseCandidatesAction(state, districtNumber),
      );
    }
  }, []);

  useEffect(() => {
    const filtered = filterCandidates(
      houseCandidates || [],
      filters,
      CHAMBER_ENUM.HOUSE,
    );
    setCandidates(filtered);
  }, [houseCandidates, filters]);

  const { user } = userState;
  let userDistrict;
  let userShortState;
  let rankingAllowed = true;
  if (user) {
    userDistrict = user.districtNumber + '';
    userShortState = user.shortState;
    if (state !== userShortState || districtNumber !== userDistrict) {
      rankingAllowed = false;
    }
  }

  const childProps = {
    candidates,
    content,
    chamber: 'House',
    filters,
    state,
    districtNumber,
    rankingAllowed,
    changeFiltersCallback,
    rankingLinkCallback,
  };
  return (
    <div>
      <Helmet>
        <title>
          {state.toUpperCase()}-{districtNumber} House Election
        </title>
        <meta
          name="description"
          content={`${state.toUpperCase()}-${districtNumber} House Election`}
        />
      </Helmet>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

HouseElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stateDistrict: PropTypes.string,
  districtState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changeFiltersCallback: PropTypes.func,
  rankingLinkCallback: PropTypes.func,
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    stateDistrict: ownProps.match.params.stateDistrict,
    changeFiltersCallback: filters => {
      dispatch(districtActions.changeFiltersAction(filters));
    },
    rankingLinkCallback: link => {
      dispatch(push(link));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  content: makeSelectContent(),
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HouseElectionPage);
