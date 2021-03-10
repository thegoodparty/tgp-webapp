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
import { makeSelectContent } from '../App/selectors';
import TgpHelmet from '../../components/shared/TgpHelmet';

export function CandidatesPage({ ssrState, content }) {
  let candidates = [];
  if (ssrState) {
    ({ candidates } = ssrState);
  }
  const childProps = {
    candidates,
    content,
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
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(CandidatesPage);
