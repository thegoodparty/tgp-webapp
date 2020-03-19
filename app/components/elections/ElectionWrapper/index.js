import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body, H1 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import AmaContainer from 'containers/shared/AmaContainer';
import articlesHelper from 'helpers/articlesHelper';
import BlueButton from 'components/shared/buttons/BlueButton';
import GrayWrapper from 'components/shared/GrayWrapper';
import GoodPartyStats from '../GoodPartyStats';
import VsList from '../VsList';
import FiltersPopup from './FiltersPopup';
import BottomPopup from '../../shared/BottomPopup';

const Description = styled(Body)`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 16px auto 24px;
`;

const ElectionWrapper = ({
  chamber,
  candidates = {},
  content,
  changeFiltersCallback,
  filters,
  state,
  districtNumber,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const openFiltersCallback = () => {
    console.log('here');
    setShowFilters(true);
  };

  const hideFilters = () => {
    setShowFilters(false);
  };

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }

  const rankPage = () => {
    console.log(chamber);
    if (chamber === 'Presidential') {
      return '/elections/rank-candidates/presidential';
    }
    if (chamber === 'Senate') {
      return `/elections/rank-candidates/senate/${state}`;
    }
    if (chamber === 'House') {
      return `/elections/rank-candidates/house/${state}/${districtNumber}`;
    }
    return '/elections/rank-candidates/presidential';
  };

  return (
    <GrayWrapper>
      {candidates ? (
        <>
          <Nav />
          <Wrapper>
            <MobileHeader />

            <H1>{chamber} Elections</H1>
            <Description>
              We recommend candidates who are not beholden to Big Money, but you
              can set your own Filters and Rank Your Choices.
            </Description>
            <ButtonWrapper>
              <Link to={rankPage()}>
                <BlueButton
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  RANK YOUR CHOICES
                </BlueButton>
              </Link>
            </ButtonWrapper>
            <VsList
              candidates={candidates}
              openFiltersCallback={openFiltersCallback}
            />

            <GoodPartyStats />
            <TopQuestions articles={articles} />
          </Wrapper>
          <AmaContainer />
          <BottomPopup open={showFilters} handleClose={hideFilters}>
            <FiltersPopup
              changeFiltersCallback={changeFiltersCallback}
              filters={filters}
            />
          </BottomPopup>
        </>
      ) : (
        <Wrapper>
          <MobileHeader />
          <LoadingAnimation />
        </Wrapper>
      )}
    </GrayWrapper>
  );
};

ElectionWrapper.propTypes = {
  chamber: PropTypes.string,
  state: PropTypes.string,
  districtNumber: PropTypes.string,
  candidates: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  changeFiltersCallback: PropTypes.func,
  filters: PropTypes.object,
};

export default ElectionWrapper;
