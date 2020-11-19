import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Body, Body11, H2, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
import SupportersProgressBar from 'components/elections/SupportersProgressBar';
import {
  getCandidateChamberDistrict,
  getCandidateChamberDistrictOnly,
  getCandidateTitle,
} from 'helpers/candidatesHelper';
import { uuidUrl } from 'helpers/userHelper';
import CopyPasteIcon from 'public/images/icons/copy-paste.svg';
import LinkIcon from 'public/images/icons/link-icon.svg';
import SmsIcon from 'public/images/icons/sms-icon.svg';
import ShareIcon from 'public/images/icons/share-icon.svg';
import { numberFormatter } from 'helpers/numberHelper';
import LogoCapsImg from 'public/images/logo-caps.svg';
import AnalyticsService from 'services/AnalyticsService';

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paperScrollPaper {
      width: calc(100% - 40px);
      margin: 20px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        width: auto;
      }
    }
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 24px 0 32px;
  border-radius: 8px;
  position: relative;
  width: calc(100% - 12px);
  margin: 0 auto;
  max-width: 500px;
  min-width: 300px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px 24px 32px;
    width: 85vw;
  }
`;

const CenterBar = styled(Body)`
  margin-bottom: 12px;
  width: 100%;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 32px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 8px 0 4px 4px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShareThisWrapper = styled.div`
  margin-bottom: 1rem;
  &.email {
    padding: 0;
  }

  // @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.md}) {
  //   padding: 16px 0 30px;
  // }

  .st-inline-share-buttons {
    // display: flex !important;
  }

  .st-btn {
    margin: 15px 19px !important;
    border-radius: 50% !important;
    &:after {
      top: 45px;
      left: 0;
      width: 56px;
      text-align: center;
      position: absolute;
      display: block;
      font-size: 10px;
      color: ${({ theme }) => theme.colors.gray6};
    }
  }

  .st-btn[data-network='email'] {
    background-color: #f39268 !important;
    &:after {
      content: 'EMAIL';
    }
  }

  .st-btn[data-network='facebook'] {
    &:after {
      content: 'FACEBOOK';
    }
  }

  .st-btn[data-network='twitter'] {
    &:after {
      content: 'TWITTER';
    }
  }
`;

const AdditionalSharesWrapper = styled.div`
  padding: 16px 25px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 90px;
  }

  &.with-native {
    padding: 0 8px;
    // @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.md}) {
    //   padding: 0 90px;
    // }
  }
`;

const IconItem = styled.div`
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  height: 56px;
  width: 56px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 14px;

  &.sms {
    background: linear-gradient(#67ff81, #03b521);
  }

  &.native-share {
    background: #fff;
  }
`;

const Icon = styled.img``;

const IconLabel = styled.div`
  font-size: 10px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 12px;
`;

const Spread = styled(Body)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.gray7};
`;
const StyledBody = styled(Body)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.gray7};

  span.big {
    font-size: 23px;
    font-weight: bold;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 28px;
    }
  }
`;

const VotesNeededWrapper = styled(Body11)`
  margin-top: 35px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray7};
`;

const TitleH2 = styled(H2)`
  text-align: center;
`;

const CopiedWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  border: solid 1px ${({ theme }) => theme.colors.green};
  border-radius: 6px;
`;
const Copied = styled(Body11)`
  margin-left: 6px;
`;
const Gray6 = styled.span`
  color: ${({ theme }) => theme.colors.gray6};
`;

const Footer = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray6};
  margin-top: 18px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
  }
`;

const ShareModal = ({
  candidate,
  user,
  closeCallback,
  registerFlowShareMode,
  userState,
  trackShareCallback,
}) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    AnalyticsService.sendEvent('Sharing', 'Open Share Modal', candidate?.name);
  }, []);
  useEffect(() => {
    const sharebtns = document.getElementsByClassName('st-btn');
    for (let i = 0; i < sharebtns.length; i++) {
      sharebtns[i].onclick = () => {
        let label = '';
        if (i === 0) {
          label = 'Email';
        } else if (i === 1) {
          label = 'Facebook';
        } else if (i === 2) {
          label = 'Twitter';
        }
        trackShare(label);
      };
    }
  });

  if (!candidate) {
    return <> </>;
  }

  const { name, ranking, likelyVoters, votesNeeded } = candidate;
  const { chamber } = candidate;
  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }
  const url = uuidUrl(user, window.location.href);
  let chamberCount = likelyVoters;
  if (ranking) {
    chamberCount += ranking;
  }

  const chamberTitle = getCandidateTitle(chamber);
  const messageTitle = `Let's see if we can elect ${candidate.name} ${
    chamberTitle.includes('President') ? '' : 'to '
  }${chamberTitle}.`;
  const emailTitle = `Help me elect ${candidate.name}`;
  // const messageBody = `Check out ${blocName} for ${chamberTitle} in The Good Party. See what’s possible, before we vote: ${url}`;
  const messageBody = `${
    candidate.name
  } could win in ${getCandidateChamberDistrictOnly(
    candidate,
  )}, if we all just share this crowd-voting campaign! Add Your Vote & Share here: ${url}`;

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title: messageTitle,
        text: messageBody,
      })
      .then(() => {
        trackShare('Native Share');
      });
  };
  candidate.votesNeeded = votesNeeded;
  const handleCopy = () => {
    setCopied(true);

    trackShare('Copy to Clipboard');
  };
  const trackShare = (shareType = '') => {
    AnalyticsService.sendEvent('Sharing', 'Click Share Method', shareType);
    trackShareCallback(candidate);
  };
  return (
    <StyledDialog onClose={closeCallback} open>
      <Wrapper>
        <Close onClick={closeCallback} data-cy="share-modal-close">
          <CloseIcon />
        </Close>
        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="responsive"
            src={candidate.image}
            name={candidate.name}
          />

          <Spread>
            {registerFlowShareMode
              ? "You're now part of the"
              : 'Tell others about this campaign!'}
          </Spread>
          <TitleH2>
            {name}
            <br />
            for {getCandidateChamberDistrict(candidate)}
          </TitleH2>
          <StyledBody className="mb-20">
            <span className="big">{numberFormatter(chamberCount)}</span>&nbsp;
            people and growing!
          </StyledBody>
          <VotesNeededWrapper>
            <VotesNeeded candidate={candidate} truncateSmall />
          </VotesNeededWrapper>
          <CenterBar>
            <SupportersProgressBar
              votesNeeded={votesNeeded}
              peopleSoFar={likelyVoters}
              showSupporters={false}
              showSuffix={false}
              userState={userState}
            />
          </CenterBar>
          <Body data-cy="share-modal-description">
            <Gray6>Please tell some friends!</Gray6>
          </Body>
        </AvatarWrapper>

        <AdditionalSharesWrapper className={canShare ? 'with-native' : ''}>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <a
                href={`sms:?&body=${messageBody.replace('&', '%26')}`}
                data-cy="sms-share"
                onClick={() => {
                  trackShare('sms');
                }}
              >
                <IconItem>
                  <IconWrapper className="sms">
                    <Icon src={SmsIcon} alt="sms" />
                  </IconWrapper>
                </IconItem>
                <IconLabel data-cy="sms-share-title">SMS / TEXT</IconLabel>
              </a>
            </Grid>
            <Grid item xs={4}>
              <ShareThisWrapper className="email">
                <InlineShareButtons
                  config={{
                    alignment: 'center', // alignment of buttons (left, center, right)
                    color: 'social', // set the color of buttons (social, white)
                    enabled: true, // show/hide buttons (true, false)
                    font_size: 16, // font size for the buttons
                    labels: 'null', // button labels (cta, counts, null)
                    language: 'en', // which language to use (see LANGUAGES)
                    networks: [
                      // which networks to include (see SHARING NETWORKS)
                      'email',
                    ],
                    padding: 14, // padding within buttons (INTEGER)
                    radius: 4, // the corner radius on each button (INTEGER)
                    show_total: false,
                    size: 56, // the size of each button (INTEGER)

                    // OPTIONAL PARAMETERS
                    url,
                    description: messageBody,
                    title: emailTitle, // (defaults to og:title or twitter:title)
                    message: messageBody, // (only for email sharing)
                    subject: emailTitle, // (only for email sharing)
                  }}
                />
              </ShareThisWrapper>
            </Grid>
            <Grid item xs={4}>
              <IconItem>
                <CopyToClipboard text={url} onCopy={handleCopy}>
                  <IconWrapper>
                    <Icon src={LinkIcon} alt="copy" />
                  </IconWrapper>
                </CopyToClipboard>
              </IconItem>
              <IconLabel data-cy="clipboard-share-title">COPY LINK</IconLabel>
            </Grid>
          </Grid>
          <ShareThisWrapper data-cy="social-share">
            <Grid container spacing={0}>
              <Grid item xs={canShare ? 8 : 12}>
                <InlineShareButtons
                  config={{
                    alignment: 'center', // alignment of buttons (left, center, right)
                    color: 'social', // set the color of buttons (social, white)
                    enabled: true, // show/hide buttons (true, false)
                    font_size: 16, // font size for the buttons
                    labels: 'null', // button labels (cta, counts, null)
                    language: 'en', // which language to use (see LANGUAGES)
                    networks: [
                      // which networks to include (see SHARING NETWORKS)
                      'facebook',
                      'twitter',
                    ],
                    padding: 14, // padding within buttons (INTEGER)
                    radius: 4, // the corner radius on each button (INTEGER)
                    show_total: false,
                    size: 56, // the size of each button (INTEGER)

                    // OPTIONAL PARAMETERS
                    url,
                    description: messageBody,
                    title: messageTitle, // (defaults to og:title or twitter:title)
                    message: messageBody, // (only for email sharing)
                    subject: messageTitle, // (only for email sharing)
                  }}
                  onClick={() => {
                    trackShare('');
                  }}
                />
              </Grid>
              {canShare && (
                <Grid xs={4}>
                  <IconItem>
                    <IconItem onClick={nativeShare}>
                      <IconWrapper className="native-share">
                        <Icon src={ShareIcon} alt="more" />
                      </IconWrapper>
                    </IconItem>
                  </IconItem>
                  <IconLabel>MORE</IconLabel>
                </Grid>
              )}
            </Grid>
          </ShareThisWrapper>
        </AdditionalSharesWrapper>

        <Footer>
          <Link href="?article=1ic6T6fhH0jZLNvX5aZkDe">
            What is a crowd-voting campaign?
          </Link>
          <br />
          <Image
            src="images/logo-caps.svg"
            alt="logo"
            style={{ marginTop: '16px' }}
          />
        </Footer>
        {copied && (
          <CopiedWrapper>
            <Icon src={CopyPasteIcon} alt="copy link" />
            <Copied>TEXT LINK COPIED TO CLIPBOARD</Copied>
          </CopiedWrapper>
        )}
      </Wrapper>
    </StyledDialog>
  );
};

ShareModal.propTypes = {
  closeCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamber: PropTypes.string,
  userState: PropTypes.string,
  registerFlowShareMode: PropTypes.bool,
  trackShareCallback: PropTypes.func,
};

export default ShareModal;
