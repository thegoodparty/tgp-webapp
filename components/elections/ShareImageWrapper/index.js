/**
 *
 * ShareImage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { PurpleButton } from 'components/shared/buttons';
import { partyResolver } from 'helpers/electionsHelper';

import { Body9, Body11, Body19 } from '../../shared/typogrophy';
import SupportersProgressBar from '../SupportersProgressBar';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { kFormatter } from '../../../helpers/numberHelper';

const ShareImageWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px 24px 32px 24px;
  text-align: center;
  box-shadow: none;
  width: 340px;
  height: 500px;
`;

const CandidateName = styled(Body19)`
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
`;

const PartyName = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray4};
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 11px;
`;

const RaceName = styled(Body11)`
  text-transform: uppercase;
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
  width: 100%;
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
const HelperText = styled(Body11)`
  && {
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.gray7};
    margin-bottom: 15px;
    text-align: center;
  }
`;
const WrapperTitle = styled(Body19)`
  && {
    font-style: normal;
    font-weight: 800;
    line-height: 30px;
    color: #292936;
    margin-bottom: 15px;
  }
`;
function ShareImage({
  candidate,
  shareImageCallback,
  imageAsBase64,
  candidateSupports,
}) {
  const supportCount = candidateSupports?.length;
  const {
    firstName,
    lastName,
    race,
    party,
    likelyVoters,
    votesNeeded,
  } = candidate;
  const afterLoad = () => {
    htmlToImage
      .toJpeg(document.getElementById('profile-info'), { width: 420 })
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        shareImageCallback({ ...candidate, imageBase64: dataUrl });
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <ShareImageWrapper id="profile-info">
      <WrapperTitle>Hey, I’m supporting...</WrapperTitle>
      <AvatarWrapper container alignItems="center">
        <Grid item sm={3}>
          <CandidateAvatar
            avatar={`data:image/jpeg;base64, ${imageAsBase64}`}
            party={party}
            size="small"
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
            <span>{kFormatter(likelyVoters)}</span> likely voters
          </LikelyVoters>
        </Grid>
        <Grid row xs={6}>
          {supportCount === 0 ? (
            <>&nbsp;</>
          ) : (
              <LikelyVoters>
                <span>{kFormatter(supportCount)}</span> people endorsing
              </LikelyVoters>
            )}
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
          <InnerButton>Join Me</InnerButton>
        </PurpleButton>
      </Box>
    </ShareImageWrapper>
  );
}

ShareImage.propTypes = {
  candidate: PropTypes.object,
  shareImageCallback: PropTypes.func,
  imageAsBase64: PropTypes.string,
  candidateSupports: PropTypes.array,
};

export default ShareImage;
