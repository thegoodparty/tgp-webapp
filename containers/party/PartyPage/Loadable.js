/**
 *
 * Asynchronously loads the component for YouPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
