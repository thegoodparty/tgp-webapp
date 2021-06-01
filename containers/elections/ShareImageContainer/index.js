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

import ShareImageWrapper from 'components/elections/ShareImageWrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../CandidateNewPage/reducer';
import saga from '../CandidateNewPage/saga';
import actions from '../CandidateNewPage/actions';
import { makeSelectContent } from '../../App/selectors';

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
      <ShareImageWrapper {...childProps} />
    </div>
  );
}

ShareImageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  shareImageCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

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
