import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sticky from 'react-sticky-el';

import CheckIcon from '@material-ui/icons/Check';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { Link } from 'react-router-dom';

import { Body13 } from 'components/shared/typogrophy';
import {
  candidateRanking,
  candidateRankObj,
  rankPageGrowLink,
  rankPageJoinLink,
} from 'helpers/electionsHelper';
import { BlueButton, OutlinedButton } from 'components/shared/buttons';
import ShareIconWhite from 'images/icons/share-icon-white.svg';
import ShareIcon from 'images/icons/share-icon.svg';
import { numberNth } from 'helpers/numberHelper';
import HeartIcon from 'images/white-heart.svg';

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

const ShareButtons = ({
  candidate,
  chamberName,
  deleteCandidateRankingCallback,
  chamberRank,
  user,
  withIcons = true,
}) => {
  const { state, district } = candidate;
  const rank = candidateRanking(chamberRank, candidate);
  const rankObj = candidateRankObj(chamberRank, candidate);
  return (
    <>
      <Link
        to={rankPageGrowLink(candidate, chamberName, state, district)}
        className="share-button"
      >
        {rank ? (
          <BlueButton fullWidth>
            <InnerButton>
              {withIcons && <Img src={ShareIconWhite} alt="share" />}
              SHARE
            </InnerButton>
          </BlueButton>
        ) : (
          <OutlinedButton active fullWidth>
            <InnerButton>
              {withIcons && <Img src={ShareIcon} alt="share" />}
              SHARE
            </InnerButton>
          </OutlinedButton>
        )}
      </Link>
      {rank ? (
        <RankWrapper
          className="share-button"
          onClick={() =>
            deleteCandidateRankingCallback(
              { ...rankObj, chamber: chamberName },
              user,
            )
          }
        >
          <CheckMark /> <ChosenCand>{numberNth(rank)} CHOICE </ChosenCand>
          <CloseIcon />
        </RankWrapper>
      ) : (
        <Link
          to={rankPageJoinLink(user, candidate, chamberName, state, district)}
          data-cy="rank-button"
          className="share-button"
        >
          <BlueButton fullWidth style={{ marginTop: '24px' }}>
            <InnerButton>
              {withIcons && (
                <Img src={HeartIcon} alt="vote" className="heart" />
              )}
              ADD YOUR VOTE
            </InnerButton>
          </BlueButton>
        </Link>
      )}
    </>
  );
};

ShareButtons.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  withIcons: PropTypes.bool,
};

export default ShareButtons;
