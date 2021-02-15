/**
 *
 * ProfileInfo
 *
 */


import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { PurpleButton } from 'components/shared/buttons';
import { partyResolver } from 'helpers/electionsHelper';

import { Body9, Body11, Body19 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';

const ProfileInfoWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: -1px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 24px 24px 32px 24px;
  text-align: center;
  margin-top: 40px;
  box-shadow: none;
  width: 340px;
  height: 400px;
`;

const CandidateName = styled(Body19)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: center;
  margin-top: 12px;
  margin-bottom: 10px;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
`;

const PartyName = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 8px;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 11px;
`;

const RaceName = styled(Body11)`
  color: ${({ theme }) => theme.colors.purple2};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 24px;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 11px;
`;

const LikelyVoters = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  span {
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 16px;
    font-weight: 600;
  }
`;
const InnerButton = styled.div`
  font-size: 14px;
`;

const AvatarWrapper = styled(Grid)`
  && {
    margin-bottom: 20px;
    align-items: center;
  }
`;
const NameWrapper = styled(Grid)`
  && {
    padding-left: 15px;
    z-index: 1000;
  }
`;
const HelperText = styled(Typography)`
  && {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #767676;
    margin-bottom: 15px;
    text-align: center;
  }
`;
const WrapperTitle = styled(Typography)`
  && {
    font-style: normal;
    font-weight: 800;
    font-size: 23px;
    line-height: 30px;
    /* identical to box height, or 130% */
    color: #292936;
    margin-bottom: 15px;
  }
  
`
function ProfileInfo({ candidate, shareImageCallback }) {
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
  useEffect(() => {
    afterLoad();
  }, [])
  const afterLoad = () => {
    htmlToImage
      .toPng(document.getElementById('profile-info'))
      .then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        console.log(dataUrl);
        document.body.appendChild(img);
        shareImageCallback({ ...candidate, imageBase64: dataUrl });
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
  return (
    <ProfileInfoWrapper id="profile-info">
      <WrapperTitle>Hey, I’m supporting...</WrapperTitle>
      <AvatarWrapper container alignItems="center">
        <Grid item sm={3}>
          <ChallengerAvatar
            avatar={image}
            party={party}
            isFull={true}
            afterLoad={afterLoad}
          />
        </Grid>
        <NameWrapper item xs={9}>
          <CandidateName>
            {firstName} {lastName}
          </CandidateName>
          <PartyName>Running as {partyResolver(party)}</PartyName>
          <RaceName>{race}</RaceName>
        </NameWrapper>
      </AvatarWrapper>
      <HelperText>Crowd-voting campaign stats, so far:</HelperText>
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
      <Box style={{ marginTop: 8 }}>
        <PurpleButton fullWidth>
          <InnerButton>
            <span>Join Me</span>
          </InnerButton>
        </PurpleButton>
      </Box>
    </ProfileInfoWrapper>
  );
}

ProfileInfo.propTypes = {
  candidate: PropTypes.object,
  shareImageCallback: PropTypes.func,
};

export default ProfileInfo;
