import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sticky from 'react-sticky-el';

import ShareButtons from './ShareButtons';

const Wrapper = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 60px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 10px;
    margin-bottom: 0;
  }

  .share-button {
    flex-basis: calc(50% - 10px);
    margin: 0 5px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-basis: calc(50% - 20px);
      margin: 0 10px;
    }

    button {
      margin-top: 0 !important;
    }
  }
`;

const BottomButtons = ({
  candidate,
  chamberName,
  state,
  district,
  deleteCandidateRankingCallback,
  chamberRank,
  user,
}) => (
  <Sticky mode="bottom" boundaryElement=".bottom-boundry-element">
    <Wrapper>
      <ShareButtons
        candidate={candidate}
        chamberRank={chamberRank}
        district={district}
        chamberName={chamberName}
        user={user}
        deleteCandidateRankingCallback={deleteCandidateRankingCallback}
        state={state}
        withIcons={false}
      />
    </Wrapper>
  </Sticky>
);

BottomButtons.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  state: PropTypes.string,
  district: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
};

export default BottomButtons;
