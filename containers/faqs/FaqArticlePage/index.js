/**
 *
 * FaqArticlePage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FaqArticleWrapper from '/components/faqs/FaqArticleWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectFaqArticlePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export const FaqArticlePageContext = createContext();

export function FaqArticlePage({ ssrState }) {
  useInjectReducer({ key: 'faqArticlePage', reducer });
  useInjectSaga({ key: 'faqArticlePage', saga });

  const { article } = ssrState;
  const { title } = article;

  const childProps = { article };

  return (
    <FaqArticlePageContext.Provider value={childProps}>
      <TgpHelmet
        title={`${title} | ${article.category?.fields?.name} | FAQs`}
        description={`${title} | ${article.category?.fields?.name} | Frequently Asked Questions | GOOD PARTY`}
      />
      <FaqArticleWrapper />
    </FaqArticlePageContext.Provider>
  );
}

FaqArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faqArticlePage: makeSelectFaqArticlePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FaqArticlePage);
