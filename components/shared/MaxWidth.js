import React from 'react';
import styles from './MaxWidth.module.scss';

export const Padder = ({ children }) => {
  return <div className={styles.padder}>{children}</div>;
};

function MaxWidth({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default MaxWidth;
