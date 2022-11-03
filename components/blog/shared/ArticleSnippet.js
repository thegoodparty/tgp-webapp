/**
 *
 * ArticleSnippet
 *
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import TimeAgo from 'react-timeago';
import { HiArrowNarrowRight } from 'react-icons/hi';

import styles from './ArticleSnippet.module.scss';

function ArticleSnippet({ article, heroMode }) {
  const { title, mainImage, section, publishDate, summary, readingTime, slug } =
    article;
  const sectionName = section?.fields?.title;

  return (
    <Link href={`/blog/article/${slug}`} className="no-underline">
      <article className={`${styles.wrapper} ${heroMode && styles.hero}`}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={heroMode ? 4 : 12}>
            <div className={`${styles.image} ${heroMode && styles.heroImage}`}>
              <Image
                src={`https:${mainImage.url}`}
                alt={mainImage.alt}
                layout="fill"
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={heroMode ? 8 : 12}>
            <div className={styles.content}>
              <div>
                <div className={styles.topSection}>
                  <strong>{sectionName}</strong> &middot;{' '}
                  <TimeAgo date={publishDate} />
                </div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.summary}>{summary}</p>
              </div>
              <div className={styles.bottom}>
                <div className={styles.time}>
                  {readingTime && readingTime.text}
                </div>

                <div className={styles.full}>
                  <div>Read Full &nbsp;</div> <HiArrowNarrowRight />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </article>
    </Link>
  );
}

ArticleSnippet.propTypes = {};

export default ArticleSnippet;
