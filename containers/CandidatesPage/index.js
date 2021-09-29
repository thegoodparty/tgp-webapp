/**
 *
 * CandidatesPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidatesWrapper from 'components/CandidatesWrapper';
import TgpHelmet from '../../components/shared/TgpHelmet';

export function CandidatesPage({ ssrState }) {
  let candidates = [];
  let pageContent = {};
  if (ssrState) {
    ({ candidates, pageContent } = ssrState);
  }
  const childProps = {
    candidates,
    pageContent,
  };

  return (
    <div>
      <TgpHelmet
        title="Candidates | GOOD PARTY"
        description="Good Certified Candidates on GOOD PARTY are all Non-Partisan, Small Money and Anti-Corruption."
      />
      <CandidatesWrapper {...childProps} />
    </div>
  );
}

CandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeState: PropTypes.object,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(CandidatesPage);
