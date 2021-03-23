/**
 *
 * EndorseIframe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PurpleButton } from 'components/shared/buttons';
import ENV from 'api/ENV';

function EndorseIframe({ ssrState }) {
  const { candidate } = ssrState;
  const { id, firstName, lastName } = candidate;
  const intId = parseInt(id, 10); // to prevent xss;
  return (
    <a
      href={`https://${
        ENV !== 'prod' ? 'dev.' : ''
      }thegoodparty.org/candidate/${firstName}-${lastName}/${intId}?redirect=true`}
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

EndorseIframe.propTypes = {
  ssrState: PropTypes.object,
};

export default EndorseIframe;
