import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import BlueButton from '/components/shared/buttons/BlueButton';
import { Body13 } from './typogrophy';

const StyledBody = styled(Body13)`
  color: #fff;
`;

const Copied = styled(Body13)`
  margin-top: 8px;
  color: #970003;
`;

const ShareButton = ({
  title = 'The Good Party',
  text = 'Check out The Good Party!',
  url,
  customElement,
}) => {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const nativeShare = () => {
    navigator
      .share({
        title,
        text,
        url: url || window.location.href,
      })
      .then(() => console.log('Successful share'));
  };
  return (
    <>
      {canShare ? (
        <>
          {customElement ? (
            <div onClick={nativeShare}>{customElement}</div>
          ) : (
            <BlueButton fullWidth onClick={nativeShare}>
              <StyledBody>TELL SOME FRIENDS</StyledBody>
            </BlueButton>
          )}
        </>
      ) : (
        <div>
          <CopyToClipboard
            text={url || window.location.href}
            onCopy={() => setCopied(true)}
          >
            {customElement ? (
              <div>{customElement}</div>
            ) : (
              <BlueButton fullWidth>
                <StyledBody>TELL SOME FRIENDS</StyledBody>
              </BlueButton>
            )}
          </CopyToClipboard>
          {copied && <Copied>Copied to clipboard</Copied>}
        </div>
      )}
    </>
  );
};

ShareButton.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  customElement: PropTypes.object,
};

export default ShareButton;
