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
import { PurpleButton } from 'components/shared/buttons';
import { Body9, Body11, Body13, Body19 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';
const ShareIconPurple = '/images/purple-share.svg';
const HeartIconWhite = '/images/white-heart.svg';
const PeopleJoinedIconPurple = '/images/people-joined-purple.svg';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

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
`;

const PartyName = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const RaceName = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple2};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 24px;
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

const RecentActivity = styled.div`
  margin-top: 32px;
`;
const EndorsementDescription = styled(Body11)`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const RecentActivityTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;
  font-weight: 600;
  text-align: left;
`;

const JoinedCount = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: left;
  margin-left: 16px;
`;
const JoinName = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  text-align: left;
  margin-left: 16px;
  font-size: 15px;
  &.joined-time {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;
const JoinChamber = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: left;
  margin-left: 6px;
  font-size: 13px;
`;

const RecentJoin = styled(Grid)`
  && {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.grayD};
  }
`;
function ProfileInfo({ candidate }) {
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
      <ChallengerAvatar avatar={image} party={party} />
      <CandidateName>{`${firstName} ${lastName}`}</CandidateName>
      <PartyName>{`Running as ${party}`}</PartyName>
      <RaceName>{race}</RaceName>
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
      <RecentActivity>
        <RecentActivityTitle>Recently Joined</RecentActivityTitle>
      </RecentActivity>
      <Grid container alignItems="center" style={{ marginBottom: 14 }}>
        <img src={PeopleJoinedIconPurple} alt="share" />
        <JoinedCount>772 people just joined</JoinedCount>
      </Grid>
      <RecentJoin container alignItems="center">
        <Grid item>
          <img src={AnonymousIconPurple} alt="share" />
        </Grid>
        <Grid item>
          <Grid item container alignItems="center">
            <JoinName>Michele C.</JoinName>
            <JoinChamber>Beverly Hills CA-33</JoinChamber>
          </Grid>
          <Grid item>
            <JoinName className="joined-time">7 mins ago</JoinName>
          </Grid>
        </Grid>
      </RecentJoin>
      <Box style={{ marginTop: 24 }}>
        <PurpleButton fullWidth className="outline">
          <InnerButton>
            <span>SEE ALL</span>
          </InnerButton>
        </PurpleButton>
      </Box>
    </ProfileInfoWrapper>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
};

export default ProfileInfo;
