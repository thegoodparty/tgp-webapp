/**
 *
 * BlogArticleWrapper
 *
 */

import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

import { BlogArticlePageContext } from '/containers/blog/BlogArticlePage';
import BlogPageWrapper from '../shared/BlogPageWrapper';
import styles from './BlogArticle.module.scss';
import contentfulHelper from '../../../helpers/contentfulHelper';

function BlogArticleWrapper() {
  const { sections, article } = useContext(BlogArticlePageContext);
  if (!article) {
    return <></>;
  }

  const { section, author, body, mainImage, publishDate, readingTime, title } =
    article;
  const sectionSlug = section?.fields?.slug;
  return (
    <BlogPageWrapper sections={sections} sectionSlug={sectionSlug}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <div className={styles.image}>
            <Image
              src={`https:${mainImage.url}`}
              alt={mainImage.alt}
              layout="fill"
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={styles.section}>{section.fields?.title}</div>
          <h1 className={styles.h1}>{title}</h1>
          <div className={styles.time}>{readingTime?.text}</div>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={styles.reverseGrid}>
        <Grid item xs={12} lg={10}>
          <div className={styles.copy}>{contentfulHelper(body)}</div>
        </Grid>
        <Grid item xs={12} lg={2}>
          <div className="text-center">Share</div>
        </Grid>
      </Grid>
      <div className={styles.authorWrapper}>
        <div className={styles.authorInner}>
          <div className={styles.author}>
            <div>
              <div className={styles.authorImage}>
                <Image
                  src={`https:${author.fields.image.url}`}
                  alt={mainImage.alt}
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div>
              <div className={styles.authorName}>By {author.fields.name}</div>
              <div className={styles.authorSummary}>{author.fields.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </BlogPageWrapper>
  );
}

BlogArticleWrapper.propTypes = {};

export default BlogArticleWrapper;
