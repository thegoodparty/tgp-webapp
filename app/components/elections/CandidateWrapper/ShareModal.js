import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Body, H3, Body11, H2, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import Stepper from 'components/shared/Stepper';
import VotesNeeded from 'components/home/ChallengersSection/VotesNeeded';
import SupportersProgressBar from 'components/elections/SupportersProgressBar';
import { candidateBlocName } from 'helpers/electionsHelper';
import {
  getCandidateChamberDistrict,
  getCandidateTitle,
} from 'helpers/candidatesHelper';
import { uuidUrl } from 'helpers/userHelper';
import CopyPasteIcon from 'images/icons/copy-paste.svg';
import LinkIcon from 'images/icons/link-icon.svg';
import SmsIcon from 'images/icons/sms-icon.svg';
import ShareIcon from 'images/icons/share-icon.svg';
import { numberFormatter } from 'helpers/numberHelper';
import LogoCapsImg from 'images/logo-caps.svg';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 24px 0 32px;
  border-radius: 8px;
  position: relative;
  width: 85%;
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
  padding: 4px 0 4px 4px;
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
  padding: 16px 0;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px 0 30px;
  }

  .st-inline-share-buttons {
    // display: flex !important;
  }

  .st-btn {
    margin: 20px !important;
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
  padding: 0 25px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 115px;
  }

  &.with-native {
    padding: 0 8px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 90px;
    }
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
  margin-top: 24px;
  text-align: center;
`;

const defaultRegisterSteps = ['Sign Up', 'Voterize', 'Tell Others'];

const ShareModal = ({
  candidate,
  user,
  closeCallback,
  registerFlowShareMode,
  userState,
}) => {
  const [copied, setCopied] = useState(false);
  if (!candidate) {
    return <> </>;
  }

  const { name, ranking, likelyVoters, votesNeeded } = candidate;
  const { chamber } = candidate;
  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }
  const blocName = candidateBlocName(candidate);
  const url = uuidUrl(user, window.location.href);
  const chamberCount = ranking + likelyVoters;

  const chamberTitle = getCandidateTitle(chamber);
  const messageTitle = `Let's see if we can elect ${candidate.name} ${
    chamberTitle.includes('President') ? '' : 'to '
  }${chamberTitle}.`;
  const messageBody = `Check out ${blocName} for ${chamberTitle} in The Good Party. See what’s possible, before we vote: ${url}`;

  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title: messageTitle,
        text: messageBody,
      })
      .then(() => console.log('Successful share'));
  };
  candidate.votesNeeded = votesNeeded;
  return (
    <Dialog onClose={closeCallback} open>
      <Wrapper>
        <Close onClick={closeCallback} data-cy="share-modal-close">
          <CloseIcon />
        </Close>
        {registerFlowShareMode && (
          <Stepper steps={defaultRegisterSteps} activeStep={2} />
        )}
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
            <VotesNeeded candidate={candidate} />
          </VotesNeededWrapper>
          <CenterBar>
            <SupportersProgressBar
              votesNeeded={votesNeeded}
              peopleSoFar={chamberCount}
              showSupporters={false}
              showSuffix={false}
              userState={userState}
            />
          </CenterBar>
          <Body data-cy="share-modal-description">
            <Gray6>Please tell some friends!</Gray6>
          </Body>
        </AvatarWrapper>
        <ShareThisWrapper data-cy="social-share">
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
                'email',
              ],
              padding: 12, // padding within buttons (INTEGER)
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
          />
        </ShareThisWrapper>
        <AdditionalSharesWrapper className={canShare ? 'with-native' : ''}>
          <Grid container spacing={0}>
            <Grid item xs>
              <a
                href={`sms:?&body=${messageBody.replace('&', '%26')}`}
                data-cy="sms-share"
              >
                <IconItem>
                  <IconWrapper className="sms">
                    <Icon src={SmsIcon} alt="sms" />
                  </IconWrapper>
                </IconItem>
                <IconLabel data-cy="sms-share-title">SMS / TEXT</IconLabel>
              </a>
            </Grid>
            <Grid item xs>
              <IconItem>
                <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                  <IconWrapper>
                    <Icon src={LinkIcon} alt="copy" />
                  </IconWrapper>
                </CopyToClipboard>
              </IconItem>
              <IconLabel data-cy="clipboard-share-title">COPY LINK</IconLabel>
            </Grid>
            {canShare && (
              <Grid item xs>
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
        </AdditionalSharesWrapper>
        <Footer>
          <Link to="?article=1ic6T6fhH0jZLNvX5aZkDe">
            What is a crowd-voting campaign?
          </Link>
          <br />
          <img src={LogoCapsImg} alt="logo" style={{ marginTop: '16px' }} />
        </Footer>
        {copied && (
          <CopiedWrapper>
            <Icon src={CopyPasteIcon} alt="copy link" />
            <Copied>TEXT LINK COPIED TO CLIPBOARD</Copied>
          </CopiedWrapper>
        )}
      </Wrapper>
    </Dialog>
  );
};

ShareModal.propTypes = {
  closeCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamber: PropTypes.string,
  userState: PropTypes.string,
  registerFlowShareMode: PropTypes.bool,
};

export default ShareModal;
