/**
 *
 * ImageUploadContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ImageUploadWrapper from '/components/shared/ImageUploadWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectImageUploadContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ImageUploadContainer({ fileSelectCallback, uploadCallback }) {
  useInjectReducer({ key: 'imageUploadContainer', reducer });
  useInjectSaga({ key: 'imageUploadContainer', saga });

  const childProps = {
    fileSelectCallback,
    uploadCallback,
  };

  return <ImageUploadWrapper {...childProps} />;
}

ImageUploadContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uploadCallback: PropTypes.func,
  fileSelectCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  imageUploadContainer: makeSelectImageUploadContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fileSelectCallback: (image, uploadCallback) => {
      dispatch(actions.uploadImageAction(image, uploadCallback));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ImageUploadContainer);
