/**
 *
 * Asynchronously loads the component for Sitemap
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
