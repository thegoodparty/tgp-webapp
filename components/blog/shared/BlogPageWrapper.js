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

function BlogPageWrapper({
  children,
  sections,
  useH1,
  sectionSlug,
  sectionTitle,
}) {
  return (
    <PageWrapper>
      <div>
        {useH1 && !sectionTitle ? (
          <h1 className={styles.blogTitle}>Blog</h1>
        ) : (
          <h2 className={styles.blogTitle}>Blog</h2>
        )}
      </div>
      <div className={styles.sectionsWrapper}>
        <div className={styles.sections}>
          <Link href="/blog" style={{ display: 'inline-flex' }}>
            <AiOutlineHome size={18} />
          </Link>
          {sections.map((section) => (
            <>
              {section.fields.slug === sectionSlug ? (
                <div className={`${styles.section} ${styles.active}`}>
                  {section.fields.title}
                </div>
              ) : (
                <Link
                  href={`/blog/section/${section.fields.slug}`}
                  key={section.id}
                  className={styles.section}
                >
                  {section.fields.title}
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
      {sectionTitle && (
        <div className={styles.titleWrapper}>
          <h1 className={styles.sectionTitle}>
            <span className={styles.up}>{sectionTitle}</span>
            <span className={styles.yellow} />
          </h1>
        </div>
      )}
      {children}
    </PageWrapper>
  );
}

BlogPageWrapper.propTypes = {};

export default BlogPageWrapper;
