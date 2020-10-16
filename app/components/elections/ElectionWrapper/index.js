import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { Body, H1 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import AmaContainer from 'containers/shared/AmaContainer';
import articlesHelper from 'helpers/articlesHelper';
import BottomPopup from 'components/shared/BottomPopup';
import { shortToLongState } from 'helpers/electionsHelper';
import { numberNth } from 'helpers/numberHelper';

import VsList from '../VsList';
import FiltersPopup from './FiltersPopup';

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
  deleteCandidateRankingCallback,

  incumbent,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleDeselectCandidate = rank => {
    deleteCandidateRankingCallback(rank, user);
  };

  const stateUpper = state ? state.toUpperCase() : '';

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
                  crowd-voting campaign
                </Link>{' '}
                and we&apos;ll let you know if it grows big enough to win!
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
            handleDeselectCandidate={handleDeselectCandidate}
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
  deleteCandidateRankingCallback: PropTypes.func,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ElectionWrapper;
