/**
 *
 * FaqArticlePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { goBack } from 'connected-react-router';

import { createStructuredSelector } from 'reselect';

import { makeSelectContent } from 'containers/App/selectors';

import FaqArticleWrapper from 'components/party/FaqArticleWrapper';
import { getArticleById } from '../../../helpers/articlesHelper';

export function FaqArticlePage({ id, content, dispatch, backButtonCallback }) {
  const [article, setArticle] = useState(null);
  useEffect(() => {
    if (!id) {
      dispatch(push('/party/faqs'));
    }
  }, []);

  useEffect(() => {
    if (content) {
      setArticle(getArticleById(content.faqArticles, id));
    }
  }, [content]);

  const childProps = {
    article,
    backButtonCallback,
  };

  return (
    <div>
      <Helmet>
        <title>{article ? article.title : 'FAQ Article'}</title>
        <meta
          name="description"
          content={article ? article.title : 'FAQ Article'}
        />
      </Helmet>
      <FaqArticleWrapper {...childProps} />
    </div>
  );
}

FaqArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backButtonCallback: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    id: ownProps.match.params.id,
    backButtonCallback: () => {
      dispatch(goBack());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqArticlePage);
