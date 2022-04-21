/**
 *
 * StartCampaignButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import BlackButton from '../shared/buttons/BlackButton';

const InnerButton = styled.div`
  padding: 0 32px;
`;
function StartCampaignButton() {
  return (
    <Link href="/campaign-application/guest/1" passHref>
      <a data-cy="campaign-start-button-link">
        <BlackButton>
          <InnerButton data-cy="campaign-start-button-label">Start your Campaign</InnerButton>
        </BlackButton>
      </a>
    </Link>
  );
}

export default StartCampaignButton;
