/**
 *
 * TgpHelmet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

function TgpHelmet({ title, ogTitle, description, image }) {
  return (
    <Head>
      {title && <title data-cy="page-title">{title}</title>}
      {title && <meta property="og:title" content={ogTitle || title} />}
      {description && (
        <meta
          name="description"
          data-cy="page-description"
          content={description}
        />
      )}
      {description && <meta property="og:description" content={description} />}
      {image ? (
        <meta property="og:image" content={image} />
      ) : (
        <meta
          property="og:image"
          content="https://assets.goodparty.org/share.jpg"
        />
      )}
    </Head>
  );
}

TgpHelmet.propTypes = {
  title: PropTypes.string,
  ogTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default TgpHelmet;
