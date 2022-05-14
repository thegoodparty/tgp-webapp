/**
 *
 * FeedbackContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FeedbackWrapper from '/components/shared/FeedbackWrapper';
import { getExperiment } from '/helpers/optimizeHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectFeedbackContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function FeedbackContainer({
  sendFeedbackCallback,
  mode,
  toggleModalCallback,
  feedbackContainer,
}) {
  useInjectReducer({ key: 'feedbackContainer', reducer });
  useInjectSaga({ key: 'feedbackContainer', saga });

  const [experimentVariant, setExperimentVariant] = useState('0');
  useEffect(() => {
    getExperiment('homepage-language', '5H5-CrICR-qVMSCUUTp7MQ', (type) => {
      setExperimentVariant(type);
    });
  }, []);

  const { isOpen } = feedbackContainer;

  const childProps = {
    sendFeedbackCallback,
    mode,
    toggleModalCallback,
    isOpen,
    experimentVariant,
  };

  return <FeedbackWrapper {...childProps} />;
}

FeedbackContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sendFeedbackCallback: PropTypes.func,
  toggleModalCallback: PropTypes.func,
  mode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  feedbackContainer: makeSelectFeedbackContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sendFeedbackCallback: (thumbs, suggestion) => {
      dispatch(actions.sendFeedbackAction(thumbs, suggestion));
    },
    toggleModalCallback: (isOpen) => {
      dispatch(actions.toggleModalAction(isOpen));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FeedbackContainer);
