/**
 *
 * Asynchronously loads the component for AdminMenu
 *
 */

import loadable from '/utils/loadable';

export default loadable(() => import('./index'));
