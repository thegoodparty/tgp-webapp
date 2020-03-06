/**
 *
 * Asynchronously loads the component for SplashPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
