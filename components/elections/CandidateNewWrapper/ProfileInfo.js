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
import { PurpleButton } from 'components/shared/buttons';
import { Body9, Body11, Body19 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';
import RecentlyJoined from './RecentlyJoined';

const ShareIconPurple = '/images/purple-share.svg';
const HeartIconWhite = '/images/white-heart.svg';

const ProfileInfoWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: -1px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 24px 24px 32px 24px;
  text-align: center;
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
  text-transform: uppercase;
  margin-bottom: 8px;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-size: 11px;
  }
`;

const RaceName = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple2};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 24px;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-size: 11px;
  }
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
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const AvatarWrapper = styled(Grid)`
  && {
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 20px;
    }
  }
`;
const NameWrapper = styled(Grid)`
  && {
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-left: 20px;
    }
  }
`;
function ProfileInfo({ candidate, isMobile }) {
  console.log('cand', candidate);
  const {
    firstName,
    lastName,
    chamber,
    image,
    race,
    party,
    likelyVoters,
    votesNeeded,
  } = candidate;
  return (
    <ProfileInfoWrapper>
      <AvatarWrapper container>
        <Grid item xs={3} sm={12}>
          <ChallengerAvatar avatar={image} party={party} isFull={isMobile} />
        </Grid>
        <NameWrapper item xs={9} sm={12}>
          <CandidateName>
            {firstName} {lastName}
          </CandidateName>
          <PartyName>Running as {party}</PartyName>
          <RaceName>{race}</RaceName>
        </NameWrapper>
      </AvatarWrapper>
      <Grid container>
        <Grid row xs={6}>
          <LikelyVoters>
            <span>{likelyVoters}</span> likely voters
          </LikelyVoters>
        </Grid>
        <Grid row xs={6}>
          <LikelyVoters>
            <span /> people endorsing
          </LikelyVoters>
        </Grid>
      </Grid>
      <SupportersProgressBar
        showSupporters={false}
        votesNeeded={votesNeeded}
        peopleSoFar={900}
        fullWidth
      />

      <Box style={{ marginTop: 24 }}>
        <PurpleButton fullWidth className="outline">
          <InnerButton>
            <Img src={ShareIconPurple} alt="share" />
            <span>SHARE</span>
          </InnerButton>
        </PurpleButton>
      </Box>
      <Box style={{ marginTop: 24 }}>
        <PurpleButton fullWidth>
          <InnerButton>
            <Img src={HeartIconWhite} alt="share" />
            <span>ENDORSE</span>
          </InnerButton>
        </PurpleButton>
      </Box>
      <EndorsementDescription>
        Endorsements are a good way to show and grow real grassroots support for
        a candidate. <a>Read more</a>
      </EndorsementDescription>
      <Hidden xsDown>
        <RecentlyJoined />
      </Hidden>
    </ProfileInfoWrapper>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default ProfileInfo;
