/**
 *
 * Asynchronously loads the component for ImageCrop
 *
 */

import loadable from '/utils/loadable';

export default loadable(() => import('./index'));
