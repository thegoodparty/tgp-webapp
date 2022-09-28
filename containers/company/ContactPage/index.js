/**
 *
 * ContactPage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectContactPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ContactWrapper from '../../../components/company/ContactWrapper';

export const ContactPageContext = createContext();

export function ContactPage() {
  useInjectReducer({ key: 'contactPage', reducer });
  useInjectSaga({ key: 'contactPage', saga });

  const childProps = {};

  return (
    <ContactPageContext.Provider value={childProps}>
      <TgpHelmet title="Contact Us" description="Contact us" />
      <ContactWrapper />
    </ContactPageContext.Provider>
  );
}

ContactPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contactPage: makeSelectContactPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ContactPage);
