/**
 *
 * ShareButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { PurpleButton } from 'components/shared/buttons';
import { logEvent } from 'services/AnalyticsService';

import { Body13 } from '../../shared/typogrophy';

const ShareIconPurple = '/images/purple-share.svg';

const Img = styled.img`
  top: 2px;
  position: relative;
  height: 12px;
  margin-right: 5px;

  @media only screen and (min-width: 500px) {
    top: 2px;
    margin-right: 10px;
    height: 16px;
  }
`;

const InnerButton = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
  font-size: 9px;
  @media only screen and (min-width: 500px) {
    font-size: 13px;
  }
`;

function ShareButton({ candidateId, trackShareCallback = () => {} }) {
  let shareLink = '/';
  if (typeof window !== 'undefined') {
    shareLink = `${window.location.pathname}?preview=true&fromshare=true`;
  }
  const handleShare = () => {
    trackShareCallback(candidateId);
    logEvent('Share Candidate', 'Campaign share button', 'Share');
  };

  return (
    <Link href={shareLink}>
      <PurpleButton fullWidth className="outline" onClick={handleShare}>
        <InnerButton>
          <Img src={ShareIconPurple} alt="share" />
          <span>SHARE CAMPAIGN</span>
        </InnerButton>
      </PurpleButton>
    </Link>
  );
}

ShareButton.propTypes = {
  candidateId: PropTypes.number,
  trackShareCallback: PropTypes.func,
};

export default ShareButton;
