/**
 *
 * RankPresidentialCandidatesPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';
import candidateReducer from 'containers/elections/PresidentialCandidatePage/reducer';
import candidateSaga from 'containers/elections/PresidentialCandidatePage/saga';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import candidateActions from 'containers/elections/PresidentialCandidatePage/actions';

import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import makeSelectCandidate from 'containers/elections/PresidentialCandidatePage/selectors';
import RankPresidentialCandidatesWrapper from 'components/elections/RankPresidentialCandidatesWrapper';

export function RankPresidentialCandidatesPage({
  districtState,
  candidateState,
  handleRankingCallback,
  saveRankingCallback,
  dispatch,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  const { presidential } = districtState;
  const { presidentialRank } = candidateState;

  useEffect(() => {
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
    if (!presidentialRank) {
      dispatch(candidateActions.loadRankingFromCookieAction());
    }
  }, []);

  const childProps = {
    candidates: presidential,
    handleRankingCallback,
    saveRankingCallback,
    presidentialRank,
  };

  return (
    <div>
      <Helmet>
        <title>Rank Presidential Candidates | The Good Party</title>
        <meta
          name="description"
          content="Rank Presidential Candidates | The Good Party"
        />
      </Helmet>
      <RankPresidentialCandidatesWrapper {...childProps} />
    </div>
  );
}

RankPresidentialCandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  districtState: PropTypes.object,
  candidateState: PropTypes.object,
  handleRankingCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleRankingCallback: rankingOrder => {
      dispatch(
        candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
      );
      dispatch(push('/you/register'));
    },
    saveRankingCallback: rankingOrder => {
      dispatch(
        candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
      );
    },
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RankPresidentialCandidatesPage);
