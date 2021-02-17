/**
 *
 * ShareButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { PurpleButton } from 'components/shared/buttons';
import { Body13 } from '../../shared/typogrophy';

const ShareIconPurple = '/images/purple-share.svg';

const Img = styled.img`
  top: 2px;
  position: relative;
  height: 16px;
  margin-right: 10px;
`;

const InnerButton = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
`;

function ShareButton() {
  let shareLink = '/';
  if (typeof window !== 'undefined') {
    shareLink = `${window.location.pathname}?share=true`;
  }

  return (
    <Link href={shareLink}>
      <PurpleButton fullWidth className="outline">
        <InnerButton>
          <Img src={ShareIconPurple} alt="share" />
          <span>SHARE CAMPAIGN</span>
        </InnerButton>
      </PurpleButton>
    </Link>
  );
}

ShareButton.propTypes = {};

export default ShareButton;
