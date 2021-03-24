/**
 *
 * RedirectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import TgpHelmet from '../../../../components/shared/TgpHelmet';
import RedirectWrapper from '../../../../components/EndorseIframe/RedirectWrapper';

export function RedirectPage({ ssrState }) {
  const { candidate } = ssrState;
  const { id, firstName, lastName, race } = candidate;
  const childProps = {
    candidate,
  };
  return (
    <div>
      <TgpHelmet
        title={`Redirect to ${firstName} ${lastName} for ${race}`}
        image={`https://s3-us-west-2.amazonaws.com/assets.thegoodparty.org/share-image/${firstName
          .trim()
          .toLowerCase()}-${lastName.trim().toLowerCase()}-${id}-share.jpeg`}
      />
      <RedirectWrapper {...childProps} />
    </div>
  );
}

RedirectPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RedirectPage);
