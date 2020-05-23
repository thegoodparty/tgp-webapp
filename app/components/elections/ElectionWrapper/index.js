import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import heartImg from 'images/heart.svg';
import UsMapImage from 'images/us-map.svg';
import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body, Body13, H1, H3 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import AmaContainer from 'containers/shared/AmaContainer';
import articlesHelper from 'helpers/articlesHelper';
import GrayWrapper from 'components/shared/GrayWrapper';
import VsList from '../VsList';
import FiltersPopup from './FiltersPopup';
import BottomPopup from '../../shared/BottomPopup';
import { shortToLongState } from '../../../helpers/electionsHelper';
import { numberFormatter, numberNth } from '../../../helpers/numberHelper';
import SupportersProgressBar from '../SupportersProgressBar';
import ChoiceModal from './ChoiceModal';
import { getCookie, setCookie } from '../../../helpers/cookieHelper';
import ShareModal from './ShareModal';

const Description = styled(Body)`
  margin: 10px 0 22px;
`;
const GoodCandidate = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const AlertWrapper = styled.div`
  position: relative;
  padding: 1.5rem 2rem;
  border: solid 1px red;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 4rem;
  }
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Row = styled.div`
  margin: 24px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const SupportersWrapper = styled.div`
  flex: 6;
`;

const SupportersRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const SupportersCount = styled(H1)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const HeartImg = styled.img`
  height: auto;
  width: 36px;
  margin-right: 8px;
`;

const SuppoetersBody = styled(Body)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const MapWrapper = styled.div`
  flex: 4;
  img {
    width: 100%;
    height: auto;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 3;
  }
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
  rankingAllowed,
  saveRankingCallback,
  editModeCallback,
  refreshCountCallback,
  deleteCandidateRankingCallback,
  blocCandidate,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showRankAlert, setShowRankAlert] = React.useState(false);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(true);
  const [choiceModalCandidate, setChoiceModalCandidate] = useState(false);

  useEffect(() => {
    if (blocCandidate) {
      setChoiceModalCandidate(blocCandidate);
      setShowShareModal(true);
    }
  }, [blocCandidate]);

  const { topRank } = candidates;

  const selectCandidate = async (candidate, rank) => {
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

  const handleCloseAlert = () => {
    setShowRankAlert(false);
  };

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

  const handleChoiceCallback = async (candidate, rank) => {
    if (rankingAllowed) {
      setChoiceModalCandidate(candidate);
      selectCandidate(candidate, rank);
      setShowChoiceModal(true);
      setShowShareModal(false);
    } else {
      // ranking not allowed
      setShowRankAlert(true);
    }
  };

  const handleDeselectCandidate = async rank => {
    // await deSelectCandidate(candidate.id);
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
    refreshCountCallback(state, districtNumber);
  };

  const onShareChoiceModal = () => {
    setShowChoiceModal(false);
    setShowShareModal(true);
    refreshCountCallback(state, districtNumber);
  };

  const onCloseShareModal = () => {
    setShowShareModal(false);
    setChoiceModalCandidate(false);
    // refreshCountCallback(state, districtNumber);
  };

  const stateUpper = state ? state.toUpperCase() : '';

  const suffixText =
    chamber === 'presidential'
      ? ' (270 ELECTORS)'
      : ` IN ${stateUpper}${districtNumber ? districtNumber : ''}`;

  return (
    <GrayWrapper>
      {candidates ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader />
            <H1>{title}</H1>
            <Row>
              <SupportersWrapper>
                <SupportersRow>
                  <HeartImg src={heartImg} alt="tgp" />
                  <SupportersCount>
                    {numberFormatter(topRank)}{' '}
                    {topRank === 1 ? 'Person' : 'People'}{' '}
                  </SupportersCount>
                </SupportersRow>
                <SuppoetersBody>in top voting bloc so far</SuppoetersBody>
                <SupportersProgressBar
                  votesNeeded={votesNeeded}
                  peopleSoFar={topRank}
                  userState={candidates.userState}
                  showSupporters={false}
                  suffixText={suffixText}
                  alignLeft
                />
              </SupportersWrapper>
              <MapWrapper>
                <img src={UsMapImage} alt="" />
              </MapWrapper>
            </Row>
            <Description>
              {candidates.good.length > 0 ? (
                <>
                  Join any candidate voting blocs and we&apos;ll let you know if
                  they grow big enough to win!
                </>
              ) : (
                <>
                  We&apos;re looking for{' '}
                  <GoodCandidate onClick={openFiltersCallback}>
                    good candidate options
                  </GoodCandidate>{' '}
                  in this race. Join #GoodBloc{stateUpper}
                  {districtNumber} to be notified as soon as we find any good
                  candidates.
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
              goodBlock={`${stateUpper}${districtNumber ? districtNumber : ''}`}
              districtNumber={districtNumber}
              chamber={chamber}
              state={stateUpper}
            />

            <TopQuestions articles={articles} />
          </Wrapper>
          <AmaContainer />
          <BottomPopup open={showFilters} handleClose={hideFilters}>
            <FiltersPopup />
          </BottomPopup>
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
      <Dialog
        onClose={handleCloseAlert}
        aria-labelledby="Ranking not Allowed"
        open={showRankAlert}
      >
        <AlertWrapper>
          <CloseWrapper onClick={handleCloseAlert}>
            <CloseIcon />
          </CloseWrapper>
          <H3>
            You are not allowed to to Rank Candidates for an election that is
            not in your district.
          </H3>
        </AlertWrapper>
      </Dialog>
      <ChoiceModal
        open={showChoiceModal}
        closeCallback={onCloseChoiceModal}
        shareCallback={onShareChoiceModal}
        candidate={choiceModalCandidate}
        votesNeeded={votesNeeded}
        chamberCount={
          choiceModalCandidate.id < 0
            ? candidates.goodEmptyBlock
            : choiceModalCandidate.ranking
        }
        user={user}
        animateCount
        userState={candidates.userState}
        suffixText={suffixText}
        chamber={chamber}
      />
      <ShareModal
        open={showShareModal}
        closeCallback={onCloseShareModal}
        candidate={choiceModalCandidate}
        // candidate={candidates.good ? candidates.good[0] : null}
        user={user}
        chamber={chamber}
      />
    </GrayWrapper>
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
  rankingAllowed: PropTypes.bool,
  saveRankingCallback: PropTypes.func,
  refreshCountCallback: PropTypes.func,
  deleteCandidateRankingCallback: PropTypes.func,
};

export default ElectionWrapper;
