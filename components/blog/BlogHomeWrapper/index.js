/**
 *
 * BlogHomeWrapper
 *
 */

import React, { useContext } from 'react';
import BlogPageWrapper from '../shared/BlogPageWrapper';
import { BlogHomePageContext } from '/containers/blog/BlogHomePage';

function BlogHomeWrapper() {
  const { sections } = useContext(BlogHomePageContext);
  return (
    <BlogPageWrapper sections={sections}>
      <h1>Blog Homepage</h1>
      This is the blog home page. Should we show all articles here? this will
      cause duplicate content with the sections.
      <br />
      <br />
      I think we should only show featured articles here
    </BlogPageWrapper>
  );
}

BlogHomeWrapper.propTypes = {};

export default BlogHomeWrapper;
