/**
 *
 * EndorseIframe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { PurpleButton } from 'components/shared/buttons';

function EndorseIframe() {
  const router = useRouter();
  const { id } = router.query;
  const intId = parseInt(id, 10); // to prevent xss;
  return (
    <a
      href={`https://dev.thegoodparty.org/embed/redirect/${intId}`}
      target="_blank"
      style={{
        minWidth: '150px',
      }}
    >
      <PurpleButton
        fullWidth
        style={{
          minWidth: '150px',
        }}
      >
        <img
          src="/images/white-heart.svg"
          style={{
            marginRight: '8px',
          }}
        />{' '}
        ENDORSE
      </PurpleButton>
    </a>
  );
}

EndorseIframe.propTypes = {};

export default EndorseIframe;
