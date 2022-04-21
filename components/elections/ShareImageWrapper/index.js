/**
 *
 * ShareImage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
import Box from '@material-ui/core/Box';
import { partyResolver } from '/helpers/electionsHelper';
import { Body9, Body11, Body19, Body13 } from '../../shared/typogrophy';
import SupportersProgressBar from '../../CandidateWrapper/left/SupportersProgressBar';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { kFormatter, numberFormatter } from '/helpers/numberHelper';
import { achievementsHelper } from '/helpers/achievementsHelper';
import BlackButton from '../../shared/buttons/BlackButton';

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

const Endorsed = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: left;
  padding-left: 5px;
`;

const WrapperTitle = styled(Body19)`
  && {
    font-style: normal;
    font-weight: 800;
    line-height: 30px;
    color: #292936;
    margin-bottom: 15px;
    padding-left: 8px;
  }
`;
function ShareImage({
  candidate,
  shareImageCallback,
  imageAsBase64,
  withRender = true,
  fromShareLink = false,
  total,
}) {
  const supportCount = total;
  const { firstName, lastName, race, party, otherParty, isDraft, draftOffice } =
    candidate;
  const afterLoad = (suffix) => {
    if (!withRender) {
      return;
    }
    setTimeout(() => {
      htmlToImage
      .toJpeg(document.getElementById(suffix), { quality: 1, pixelRatio: 1 })
      .then(function (dataUrl) {
        shareImageCallback({ ...candidate, imageBase64: dataUrl, suffix });
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }, 2000)
  };
  const longName = firstName.length + lastName.length > 14;
  const achievements = achievementsHelper(supportCount);
  return (
    <>
      <ShareImageWrapper id="support" className={!withRender && 'no-bg'}>
        <WrapperTitle>
          Hey, {fromShareLink ? 'Check out' : 'I’m endorsing'}...
        </WrapperTitle>
        <AvatarWrapper>
          <CandidateAvatar
            avatar={
              imageAsBase64
                ? `data:image/jpeg;base64, ${imageAsBase64}`
                : candidate.image
            }
            party={party}
            size="small"
            afterLoad={() => afterLoad('support')}
            hideBadge={isDraft}
          />
          <NameWrapper>
            <CandidateName className={longName && 'long-name'}>
              {firstName} {lastName}
            </CandidateName>
            {isDraft && draftOffice !== '' ? (
              draftOffice
            ) : (
              <>
                <PartyName>{partyResolver(party)} for</PartyName>
                <PartyName>{race}</PartyName>
              </>
            )}
          </NameWrapper>
        </AvatarWrapper>
        <Endorsed>
          <div style={{ paddingLeft: '8px' }}>
            <strong>
              {supportCount} {supportCount === 1 ? 'person' : 'people'}{' '}
              endorsed.
            </strong>{' '}
            Let&apos;s get to {numberFormatter(achievements.nextStep)}!
          </div>
        </Endorsed>
        <SupportersProgressBar
          showSupporters={false}
          votesNeeded={achievements.nextStep}
          peopleSoFar={supportCount}
          fullWidth
          showSuffix={false}
          withAchievement
        />
        {withRender && (
          <Box style={{ marginTop: 20, textAlign: 'center' }}>
            <BlackButton style={{ width: '50%' }}>
              <InnerButton>Join Me</InnerButton>
            </BlackButton>
          </Box>
        )}
      </ShareImageWrapper>
      {withRender && (
        <ShareImageWrapper id="share" className={!withRender && 'no-bg'}>
          <WrapperTitle>Hey, check out...</WrapperTitle>
          <AvatarWrapper>
            <CandidateAvatar
              avatar={
                imageAsBase64
                  ? `data:image/jpeg;base64, ${imageAsBase64}`
                  : candidate.image
              }
              party={party}
              size="small"
              afterLoad={() => afterLoad('share')}
              style={{ margin: '0 5px' }}
              hideBadge={isDraft}
            />
            <NameWrapper>
              <CandidateName className={longName && 'long-name'}>
                {firstName} {lastName}
              </CandidateName>
              {isDraft && draftOffice !== '' ? (
                draftOffice
              ) : (
                <>
                  <PartyName>{partyResolver(party, otherParty)} for</PartyName>
                  <PartyName>{race}</PartyName>
                </>
              )}
            </NameWrapper>
          </AvatarWrapper>
          <Endorsed>
            <div style={{ paddingLeft: '8px' }}>
              <strong>
                {supportCount} {supportCount === 1 ? 'person' : 'people'}{' '}
                endorsed.
              </strong>{' '}
              Let&apos;s get to {numberFormatter(achievements.nextStep)}!
            </div>
          </Endorsed>
          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={achievements.nextStep}
            peopleSoFar={supportCount}
            fullWidth
            showSuffix={false}
            withAchievement
          />
          {withRender && (
            <Box style={{ marginTop: 20, textAlign: 'center' }}>
              <BlackButton style={{ width: '70%' }}>
                <InnerButton>See Campaign</InnerButton>
              </BlackButton>
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
  total: PropTypes.number,
  withRender: PropTypes.bool,
  fromShareLink: PropTypes.bool,
};

export default ShareImage;
