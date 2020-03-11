import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body, H2, H1 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';

const FaqArticleWrapper = ({ article }) => (
  <div>
    {article ? (
      <>
        <Nav />
        <Wrapper white>
          <MobileHeader />
          <H1 style={{ marginBottom: '32px' }}>{article.title}</H1>

          <CmsContentWrapper>
            {contentfulHelper(article.articleBody)}
          </CmsContentWrapper>
        </Wrapper>
      </>
    ) : (
      <LoadingAnimation />
    )}
  </div>
);

FaqArticleWrapper.propTypes = {
  article: PropTypes.object,
};

export default FaqArticleWrapper;
