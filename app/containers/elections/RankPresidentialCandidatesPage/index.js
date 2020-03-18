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
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import candidateActions from 'containers/elections/CandidatePage/actions';
import userActions from 'containers/you/YouPage/actions';

import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import RankPresidentialCandidatesWrapper from 'components/elections/RankPresidentialCandidatesWrapper';
import makeSelectUser from '../../you/YouPage/selectors';

export function RankPresidentialCandidatesPage({
  districtState,
  candidateState,
  handleRankingCallback,
  saveRankingCallback,
  dispatch,
  userState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  const { presidential } = districtState;
  const { user } = userState;

  let presidentialRank;
  if (user && user.presidentialRank) {
    if (typeof user.presidentialRank === 'string') {
      presidentialRank = JSON.parse(user.presidentialRank);
    }
  } else if (candidateState && candidateState.presidentialRank) {
    presidentialRank = candidateState.presidentialRank;
  }

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
    user,
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
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleRankingCallback: (rankingOrder, user) => {
      dispatch(
        candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
      );
      if (user) {
        dispatch(push('/you/share'));
        // TODO: save choices to user here
      } else {
        dispatch(push('/you/register'));
      }
    },
    saveRankingCallback: rankingOrder => {
      dispatch(
        candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
      );
      dispatch(userActions.updatePresidentialRankAction(rankingOrder));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RankPresidentialCandidatesPage);
