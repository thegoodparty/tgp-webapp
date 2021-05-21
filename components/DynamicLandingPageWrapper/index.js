/**
 *
 * DynamicLandingPageWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

import PageWrapper from '../shared/PageWrapper';
import contentfulHelper, {
  CmsContentWrapper,
} from '../../helpers/contentfulHelper';
import { PurpleButton } from '../shared/buttons';

function DynamicLandingPageWrapper({ pageContent }) {
  return (
    <PageWrapper>
      <Wrapper>
        <CmsContentWrapper>
          <div style={{ paddingTop: '1px' }}>
            {contentfulHelper(pageContent.content1)}
          </div>

          {pageContent.buttonLink ? (
            <a href={pageContent.buttonLink} target="_blank">
              <PurpleButton className="outline" style={{ minWidth: '165px' }}>
                {pageContent.buttonLabel}
              </PurpleButton>
            </a>
          ) : (
            <Link href="?register=true" data-cy="sign-up">
              <PurpleButton className="outline">Sign Up</PurpleButton>
            </Link>
          )}
          <div>{contentfulHelper(pageContent.content2)}</div>
        </CmsContentWrapper>
      </Wrapper>
    </PageWrapper>
  );
}

DynamicLandingPageWrapper.propTypes = {
  pageContent: PropTypes.object,
};

export default DynamicLandingPageWrapper;
