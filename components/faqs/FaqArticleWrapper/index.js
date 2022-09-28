/**
 *
 * FaqArticleWrapper
 *
 */

import React, { useContext } from 'react';
import PageWrapper from '/components/shared/PageWrapper';
import { FontH1 } from '/components/shared/typogrophy';
import contentfulHelper, { CmsContentWrapper } from '/helpers/contentfulHelper';
import { FaqArticlePageContext } from '/containers/faqs/FaqArticlePage';
import Breadcrumbs from '../../shared/Breadcrumbs';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function FaqArticleWrapper() {
  const { article } = useContext(FaqArticlePageContext);

  const breadcrumbsLinks = [
    { href: '/', label: 'Good Party' },
    {
      href: '/faqs',
      label: 'Frequently asked questions',
    },
    {
      label: `${article.category?.fields?.name ?? ''} - ${article.title}`,
    },
  ];
  return (
    <PageWrapper>
      <br/>
      <Breadcrumbs links={breadcrumbsLinks} />
      <FontH1 style={{ marginBottom: '32px' }} data-cy="article-title">
        {article.title}
      </FontH1>

      <CmsContentWrapper>
        {contentfulHelper(article.articleBody)}
      </CmsContentWrapper>
    </PageWrapper>
  );
}

FaqArticleWrapper.propTypes = {};

export default FaqArticleWrapper;
