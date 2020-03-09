/**
 *
 * Asynchronously loads the component for SharePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
