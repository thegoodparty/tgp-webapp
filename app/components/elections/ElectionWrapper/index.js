import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import Wrapper from 'components/shared/Wrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body, H1, H2, H3 } from 'components/shared/typogrophy';
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

const ElectionWrapper = ({
  chamber,
  candidates = {},
  content,
  filters,
  state,
  districtNumber,
  rankingAllowed,
  changeFiltersCallback,

  rankingLinkCallback,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showRankAlert, setShowRankAlert] = React.useState(false);

  const openFiltersCallback = () => {
    setShowFilters(true);
  };

  const hideFilters = () => {
    setShowFilters(false);
  };

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }

  const handleRankButtonClick = () => {
    if (rankingAllowed) {
      if (chamber === 'Presidential') {
        rankingLinkCallback('/elections/rank-candidates/presidential');
        return;
      }
      if (chamber === 'Senate') {
        rankingLinkCallback(`/elections/rank-candidates/senate/${state}`);
        return;
      }
      if (chamber === 'House') {
        rankingLinkCallback(
          `/elections/rank-candidates/house/${state}/${districtNumber}`,
        );
        return;
      }
      rankingLinkCallback('/elections/rank-candidates/presidential');
      return;
    }
    // ranking not allowed
    setShowRankAlert(true);
  };

  const handleCloseAlert = () => {
    setShowRankAlert(false);
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
              <BlueButton
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleRankButtonClick}
              >
                RANK YOUR CHOICES
              </BlueButton>
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
  rankingLinkCallback: PropTypes.func,
  filters: PropTypes.object,
  rankingAllowed: PropTypes.bool,
};

export default ElectionWrapper;
