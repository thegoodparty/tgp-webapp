import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { InlineShareButtons } from 'sharethis-reactjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Body, H1, H3, Body9, Body11 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { candidateBlocLink, candidateBlocName } from 'helpers/electionsHelper';
import { uuidUrl } from 'helpers/userHelper';
import CopyPasteIcon from 'images/icons/copy-paste.svg';
import LinkIcon from 'images/icons/link-icon.svg';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 48px 18px 32px;
  border-radius: 8px;
  position: relative;
  width: 85vw;
  margin: 0 auto;
  max-width: 500px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px 24px 32px;
  }
`;

const Close = styled.div`
  position: absolute;
  padding: 16px;
  top: 0;
  right: 0;
  color: ${({ theme }) => theme.colors.gray4};
  cursor: pointer;
`;

const AvatarWrapper = styled(Body)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(H3)`
  font-weight: 400;
`;

const ShareThisWrapper = styled.div`
  padding: 36px 60px;

  .st-inline-share-buttons {
    // display: flex !important;
  }

  .st-btn {
    margin: 20px !important;
    border-radius: 50% !important;
  }

  .st-btn[data-network='email'] {
    background-color: #f39268 !important;
  }
`;

const AdditionalSharesWrapper = styled.div`
  padding: 0 115px;
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
`;

const Icon = styled.img``;

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

const ShareModal = ({ candidate, open, user, chamber, closeCallback }) => {
  const [copied, setCopied] = useState(false);
  if (!candidate) {
    return <> </>;
  }

  let { isGood } = candidate;
  if (candidate.unknown) {
    isGood = null;
  }

  const blocName = candidateBlocLink(candidate, chamber);
  let url = uuidUrl(user);
  let queryOperator = '&';
  if (url === 'https://thegoodparty.org') {
    queryOperator = '?';
  }
  url = url + queryOperator + blocName;
  console.log('url', url);

  return (
    <Dialog onClose={closeCallback} open={open}>
      <Wrapper>
        <Close onClick={closeCallback}>
          <CloseIcon />
        </Close>

        <AvatarWrapper>
          <CandidateAvatar
            good={isGood}
            size="large"
            src={candidate.image}
            name={candidate.name}
          />
          <H1 style={{ marginTop: '22px', marginBottom: '10px' }}>
            Grow {blocName}
          </H1>
          <Subtitle>Spread the word to grow this bloc!</Subtitle>
        </AvatarWrapper>
        <ShareThisWrapper>
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
              description: `Grow ${blocName} on The Good Party`,
              title: `Grow ${blocName} on The Good Party`, // (defaults to og:title or twitter:title)
              message: `follow ${url} to grow ${blocName}`, // (only for email sharing)
              subject: `Grow ${blocName}`, // (only for email sharing)
            }}
          />
        </ShareThisWrapper>
        <AdditionalSharesWrapper>
          <Grid container spacing={0}>
            <Grid item xs>
              <IconItem>
                <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                  <IconWrapper>
                    <Icon src={LinkIcon} alt="copy" />
                  </IconWrapper>
                </CopyToClipboard>
              </IconItem>
            </Grid>
            <Grid item xs>
              <IconItem>
                <IconWrapper>?</IconWrapper>
              </IconItem>
            </Grid>
          </Grid>
        </AdditionalSharesWrapper>
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
  open: PropTypes.bool,
  closeCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamber: PropTypes.string,
};

export default ShareModal;
