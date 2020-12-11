import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ShareButtons from './ShareButtons';

const Wrapper = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 20px 5px;

  width: 100%;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .share-button {
    margin: 0 5px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-basis: calc(50% - 20px);
      margin: 0 10px;
    }

    button {
      @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.md}) {
        margin-top: 0 !important;
      }
    }
  }

  .ended {
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 0;
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
  addVoteCallback,
  openShareCallback,
}) => (
  <Wrapper>
    <ShareButtons
      candidate={candidate}
      chamberRank={chamberRank}
      district={district}
      chamberName={chamberName}
      user={user}
      deleteCandidateRankingCallback={deleteCandidateRankingCallback}
      state={state}
      addVoteCallback={addVoteCallback}
      openShareCallback={openShareCallback}
    />
  </Wrapper>
);

BottomButtons.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  state: PropTypes.string,
  district: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  addVoteCallback: PropTypes.func,
  openShareCallback: PropTypes.func,
};

export default BottomButtons;
