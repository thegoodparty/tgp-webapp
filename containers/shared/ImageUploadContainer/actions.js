/*
 *
 * ImageUploadContainer actions
 *
 */

import types from './constants';

function uploadImageAction(image, uploadCallback, isUserImage = false) {
  return {
    type: types.UPLOAD_IMAGE,
    image,
    uploadCallback,
    isUserImage,
  };
}
export default {
  uploadImageAction,
};
