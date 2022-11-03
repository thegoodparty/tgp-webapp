/**
 *
 * PledgePage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import PledgeWrapper from '/components/PledgeWrapper';

import { getUserCookie } from '/helpers/cookieHelper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPledgePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export const PledgePageContext = createContext();

export function PledgePage({ dispatch, pledgeCallback }) {
  useInjectReducer({ key: 'pledgePage', reducer });
  useInjectSaga({ key: 'pledgePage', saga });

  const user = getUserCookie();

  useEffect(() => {
    if (!user) {
      dispatch(push('/?login=true'));
    }
  }, [user]);

  const childProps = {
    pledgeCallback,
  };

  return (
    <PledgePageContext.Provider value={childProps}>
      <TgpHelmet
        title="Take our pledge to become a good certified candidate"
        description="Take our pledge to become a good certified candidate"
      />
      <PledgeWrapper />
    </PledgePageContext.Provider>
  );
}

PledgePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pledgeCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pledgePage: makeSelectPledgePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pledgeCallback: () => {
      dispatch(actions.pledgeAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PledgePage);
