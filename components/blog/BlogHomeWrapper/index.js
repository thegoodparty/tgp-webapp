/**
 *
 * BlogHomeWrapper
 *
 */

import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';

import BlogPageWrapper from '../shared/BlogPageWrapper';
import { BlogHomePageContext } from '/containers/blog/BlogHomePage';
import ArticleSnippet from '../shared/ArticleSnippet';

function BlogHomeWrapper() {
  const { sections, articles, sectionSlug, sectionTitle } =
    useContext(BlogHomePageContext);
  const hero = articles && articles.length > 0 ? articles[0] : false;
  return (
    <BlogPageWrapper
      sections={sections}
      sectionSlug={sectionSlug}
      useH1
      sectionTitle={sectionTitle}
    >
      <ArticleSnippet article={hero} heroMode />
      {articles && articles.length > 1 && (
        <Grid container spacing={3}>
          {articles.map((article, index) => (
            <>
              {index > 0 && (
                <Grid item xs={12} lg={4}>
                  <ArticleSnippet article={article} />
                </Grid>
              )}
            </>
          ))}
        </Grid>
      )}
    </BlogPageWrapper>
  );
}

BlogHomeWrapper.propTypes = {};

export default BlogHomeWrapper;
