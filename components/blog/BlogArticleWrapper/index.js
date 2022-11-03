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
import { dateUsHelper } from '../../../helpers/dateHelper';

function BlogArticleWrapper() {
  const { sections, article } = useContext(BlogArticlePageContext);
  console.log('article', article);

  const { section, author, body, mainImage, publishDate, readingTime, title } =
    article;
  const sectionSlug = section?.fields?.slug;
  return (
    <BlogPageWrapper sections={sections} sectionSlug={sectionSlug}>
      <Grid container spacing={3} alignItems="center">
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
          <div>
            <div className={styles.section}>{section.fields?.title}</div>
            <h1 className={styles.h1}>{title}</h1>
            <div className={styles.time}>{readingTime?.text}</div>
            <div className={styles.topAuthorWrapper}>
              <div className={styles.authorImage}>
                <Image
                  src={`https:${author.fields.image.url}`}
                  alt={mainImage.alt}
                  width={60}
                  height={60}
                />
              </div>
              <div className={styles.authorNameTop}>
                {author.fields.name} &middot; {dateUsHelper(publishDate)}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className={styles.maxWidth}>
        <div className={styles.copy}>{contentfulHelper(body)}</div>

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
                <div className={styles.authorSummary}>
                  {author.fields.summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlogPageWrapper>
  );
}

BlogArticleWrapper.propTypes = {};

export default BlogArticleWrapper;
