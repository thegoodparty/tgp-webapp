/**
 *
 * RunWrapper
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';

import PageWrapper from '../shared/PageWrapper';
import { Font16, Font18, FontH1, FontH2 } from '../shared/typogrophy';
import CertifiedBadge from '../shared/CertifiedBadge';
import StartCampaignButton from './StartCampaignButton';
import BecomingSection from './BecomingSection';
import HowWorksSection from './HowWorksSection';

const Wrapper = styled.div`
  padding: 80px 0;
  text-align: center;
`;

const Free = styled(Font16)`
  font-size: 14px;
  color: #6b6b6b;
  margin: 42px 0 12px;
`;

const Questions = styled.div`
  margin-top: 20px;
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const BadgeWrapper = styled.div`
  margin: 80px 0 20px;
`;

function RunWrapper() {
  return (
    <PageWrapper>
      <Wrapper>
        <FontH1>Run as an Indie or 3rd Party.</FontH1>
        <Font18>
          We’ve made it simple and free like democracy{' '}
          <strong>
            <i>should be.</i>
          </strong>
        </Font18>
        <Free>we’re always free</Free>
        <StartCampaignButton />
        <Link to="questions" duration={500} smooth>
          <Questions>Have more questions?</Questions>
        </Link>
        <BadgeWrapper>
          <CertifiedBadge />
        </BadgeWrapper>
        <BecomingSection />
        <HowWorksSection />
      </Wrapper>
    </PageWrapper>
  );
}

RunWrapper.propTypes = {};

export default RunWrapper;
