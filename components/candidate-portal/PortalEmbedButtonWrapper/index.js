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
import contentfulHelper, {
  CmsContentWrapper,
} from '../../../helpers/contentfulHelper';

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

function PortalEmbedButtonWrapper({ candidate, content }) {
  return (
    <PortalPageWrapper>
      {candidate && (
        <Wrapper>
          <div>
            <H2>{content.title}</H2>
            <br />
            <br />
            <Body>
              <CmsContentWrapper>
                {contentfulHelper(content.instructions)}
              </CmsContentWrapper>
            </Body>
            <br />
            <br />
            <Body>
              Simply add one of the following code snippets to your site:
            </Body>
            <CopyCodeSection candidates={[]} candidateSelected={candidate.id} />
            <br />
            <br />
            Example of an embed button on{' '}
            <a href="https://www.baddarforthepeople.org/" target="_blank" rel="noreferrer">
              Youseff Baddar
            </a>
            &apos;s site
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
  content: PropTypes.object,
};

export default PortalEmbedButtonWrapper;
