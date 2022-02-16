/**
 *
 * IssuePositionsPickerContainer
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import IssuePositionsPickerWrapper from '/components/shared/IssuePositionsPickerWrapper';

import makeSelectIssuePositionsPickerContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import snackbarActions from '../SnackbarContainer/actions';

export function IssuePositionsPickerContainer({
  dispatch,
  issuePositionsPickerContainer,
  selectedPositions,
  onChange,
  disabled = false,
  maxSelected,
  showMaxMessage,
}) {
  useInjectReducer({ key: 'issuePositionsPickerContainer', reducer });
  useInjectSaga({ key: 'issuePositionsPickerContainer', saga });

  useEffect(() => {
    dispatch(actions.loadIssueTopicsAction());
  }, []);

  const { topics } = issuePositionsPickerContainer;
  const childProps = {
    topics,
    selectedPositions: selectedPositions || [],
    onChange,
    disabled,
    maxSelected,
    showMaxMessage,
  };

  return <IssuePositionsPickerWrapper {...childProps} />;
}

IssuePositionsPickerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issuePositionsPickerContainer: PropTypes.object,
  selectedPositions: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxSelected: PropTypes.number,
  showMaxMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  issuePositionsPickerContainer: makeSelectIssuePositionsPickerContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showMaxMessage: (msg) => {
      dispatch(snackbarActions.showSnakbarAction(msg, 'error'));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(IssuePositionsPickerContainer);
