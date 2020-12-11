/**
 *
 * Asynchronously loads the component for AllCandidatesToScrape
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
