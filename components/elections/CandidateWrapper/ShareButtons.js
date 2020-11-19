import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Link from 'next/link';

import { Body13 } from 'components/shared/typogrophy';
import {
  candidateRanking,
  candidateRankObj,
  rankPageGrowLink,
  rankPageJoinLink,
} from 'helpers/electionsHelper';
import { BlueButton, OutlinedButton } from 'components/shared/buttons';
import ShareIconWhite from 'public/images/icons/share-icon-white.svg';
import ShareIcon from 'public/images/icons/share-icon.svg';
import { numberNth } from 'helpers/numberHelper';
import HeartIcon from 'public/images/white-heart.svg';

const RankWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  cursor: pointer;
  padding: 20px 0 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 20px 0 12px;
  }
`;

const CheckMark = styled(CheckIcon)`
  color: ${({ theme }) => theme.colors.lightBlue};
  && {
    font-size: 13px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px;
    }
  }
`;

const ChosenCand = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  margin: 0 6px;
  text-transform: uppercase;
`;

const CloseIcon = styled(HighlightOffIcon)`
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
  && {
    font-size: 13px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 16px;
    }
  }
`;

const InnerButton = styled.div`
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 24px;
  width: 16px;
  height: auto;

  &.heart {
    top: 4px;
    width: 24px;
  }
`;

const Ended = styled(Body13)`
  margin-top: 36px;
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 600;
  text-align: center;
`;

const ShareButtons = ({
  candidate,
  deleteCandidateRankingCallback,
  chamberRank,
  addVoteCallback,
  openShareCallback,
}) => {
  const rank = candidateRanking(chamberRank, candidate);
  const rankObj = candidateRankObj(chamberRank, candidate);

  return (
    <>
      <div className="share-button">
        {rank ? (
          <BlueButton fullWidth onClick={openShareCallback}>
            <InnerButton>
              <Img src={ShareIconWhite} alt="share" />
              SHARE
            </InnerButton>
          </BlueButton>
        ) : (
          <OutlinedButton active fullWidth onClick={openShareCallback}>
            <InnerButton>
              <Img src={ShareIcon} alt="share" />
              SHARE
            </InnerButton>
          </OutlinedButton>
        )}
      </div>
      <Ended className="ended">Crowd-Voting Campaign has Ended</Ended>
      {/*{rank ? (*/}
      {/*  <RankWrapper*/}
      {/*    className="share-button"*/}
      {/*    onClick={() => deleteCandidateRankingCallback(rankObj)}*/}
      {/*  >*/}
      {/*    <CheckMark /> <ChosenCand>{numberNth(rank)} CHOICE </ChosenCand>*/}
      {/*    <CloseIcon />*/}
      {/*  </RankWrapper>*/}
      {/*) : (*/}
      {/*  <div className="share-button">*/}
      {/*    <BlueButton*/}
      {/*      fullWidth*/}
      {/*      style={{ marginTop: '24px' }}*/}
      {/*      onClick={addVoteCallback}*/}
      {/*    >*/}
      {/*      <InnerButton>*/}
      {/*        <Img src={HeartIcon} alt="vote" className="heart" />*/}
      {/*        ADD YOUR VOTE*/}
      {/*      </InnerButton>*/}
      {/*    </BlueButton>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
};

ShareButtons.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  addVoteCallback: PropTypes.func,
  openShareCallback: PropTypes.func,
};

export default ShareButtons;
