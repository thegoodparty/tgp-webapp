/**
 *
 * BlogArticlePage
 *
 */

import React, { memo, createContext } from 'react';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import BlogArticleWrapper from '/components/blog/BlogArticleWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectBlogArticlePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ArticleSchema from './ArticleSchema';

export const BlogArticlePageContext = createContext();

export function BlogArticlePage({ ssrState }) {
  useInjectReducer({ key: 'blogArticlePage', reducer });
  useInjectSaga({ key: 'blogArticlePage', saga });
  const { sections, article } = ssrState;

  if (!article) {
    return <Error statusCode={404} />;
  }

  const childProps = {
    sections,
    article,
  };

  return (
    <BlogArticlePageContext.Provider value={childProps}>
      <TgpHelmet
        title={`${article.title} | Good Party`}
        description={article.summary}
        image={article.mainImage && `https:${article.mainImage.url}`}
      />
      <BlogArticleWrapper />
      <ArticleSchema />
    </BlogArticlePageContext.Provider>
  );
}

BlogArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blogArticlePage: makeSelectBlogArticlePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BlogArticlePage);
