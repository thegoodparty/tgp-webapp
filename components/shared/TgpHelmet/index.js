/**
 *
 * TgpHelmet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function TgpHelmet({ title, description, image }) {
  return (
    <Helmet>
      {title && <title data-cy="page-title">{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {description && (
        <meta
          name="description"
          data-cy="page-description"
          content={description}
        />
      )}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}

TgpHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default TgpHelmet;
