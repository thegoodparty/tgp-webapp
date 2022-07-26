/**
 *
 * ShareImage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as htmlToImage from 'html-to-image';
import Box from '@material-ui/core/Box';
import { partyResolver } from '/helpers/electionsHelper';
import { Body9, Body11, Body19, Body13, Font16 } from '../../shared/typogrophy';
import SupportersProgressBar from '../../CandidateWrapper/Header/SupportersProgressBar';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { kFormatter, numberFormatter } from '/helpers/numberHelper';
import BlackButton from '../../shared/buttons/BlackButton';

const ShareImageWrapper = styled.div`
  background: #ffffff;
  padding: 24px 24px 32px 24px;
  text-align: left;
  box-shadow: none;
  width: 340px;
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
  followers,
}) {
  const {
    firstName,
    lastName,
    race,
    party,
    otherParty,
    isDraft,
    draftOffice,
    color,
    votesNeeded,
  } = candidate;
  const brightColor = color?.color ? color.color : '#000';
  const afterLoad = async (suffix) => {
    if (!withRender) {
      return;
    }
    htmlToImage
      .toJpeg(document.getElementById(suffix), {
        quality: 1,
        pixelRatio: 2,
        style: { fontFamily: `'Lato',sans-serif` },
      })
      .then(async function (dataUrl) {
        shareImageCallback({ ...candidate, imageBase64: dataUrl, suffix });
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };
  const longName = firstName.length + lastName.length > 14;
  return (
    <>
      {withRender && (
        <ShareImageWrapper
          id="share"
          className={!withRender && 'no-bg'}
          style={{ fontFamily: "'Lato',sans-serif" }}
        >
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
              hideBadge
              candidate={candidate}
            />
            <NameWrapper>
              <CandidateName className={longName && 'long-name'}>
                {firstName} {lastName}
              </CandidateName>
              {isDraft && draftOffice !== '' ? (
                draftOffice
              ) : (
                <>
                  <PartyName>
                    {partyResolver(party, otherParty)}{' '}
                    {party !== 'I' ? 'Party' : ''} Candidate for
                  </PartyName>
                  <PartyName>{race}</PartyName>
                </>
              )}
            </NameWrapper>
          </AvatarWrapper>
          <Endorsed>
            <div style={{ paddingLeft: '8px' }}>
              <strong>
                {numberFormatter(followers)}{' '}
                {followers === 1 ? 'person' : 'people'}{' '}
              </strong>{' '}
              follow {firstName} {lastName}.<br />
              Let&apos;s get to {kFormatter(votesNeeded)}!
            </div>
          </Endorsed>
          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={votesNeeded}
            peopleSoFar={followers}
            withAchievement={false}
            color={brightColor}
          />
          {withRender && (
            <Box style={{ marginTop: 20, textAlign: 'center' }}>
              <BlackButton
                style={{
                  width: '70%',
                  backgroundColor: brightColor,
                  borderColor: brightColor,
                }}
              >
                <InnerButton>
                  <strong>See Campaign</strong>
                </InnerButton>
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
};

export default ShareImage;
