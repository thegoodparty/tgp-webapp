/**
 *
 * CertifiedBadge
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

function CertifiedBadge({ height = 70 }) {
  return (
    <Image
      src="/images/certified-black.svg"
      alt="Good Certified"
      height={height}
      width={height}
    />
  );
}

CertifiedBadge.propTypes = {
  height: PropTypes.number,
};

export default CertifiedBadge;
