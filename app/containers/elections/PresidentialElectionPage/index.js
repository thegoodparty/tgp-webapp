/**
 *
 * PresidentialElectionPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';

import districtActions from 'containers/intro/ZipFinderPage/actions';
import ElectionWrapper from 'components/elections/ElectionWrapper';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import { makeSelectContent } from 'containers/App/selectors';
import { CHAMBER_ENUM, filterCandidates } from 'helpers/electionsHelper';

export function PresidentialElectionPage({
  content,
  districtState,
  dispatch,
  changeFiltersCallback,
  rankingLinkCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  const [candidates, setCandidates] = useState([]);
  const { presidential, filters } = districtState;
  useEffect(() => {
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
  }, []);
  useEffect(() => {
    const filtered = filterCandidates(
      presidential || [],
      filters,
      CHAMBER_ENUM.PRESIDENTIAL,
    );
    setCandidates(filtered);
  }, [presidential, filters]);

  const childProps = {
    candidates,
    content,
    chamber: 'Presidential',
    changeFiltersCallback,
    filters,
    rankingAllowed: true,
    rankingLinkCallback,
  };
  return (
    <div>
      <Helmet>
        <title>Presidential Election | The Good Party</title>
        <meta
          name="description"
          content="Presidential Election | The Good Party"
        />
      </Helmet>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

PresidentialElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  districtState: PropTypes.object,
  changeFiltersCallback: PropTypes.func,
  rankingLinkCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  // search: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeFiltersCallback: filters => {
      dispatch(districtActions.changeFiltersAction(filters));
    },
    rankingLinkCallback: link => {
      dispatch(push(link));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PresidentialElectionPage);
