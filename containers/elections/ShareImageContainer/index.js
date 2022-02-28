/**
 *
 * ShareImageContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ShareImageWrapper from '/components/elections/ShareImageWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ShareImageContainer({
  ssrState,
  dispatch,
  shareImageCallback,
}) {
  useInjectReducer({ key: 'ShareImageContainer', reducer });
  useInjectSaga({ key: 'ShareImageContainer', saga });

  let candidate;
  let imageAsBase64;
  let candidateSupports;
  let total;

  if (ssrState) {
    ({ candidate, imageAsBase64, candidateSupports, total } = ssrState);
    dispatch(actions.loadCandidateActionSuccess(candidate));
  }

  const childProps = {
    candidate,
    shareImageCallback,
    imageAsBase64,
    candidateSupports,
    total,
  };
  return (
    <div>
      <TgpHelmet
        title="Generate Share Image | GOOD PARTY"
        description="Generate Share Image | GOOD PARTY"
      />
      <ShareImageWrapper {...childProps} />
    </div>
  );
}

ShareImageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  shareImageCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    shareImageCallback: candidate => {
      dispatch(actions.shareImageAction(candidate));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ShareImageContainer);
