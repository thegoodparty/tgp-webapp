import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body, Body13, H2, H3 } from 'components/shared/typogrophy/index';
import BlueButton from 'components/shared/buttons/BlueButton';
import ShareImage from 'images/share.png';
import LinkIcon from 'images/icons/link.svg';
import contentfulHelper from 'helpers/contentfulHelper';

const Img = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 20px;
`;
const InnerWrapper = styled.div`
  padding: 0 28px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;
const StyledBody = styled(Body)`
  color: #fff;
`;

const StyledH3 = styled(H3)`
  margin-top: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.blue};
`;

const CopyText = styled(Body13)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const Copied = styled(Body13)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.red};
`;

const ShareWrapper = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && navigator.share;
  let header = '';
  let body = '';
  if (content && content.sharePage) {
    header = content.sharePage.header; // eslint-disable-line prefer-destructuring
    body = contentfulHelper(content.sharePage.content);
  }

  const nativeShare = () => {
    navigator
      .share({
        title: 'The Good Party',
        text: 'Check out The Good Party!',
        url: 'https://www.thegoodparty.org',
      })
      .then(() => console.log('Successful share'));
  };
  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <InnerWrapper>
          <Img src={ShareImage} alt="Share" />
          <H2>{header}</H2>
          <Body13 style={{ marginTop: '20px', marginBottom: '25px' }}>
            {body}
          </Body13>
          {canShare && (
            <BlueButton fullWidth onClick={nativeShare}>
              <StyledBody>SHARE</StyledBody>
            </BlueButton>
          )}
          <div className="text-center">
            <CopyToClipboard
              text="https://www.thegoodparty.org"
              onCopy={() => setCopied(true)}
            >
              <StyledH3>thegoodparty.org</StyledH3>
            </CopyToClipboard>

            <CopyToClipboard
              text="https://www.thegoodparty.org"
              onCopy={() => setCopied(true)}
            >
              <CopyText>
                <img src={LinkIcon} alt="Copy Link" /> Copy Link
              </CopyText>
            </CopyToClipboard>
            {copied && <Copied>Copied to clipboard</Copied>}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

ShareWrapper.propTypes = {
  content: PropTypes.object,
};

export default ShareWrapper;
