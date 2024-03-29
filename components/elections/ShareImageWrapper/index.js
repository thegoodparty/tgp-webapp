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
import { Body11, Body19 } from '/components/shared/typogrophy';
import CandidateAvatar from '/components/shared/CandidateCard/CandidateAvatar';
import BlackButton from '/components/shared/buttons/BlackButton';
import { candidateColor } from '/helpers/candidatesHelper';
import { daysTill } from '/helpers/dateHelper';
import CandidateProgressBar from '/components/shared/CandidateProgressBar';

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
  font-size: 22px;
  &.long-name {
    font-size: 18px;
  }
`;

const PartyName = styled(Body11)`
  color: #000;
  margin-top: 3px;
  margin-bottom: 3px;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
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
  flex: 1;
`;

const Bold = styled.span`
  font-weight: 900;
`;

const WrapperTitle = styled(Body19)`
  && {
    font-style: normal;
    font-weight: 900;
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
  const { firstName, lastName, race, party, otherParty, votesNeeded } =
    candidate;

  let thisWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
  }
  const brightColor = candidateColor(candidate);

  const afterLoad = async (suffix) => {
    if (!withRender) {
      return;
    }
    setTimeout(() => {
      htmlToImage
        .toJpeg(document.getElementById(suffix), {
          quality: 1,
          pixelRatio: 1.5,
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
    }, 5000);
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

              <PartyName>
                {partyResolver(party, otherParty)}{' '}
                {party !== 'I' ? 'Party' : ''} Candidate for
              </PartyName>
              <PartyName>
                <Bold>{race}</Bold>
              </PartyName>
            </NameWrapper>
          </AvatarWrapper>

          <CandidateProgressBar
            candidate={candidate}
            votesNeeded={votesNeeded}
            peopleSoFar={thisWeek}
            withAnimation={false}
          />

          {withRender && (
            <Box style={{ marginTop: 20, textAlign: 'center' }}>
              <BlackButton
                fullWidth
                style={{
                  backgroundColor: brightColor,
                  borderColor: brightColor,
                }}
              >
                <strong style={{ width: '100%' }}>See Campaign</strong>
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
