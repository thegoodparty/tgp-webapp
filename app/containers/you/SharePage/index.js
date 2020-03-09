/**
 *
 * SharePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import ShareWrapper from 'components/you/ShareWrapper';

export function SharePage() {
  return (
    <div>
      <Helmet>
        <title>Share The Message! | The Good Party</title>
        <meta
          name="description"
          content="Share The Message! | The Good Party"
        />
      </Helmet>
      <ShareWrapper />
    </div>
  );
}

export default compose(memo)(SharePage);
