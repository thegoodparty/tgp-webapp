/*
 *
 * ImageUploadContainer actions
 *
 */

import types from './constants';

function uploadImageAction(image, uploadCallback) {
  return {
    type: types.UPLOAD_IMAGE,
    image,
    uploadCallback,
  };
}
export default {
  uploadImageAction,
};
