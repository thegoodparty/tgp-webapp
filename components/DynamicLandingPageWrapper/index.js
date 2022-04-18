/**
 *
 * DynamicLandingPageWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import contentfulHelper, { CmsContentWrapper } from '/helpers/contentfulHelper';
import PageWrapper from '../shared/PageWrapper';
import BlackButton from '../shared/buttons/BlackButton';

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

function DynamicLandingPageWrapper({ pageContent }) {
  return (
    <PageWrapper>
      <Wrapper>
        <CmsContentWrapper>
          <div style={{ paddingTop: '1px' }}>
            {contentfulHelper(pageContent.content1)}
          </div>

          {pageContent.buttonLink ? (
            <a href={pageContent.buttonLink} target="_blank" rel="noreferrer">
              <BlackButton className="outline" style={{ minWidth: '165px' }}>
                {pageContent.buttonLabel}
              </BlackButton>
            </a>
          ) : (
            <Link href="/register" data-cy="sign-up">
              <BlackButton className="outline">Sign Up</BlackButton>
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
