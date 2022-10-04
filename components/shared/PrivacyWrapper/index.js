import React from 'react';
import PropTypes from 'prop-types';

import contentfulHelper from '/helpers/contentfulHelper';
import { dateUsHelper } from '/helpers/dateHelper';


const PrivacyWrapper = ({ content }) => {
  return (
    <div>
      {content && (
        <>
          <h1 data-cy="privacy-title">{content.title}</h1>
          <div data-cy="last-revisioin-label">Last Revision</div>
          <div data-cy="last-revisioin-date">
            {dateUsHelper(content.lastModified)}
          </div>
          {contentfulHelper(content.pageContent)}
        </>
      )}
    </div>
  );
};

PrivacyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PrivacyWrapper;
