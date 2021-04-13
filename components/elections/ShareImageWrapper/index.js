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
  padding: 24px 24px 32px 24px;
  text-align: left;
  box-shadow: none;
  width: 340px;
  &.no-bg {
    background-color: transparent;
  }
`;

const CandidateName = styled(Body19)`
  color: ${({ theme }) => theme.colors.gray2};
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  font-size: 16px;
  &.long-name {
    font-size: 19px;
  }
`;

const PartyName = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  text-transform: uppercase;
  margin-top: 3px;
  margin-bottom: 3px;
  text-align: left;
  font-size: 11px;
  line-height: 15px;
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

const AvatarWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;
const NameWrapper = styled.div`
  padding-left: 15px;
  z-index: 1000;
  max-width: 215px;
`;
const HelperText = styled(Body11)`
  && {
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.gray7};
    margin-bottom: 15px;
    text-align: left;
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
  withRender = true,
  fromShareLink = false,
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
  const afterLoad = suffix => {
    if (!withRender) {
      return;
    }
    htmlToImage
      .toJpeg(document.getElementById(suffix), { quality: 1, pixelRatio: 1 })
      .then(function(dataUrl) {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        shareImageCallback({ ...candidate, imageBase64: dataUrl, suffix });
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  };
  const intLikelyVoters = parseInt(likelyVoters, 10);
  const longName = firstName.length + lastName.length > 14;

  return (
    <>
      <ShareImageWrapper id="support" className={!withRender && 'no-bg'}>
        <WrapperTitle>
          Hey, {fromShareLink ? 'Check out' : 'I’m endorsing'}...
        </WrapperTitle>
        <AvatarWrapper>
          <CandidateAvatar
            avatar={
              withRender
                ? `data:image/jpeg;base64, ${imageAsBase64}`
                : candidate.image
            }
            party={party}
            size="small"
            afterLoad={() => afterLoad('support')}
          />
          <NameWrapper>
            <CandidateName className={longName && 'long-name'}>
              {firstName} {lastName}
            </CandidateName>
            <PartyName>{partyResolver(party)} for</PartyName>
            <PartyName>{race}</PartyName>
          </NameWrapper>
        </AvatarWrapper>
        <HelperText>Crowd-voting campaign stats, so far:</HelperText>
        <Grid container>
          <Grid row xs={6}>
            <LikelyVoters>
              <span>{kFormatter(likelyVoters + supportCount)}</span> likely voters
            </LikelyVoters>
          </Grid>
          <Grid row xs={6}>
            {supportCount === 0 ? (
              <>&nbsp;</>
            ) : (
              <LikelyVoters>
                <span>{kFormatter(supportCount)}</span> people supporting
              </LikelyVoters>
            )}
          </Grid>
        </Grid>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={votesNeeded}
          peopleSoFar={supportCount + intLikelyVoters}
          fullWidth
        />
        {withRender && (
          <Box style={{ marginTop: 20, textAlign: 'center' }}>
            <PurpleButton style={{ width: '50%' }}>
              <InnerButton>Join Me</InnerButton>
            </PurpleButton>
          </Box>
        )}
      </ShareImageWrapper>
      {withRender && (
        <ShareImageWrapper id="share" className={!withRender && 'no-bg'}>
          <WrapperTitle>Hey, check out...</WrapperTitle>
          <AvatarWrapper>
            <CandidateAvatar
              avatar={
                withRender
                  ? `data:image/jpeg;base64, ${imageAsBase64}`
                  : candidate.image
              }
              party={party}
              size="small"
              afterLoad={() => afterLoad('share')}
              style={{ margin: '0 5px' }}
            />
            <NameWrapper>
              <CandidateName className={longName && 'long-name'}>
                {firstName} {lastName}
              </CandidateName>
              <PartyName>{partyResolver(party)} for</PartyName>
              <PartyName>{race}</PartyName>
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
                  <span>{kFormatter(supportCount)}</span> people supporting
                </LikelyVoters>
              )}
            </Grid>
          </Grid>
          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={votesNeeded}
            peopleSoFar={supportCount + intLikelyVoters}
            fullWidth
          />
          {withRender && (
            <Box style={{ marginTop: 20, textAlign: 'center' }}>
              <PurpleButton style={{ width: '70%' }}>
                <InnerButton>See Campaign</InnerButton>
              </PurpleButton>
            </Box>
          )}
        </ShareImageWrapper>
      )}
    </>
  );
}

ShareImage.propTypes = {
  candidate: PropTypes.object,
  shareImageCallback: PropTypes.func,
  imageAsBase64: PropTypes.string,
  candidateSupports: PropTypes.array,
  withRender: PropTypes.bool,
  fromShareLink: PropTypes.bool,
};

export default ShareImage;
