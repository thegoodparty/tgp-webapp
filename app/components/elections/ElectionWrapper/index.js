import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { Body, H1 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import AmaContainer from 'containers/shared/AmaContainer';
import VerifyVoteWrapper from 'components/voterize/VerifyVoteWrapper';
import articlesHelper from 'helpers/articlesHelper';
import {
  deleteSignupRedirectCookie,
  getSignupRedirectCookie,
} from 'helpers/cookieHelper';
import VsList from '../VsList';
import FiltersPopup from './FiltersPopup';
import BottomPopup from '../../shared/BottomPopup';
import { shortToLongState } from '../../../helpers/electionsHelper';
import { numberNth } from '../../../helpers/numberHelper';
import ChoiceModal from './ChoiceModal';
import ShareModal from './ShareModal';

const Description = styled(Body)`
  margin: 10px 0 22px;
`;
const GoodCandidate = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const ElectionWrapper = ({
  chamber,
  user,
  displayChamber,
  ranking,
  candidates = {},
  content,
  state,
  districtNumber,
  saveRankingCallback,
  refreshCountCallback,
  deleteCandidateRankingCallback,
  clearBlocCandidateCallback,
  blocCandidate,
  joinCandidate,
  growCandidate,
  clearJoinCandidateCallback,
  clearGrowCandidateCallback,
  skipVerifyVoterCallback,
  postRegisterJoin,
  isVoterRegistered,
  verifyVoterCallback,
  incumbent,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVoterVerify, setShowVoterVerify] = useState(false);
  const [choiceModalCandidate, setChoiceModalCandidate] = useState(false);
  const [isExternalLink, setIsExternalLink] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateRanking, setCandidateRanking] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cookieRedirect = getSignupRedirectCookie();
    if(cookieRedirect && candidates.length > 0) {
      const { candidateId, rank } = cookieRedirect.options;
      const candidate = candidates?.find(item => item.id === candidateId);
      setShowVoterVerify(true);
      setSelectedCandidate(candidate);
      setCandidateRanking(rank);
      setShowShareModal(false);
      deleteSignupRedirectCookie();
    }
  }, []);
  useEffect(() => {
    if (blocCandidate) {
      setIsExternalLink(true);
      setChoiceModalCandidate(blocCandidate);
      setShowChoiceModal(true);
    }
  }, [blocCandidate]);
  useEffect(() => {
    if (isVoterRegistered !== null && showVoterVerify) {
      selectCandidate(selectedCandidate, candidateRanking);
      setChoiceModalCandidate(selectedCandidate);
      setShowChoiceModal(true);
      setShowVoterVerify(false);
    }
  }, [isVoterRegistered]);
  useEffect(() => {
    if (joinCandidate) {
      const rank = findNextRank(joinCandidate);
      if (user) {
        setShowVoterVerify(true);
      } else {
        selectCandidate(joinCandidate, rank);
      }
      setSelectedCandidate(joinCandidate);
      setCandidateRanking(rank);
      clearJoinCandidateCallback();
      
    }
  }, [joinCandidate]);

  useEffect(() => {
    if (growCandidate) {
      setChoiceModalCandidate(growCandidate);
      setShowShareModal(true);
      clearGrowCandidateCallback();
    }
  }, [growCandidate]);

  useEffect(() => {
    if (user && postRegisterJoin?.candidate) {
      handleChoiceCallback(postRegisterJoin.candidate, postRegisterJoin.rank);
    }
  }, [postRegisterJoin]);

  const selectCandidate = (candidate, rank) => {
    saveRankingCallback(user, candidate, rank, chamber, state, districtNumber);
  };

  const openFiltersCallback = () => {
    setShowFilters(true);
  };

  const hideFilters = () => {
    setShowFilters(false);
  };

  let articles = [];
  if (content?.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }

  let title = `${displayChamber} Elections`;
  if (chamber === 'senate' && state) {
    const stateLong = shortToLongState[state.toUpperCase()];
    title = `${stateLong} ${displayChamber} Election`;
  } else if (chamber === 'house' && state && districtNumber) {
    const stateLong = shortToLongState[state.toUpperCase()];
    title = `${stateLong}'s ${numberNth(
      districtNumber,
    )} District ${displayChamber} Election`;
  }

  // let chamberCount = 0;
  let votesNeeded = 0;

  if (candidates) {
    votesNeeded = candidates.threshold;
  }

  const handleChoiceCallback = (candidate, rank) => {
    if (candidate.id < 0) {
      candidate.ranking = candidates.goodEmptyBloc;
    }

    if (user) {
      setShowVoterVerify(true);
      setSelectedCandidate(candidate);
      setCandidateRanking(rank);
      setShowShareModal(false);
    } else {
      selectCandidate(candidate, rank);
    }
  };

  const handleDeselectCandidate = rank => {
    deleteCandidateRankingCallback(
      { ...rank, chamber },
      user,
      chamber,
      state,
      districtNumber,
    );
  };

  const handleGrowCallback = candidate => {
    setChoiceModalCandidate(candidate);
    setShowChoiceModal(false);
    setShowShareModal(true);
  };

  const onCloseChoiceModal = () => {
    setShowChoiceModal(false);
    setChoiceModalCandidate(false);
    setIsExternalLink(false);
    clearBlocCandidateCallback();
    refreshCountCallback(state, districtNumber);
  };

  const onShareChoiceModal = () => {
    setShowChoiceModal(false);
    setShowShareModal(true);
    refreshCountCallback(state, districtNumber);
  };

  const onJoinChoiceModal = candidateJoined => {
    setShowChoiceModal(false);

    setShowShareModal(true);
    const rank = findNextRank(candidateJoined);
    selectCandidate(candidateJoined, rank);

    refreshCountCallback(state, districtNumber);
  };

  const findNextRank = candidate => {
    let nextChoice = 1;
    const { good, notGood, unknown } = candidates;
    [...good, ...notGood, ...unknown].forEach(candidate => {
      if (
        ranking[candidate.id] &&
        ranking[candidate.id].isIncumbent === !!candidate.isIncumbent
      ) {
        nextChoice++;
      }
    });
    return nextChoice;
  };

  const onCloseShareModal = () => {
    setShowShareModal(false);
    setChoiceModalCandidate(false);
    clearBlocCandidateCallback();
    setIsExternalLink(false);
    // refreshCountCallback(state, districtNumber);
  };

  const stateUpper = state ? state.toUpperCase() : '';

  const suffixText =
    chamber === 'presidential'
      ? ' (270 ELECTORS)'
      : ` IN ${stateUpper}${districtNumber ? `-${districtNumber}` : ''}`;

  return (
    <PageWrapper>
      {candidates ? (
        <>
          <H1 data-cy="title">{title}</H1>
          <Description data-cy="description">
            {candidates.good.length > 0 ? (
              <>
                Join any{' '}
                <Link to="?article=1ic6T6fhH0jZLNvX5aZkDe" data-cy="article">
                  candidate voting blocs
                </Link>{' '}
                and we&apos;ll let you know if they grow big enough to win!
              </>
            ) : (
              <>
                We&apos;re looking for{' '}
                <GoodCandidate
                  onClick={openFiltersCallback}
                  data-cy="good-candidate-option"
                >
                  good candidate options
                </GoodCandidate>{' '}
                in this race. Join #GoodBloc to be notified as soon as we find
                any good candidates.
              </>
            )}
          </Description>

          <VsList
            candidates={candidates}
            openFiltersCallback={openFiltersCallback}
            ranking={ranking}
            handleChoiceCallback={handleChoiceCallback}
            handleGrowCallback={handleGrowCallback}
            handleDeselectCandidate={handleDeselectCandidate}
            goodBloc={`${stateUpper}${districtNumber || ''}`}
            districtNumber={districtNumber}
            chamber={chamber}
            state={stateUpper}
            user={user}
            votesNeeded={votesNeeded}
            incumbent={incumbent}
          />

          <TopQuestions articles={articles} />
          <AmaContainer />
          <BottomPopup open={showFilters} handleClose={hideFilters}>
            <FiltersPopup />
          </BottomPopup>
        </>
      ) : (
        <LoadingAnimation />
      )}

      <ChoiceModal
        open={showChoiceModal}
        closeCallback={onCloseChoiceModal}
        shareCallback={onShareChoiceModal}
        joinCallback={onJoinChoiceModal}
        candidate={choiceModalCandidate}
        // candidate={candidates.good ? candidates.good[0] : null}
        votesNeeded={votesNeeded}
        chamberCount={
          choiceModalCandidate.ranking + choiceModalCandidate.likelyVoters
        }
        user={user}
        animateCount={!isExternalLink}
        userState={candidates.userState}
        suffixText={suffixText}
        chamber={chamber}
        state={state}
        district={districtNumber}
        isExternalLink={isExternalLink}
      />
      <ShareModal
        open={showShareModal}
        closeCallback={onCloseShareModal}
        candidate={choiceModalCandidate}
        user={user}
        chamber={chamber}
        isExternalLink={isExternalLink}
      />
      <VerifyVoteWrapper
        open={showVoterVerify}
        user={user}
        verifyVoterCallback={verifyVoterCallback}
        skipVerifyVoterCallback={skipVerifyVoterCallback}
      />
    </PageWrapper>
  );
};

ElectionWrapper.propTypes = {
  chamber: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  displayChamber: PropTypes.string,
  ranking: PropTypes.object,
  state: PropTypes.string,
  districtNumber: PropTypes.string,
  candidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blocCandidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  joinCandidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  growCandidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  saveRankingCallback: PropTypes.func,
  refreshCountCallback: PropTypes.func,
  deleteCandidateRankingCallback: PropTypes.func,
  clearBlocCandidateCallback: PropTypes.func,
  clearJoinCandidateCallback: PropTypes.func,
  clearGrowCandidateCallback: PropTypes.func,
  postRegisterJoin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  verifyVoterCallback: PropTypes.func,
  skipVerifyVoterCallback: PropTypes.func,
  isVoterRegistered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ElectionWrapper;
