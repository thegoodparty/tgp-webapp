import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from 'components/shared/PageWrapper';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import { dateUsHelper } from 'helpers/dateHelper';

import { H1, Body11 } from '../typogrophy';

const TitleWrapper = styled.div`
  text-align: center;
`;

const RevisionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const Divider = styled.span`
  display: inline-block;
  height: 12px;
  width: 2px;
  background-color: ${({ theme }) => theme.colors.red};
  margin: 0 6px;
`;

const PrivacyWrapper = ({ content }) => {
  return (
    <PageWrapper white>
      {content && (
        <>
          <TitleWrapper>
            <H1 data-cy="title">{content.title}</H1>
          </TitleWrapper>
          <RevisionWrapper>
            <Body11 data-cy="last-revisioin-label">Last Revision</Body11>
            <Divider />
            <Body11 data-cy="last-revisioin-date">
              {dateUsHelper(content.lastModified)}
            </Body11>
          </RevisionWrapper>
          <CmsContentWrapper>
            {contentfulHelper(content.pageContent)}
          </CmsContentWrapper>
        </>
      )}
    </PageWrapper>
  );
};

PrivacyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PrivacyWrapper;
