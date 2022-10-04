import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from '/components/shared/PageWrapper';
import contentfulHelper, { CmsContentWrapper } from '/helpers/contentfulHelper';
import { dateUsHelper } from '/helpers/dateHelper';

import { H1, Body11 } from '../typogrophy';

// const TitleWrapper = styled.div`
//   text-align: center;
//   margin-top: 24px;
// `;
//
// const RevisionWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-top: 8px;
// `;
//
// const Divider = styled.span`
//   display: inline-block;
//   height: 12px;
//   width: 2px;
//   background-color: #970003;
//   margin: 0 6px;
// `;

const PrivacyWrapper = ({ content }) => {
  return (
    <div white>
      {content && (
        <>
          {/*<TitleWrapper>*/}
            <h1 data-cy="privacy-title">{content.title}</h1>
          {/*</TitleWrapper>*/}
          {/*<RevisionWrapper>*/}
            <div data-cy="last-revisioin-label">Last Revision</div>
            {/*<Divider />*/}
            {/*<Body11 data-cy="last-revisioin-date">*/}
              {dateUsHelper(content.lastModified)}
            {/*</Body11>*/}
          {/*</RevisionWrapper>*/}
          {/*<CmsContentWrapper>*/}
            {contentfulHelper(content.pageContent)}
          {/*</CmsContentWrapper>*/}
        </>
      )}
    </div>
  );
};

PrivacyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};


export default PrivacyWrapper;
