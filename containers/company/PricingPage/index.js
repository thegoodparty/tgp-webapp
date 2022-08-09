/**
 *
 * PricingPage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import PricingWrapper from '/components/company/PricingWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPricingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const PricingPageContext = createContext();

export function PricingPage() {
  useInjectReducer({ key: 'pricingPage', reducer });
  useInjectSaga({ key: 'pricingPage', saga });

  const childProps = {};

  return (
    <PricingPageContext.Provider value={childProps}>
      <TgpHelmet
        title="Pricing Page"
        description="Flexible plans to help grow and scale civic engagement campaigns"
      />
      <PricingWrapper />
    </PricingPageContext.Provider>
  );
}

PricingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pricingPage: makeSelectPricingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PricingPage);
