/**
 *
 * AboutPage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '../../../components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import makeSelectAboutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import AboutWrapper from '../../../components/company/AboutWrapper';

export const AboutPageContext = createContext();

export function AboutPage({ ssrState }) {
  useInjectReducer({ key: 'aboutPage', reducer });
  useInjectSaga({ key: 'aboutPage', saga });
  const featuredCandidates = ssrState.candidates;

  const childProps = { featuredCandidates };

  return (
    <AboutPageContext.Provider value={childProps}>
      <TgpHelmet
        title="About | GOOD PARTY"
        description="Learn about GOOD PARTY."
      />
      <AboutWrapper />
    </AboutPageContext.Provider>
  );
}

AboutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  aboutPage: makeSelectAboutPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AboutPage);
