/**
 *
 * LeverCareers
 *
 */

import React from 'react';
import styles from './LeverCareers.module.scss';

function LeverCareers() {
  return (
    <section className={styles.wrapper}>
      <h2 data-cy="opening-title" className={styles.h2}>
        Current Openings
      </h2>
      <div id="lever-jobs-container" />
    </section>
  );
}

LeverCareers.propTypes = {};

export default LeverCareers;
