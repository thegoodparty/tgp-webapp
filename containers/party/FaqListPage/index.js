/**
 *
 * FaqListPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';

import FaqListWrapper from '/components/party/FaqListWrapper';
import globalActions from '/containers/App/actions';
import TgpHelmet from '/components/shared/TgpHelmet';

export function FaqListPage({  ssrState }) {
  const router = useRouter();

  const { content } = ssrState;

  const childProps = {
    content,
    backButtonCallback: () => router.back(),
  };
  return (
    <div>
      <TgpHelmet
        title="FAQs | GOOD PARTY"
        description="Frequently Asked Questions about GOOD PARTY."
      />
      <FaqListWrapper {...childProps} />
    </div>
  );
}

FaqListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backButtonCallback: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqListPage);
