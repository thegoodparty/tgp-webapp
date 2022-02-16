/**
 *
 * Asynchronously loads the component for DynamicLandingPage
 *
 */

import loadable from '/utils/loadable';

export default loadable(() => import('./index'));
