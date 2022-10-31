/**
 *
 * BlogHomePage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import BlogHomeWrapper from '/components/blog/BlogHomeWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectBlogHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const BlogHomePageContext = createContext();

export function BlogHomePage({ ssrState }) {
  useInjectReducer({ key: 'blogHomePage', reducer });
  useInjectSaga({ key: 'blogHomePage', saga });

  const { sections } = ssrState;

  const childProps = { sections };

  return (
    <BlogHomePageContext.Provider value={childProps}>
      <TgpHelmet title="Blog | Good Party" description="Good Party Blog" />
      <BlogHomeWrapper />
    </BlogHomePageContext.Provider>
  );
}

BlogHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blogHomePage: makeSelectBlogHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BlogHomePage);
