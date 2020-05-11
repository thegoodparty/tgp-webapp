/**
 *
 * CreatorsHeader
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';

export function CreatorsHeader() {
  return <CreatorsHeaderWrapper />;
}

CreatorsHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

export default compose(
  withConnect,
  memo,
)(CreatorsHeader);
