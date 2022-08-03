/*
 *
 * PledgePage actions
 *
 */

import types from './constants';

function pledgeAction() {
  return {
    type: types.PLEDGE,
  };
}

export default {
  pledgeAction,
};
