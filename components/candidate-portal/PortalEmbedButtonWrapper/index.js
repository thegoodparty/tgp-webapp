/**
 *
 * PortalEmbedButtonWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, H2 } from '../../shared/typogrophy';
import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import CopyCodeSection from '../../GoodPracticesWrapper/CopyCodeSection';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 800px;
  width: 100%;
  height: auto;
  border: solid 2px #333;
  margin-top: 12px;
  box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
    2px -2px 5px rgba(224, 212, 234, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(224, 212, 234, 0.9),
    inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);
`;

function PortalEmbedButtonWrapper({ candidate }) {
  return (
    <PortalPageWrapper>
      {candidate && (
        <Wrapper>
          <div>
            <H2>Embed our endorse button on your site</H2>
            <br />
            <br />
            <Body>
              Sure you need donations, but votes win elections! Start collecting
              endorsements by embedding this button on your website, social
              media and in campaign emails. Where there’s a Donate button on
              your site there should also be an Endorse button. Don't let money
              get in the way of people supporting and growing awareness about
              your campaign!
            </Body>
            <br />
            <br />
            <Body>Simply add the following code to your site:</Body>
            <CopyCodeSection candidates={[]} candidateSelected={candidate.id} />
            <br />
            <br />
            Example of an embed button on{' '}
            <a href="https://www.baddarforthepeople.org/" target="_blank">
              Youseff Baddar
            </a>
            's site
            <br />
            <Img src="https://assets.goodparty.org/portal/embed-example.jpg" />
          </div>
        </Wrapper>
      )}
    </PortalPageWrapper>
  );
}

PortalEmbedButtonWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PortalEmbedButtonWrapper;
