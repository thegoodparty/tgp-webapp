/**
 *
 * BlogPageWrapper
 *
 */

import React from 'react';
import Link from 'next/link';
import PageWrapper from '../../shared/PageWrapper';
import styles from './BlogPageWrapper.module.scss';
import { AiOutlineHome } from 'react-icons/ai';

function BlogPageWrapper({ children, sections, useH1 }) {
  console.log('se', sections);
  return (
    <PageWrapper>
      <div>
        {useH1 ? (
          <h1 className={styles.blogTitle}>Blog</h1>
        ) : (
          <h2 className={styles.blogTitle}>Blog</h2>
        )}
      </div>
      <div className={styles.sectionsWrapper}>
        <div className={styles.sections}>
          <Link href="/blog" passHref>
            <a style={{ display: 'inline-flex' }}>
              <AiOutlineHome size={18} />
            </a>
          </Link>
          {sections.map((section) => (
            <Link
              href={`/blog/section/${section.fields.slug}`}
              passHref
              key={section.id}
            >
              <a className={styles.section}>{section.fields.title}</a>
            </Link>
          ))}
        </div>
        <div>Share</div>
      </div>
      {children}
    </PageWrapper>
  );
}

BlogPageWrapper.propTypes = {};

export default BlogPageWrapper;
