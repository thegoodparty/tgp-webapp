/**
 *
 * SenateElectionPage
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

export function SenateElectionPage({
  dispatch,
  districtState,
  shortState,
  content,
  userState,
  rankingLinkCallback,
  changeFiltersCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  const [candidates, setCandidates] = useState([]);
  const { senateCandidates, filters } = districtState;

  useEffect(() => {
    if (!senateCandidates) {
      dispatch(districtActions.loadSenateCandidatesAction(shortState));
    }
    // if the state changed
    if (
      senateCandidates &&
      senateCandidates.length > 0 &&
      senateCandidates[0].state.toUpperCase() !== shortState
    ) {
      dispatch(districtActions.loadSenateCandidatesAction(shortState));
    }
  }, []);

  useEffect(() => {
    const filtered = filterCandidates(
      senateCandidates || [],
      filters,
      CHAMBER_ENUM.SENATE,
    );
    setCandidates(filtered);
  }, [senateCandidates, filters]);

  const { user } = userState;
  let userShortState;
  let rankingAllowed = true;
  if (user) {
    userShortState = user.shortState;
    if (shortState !== userShortState) {
      rankingAllowed = false;
    }
  }

  const childProps = {
    candidates,
    content,
    chamber: 'Senate',
    changeFiltersCallback,
    filters,
    state: shortState,
    rankingAllowed,
    rankingLinkCallback,
  };

  return (
    <div>
      <Helmet>
        <title>{shortState.toUpperCase()} Senate Election</title>
        <meta
          name="description"
          content={`${shortState.toUpperCase()} Senate Election`}
        />
      </Helmet>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

SenateElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  shortState: PropTypes.string,
  districtState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changeFiltersCallback: PropTypes.func,
  rankingLinkCallback: PropTypes.func,
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    shortState: ownProps.match.params.shortState,
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

export default compose(withConnect)(SenateElectionPage);
