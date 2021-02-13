/**
 *
 * ProfileInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Sticky from 'react-sticky-el';

import { PurpleButton } from 'components/shared/buttons';
import { partyResolver } from 'helpers/electionsHelper';

import { Body9, Body11, Body19 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';
import RecentlyJoined from './RecentlyJoined';
import { kFormatter, numberFormatter } from '../../../helpers/numberHelper';

const ShareIconPurple = '/images/purple-share.svg';
const HeartIconWhite = '/images/white-heart.svg';

const ScrollArea = styled.div`
  height: calc(100% - 80px - 65px);
  position: relative;
  top: 0;
  width: 416px;
  margin-top: -85px;
`;

const Inner = styled.div`
  padding-top: 85px;
`;

const ProfileInfoWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: -1px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 24px 24px 32px 24px;
  text-align: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 40px;
    box-shadow: none;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 77px;
    box-shadow: none;
  }
`;

const CandidateName = styled(Body19)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: center;
  margin-top: 12px;
  margin-bottom: 10px;
  font-weight: 800;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-size: 16px;
  }
`;

const PartyName = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: center;
  margin-bottom: 8px;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-size: 11px;
  }
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const LikelyVoters = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  span {
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 16px;
    font-weight: 600;
  }
`;

const Img = styled.img`
  top: 4px;
  position: relative;
  height: 16px;
  margin-right: 10px;

  &.heart {
    top: 4px;
    width: 24px;
  }
`;

const InnerButton = styled.div`
  font-size: 14px;
`;

const EndorsementDescription = styled(Body11)`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const AvatarWrapper = styled(Grid)`
  && {
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 50px;
      align-items: center;
    }
  }
`;
const NameWrapper = styled(Grid)`
  && {
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-left: 20px;
      & > div {
        color: #fff;
        line-height: 25px;
      }
      z-index: 1000;
    }
  }
`;
function ProfileInfo({ candidate, isMobile, endorseCallback }) {
  console.log('cand', candidate);
  const {
    firstName,
    lastName,
    image,
    race,
    party,
    likelyVoters,
    votesNeeded,
  } = candidate;

  const WrapperElement = ({ children }) =>
    isMobile ? (
      <div>{children}</div>
    ) : (
      <ScrollArea className="scroll-area">
        <Sticky
          boundaryElement=".scroll-area"
          hideOnBoundaryHit={false}
          dontUpdateHolderHeightWhenSticky
        >
          <Inner className="inner">{children}</Inner>
        </Sticky>
      </ScrollArea>
    );

  const endorsingCount = 0;
  return (
    <WrapperElement>
      <ProfileInfoWrapper>
        <AvatarWrapper container>
          <Grid item xs={3} sm={12}>
            <ChallengerAvatar avatar={image} party={party} isSmall={isMobile} />
          </Grid>
          <NameWrapper item xs={9} sm={12}>
            <CandidateName>
              {firstName} {lastName}
            </CandidateName>
            <PartyName>
              <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>{' '}
              Running for {race}
            </PartyName>
          </NameWrapper>
        </AvatarWrapper>
        <Grid container>
          <Grid row xs={6}>
            <LikelyVoters>
              <span>{kFormatter(likelyVoters + endorsingCount)}</span> likely
              voters
            </LikelyVoters>
          </Grid>
          <Grid row xs={6}>
            <LikelyVoters>
              <span>{endorsingCount}</span> people endorsing
            </LikelyVoters>
          </Grid>
        </Grid>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={votesNeeded}
          peopleSoFar={endorsingCount + likelyVoters}
          fullWidth
        />

        <Box style={{ marginTop: 24 }}>
          <PurpleButton fullWidth className="outline">
            <InnerButton>
              <Img src={ShareIconPurple} alt="share" />
              <span>SHARE CAMPAIGN</span>
            </InnerButton>
          </PurpleButton>
        </Box>
        <Box style={{ marginTop: 8 }}>
          <PurpleButton fullWidth onClick={endorseCallback}>
            <InnerButton>
              <Img src={HeartIconWhite} alt="share" />
              <span>ADD YOUR NAME</span>
            </InnerButton>
          </PurpleButton>
        </Box>
        <EndorsementDescription>
          Adding your name is a free way to show support for grassroots
          candidates. <a>Read more</a>
        </EndorsementDescription>
        <Hidden xsDown>
          <RecentlyJoined />
        </Hidden>
      </ProfileInfoWrapper>
    </WrapperElement>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
  isMobile: PropTypes.bool,
  endorseCallback: PropTypes.func,
};

export default ProfileInfo;
