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
import globalActions from 'containers/App/actions';
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';

export function SenateElectionPage({
  dispatch,
  districtState,
  shortState,
  content,
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
    if (!content) {
      dispatch(globalActions.loadContentAction());
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


  const childProps = {
    candidates,
    content,
    electionType: 'Senate',
    changeFiltersCallback,
    filters,
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
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    shortState: ownProps.match.params.shortState,
    changeFiltersCallback: filters => {
      dispatch(districtActions.changeFiltersAction(filters));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SenateElectionPage);
