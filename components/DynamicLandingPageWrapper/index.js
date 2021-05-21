/**
 *
 * DynamicLandingPageWrapper
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import PageWrapper from '../shared/PageWrapper';
import contentfulHelper from '../../helpers/contentfulHelper';

function DynamicLandingPageWrapper({ pageContent }) {
  return (
    <PageWrapper>
      <div>{contentfulHelper(pageContent.content)}</div>
    </PageWrapper>
  );
}

DynamicLandingPageWrapper.propTypes = {};

export default DynamicLandingPageWrapper;
