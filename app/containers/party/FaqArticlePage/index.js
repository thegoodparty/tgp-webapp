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

import {
  makeSelectContent,
  makeSelectModalArticleId,
} from 'containers/App/selectors';

import FaqArticleWrapper from 'components/party/FaqArticleWrapper';
import { getArticleById } from 'helpers/articlesHelper';

export function FaqArticlePage({ id, content, dispatch, backButtonCallback }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (content) {
      setArticle(getArticleById(content.faqArticles, id));
    }
    console.log('id effect');
  }, [id]);

  if (!id) {
    return <></>;
  }

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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    backButtonCallback: () => {
      dispatch(goBack());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  id: makeSelectModalArticleId(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqArticlePage);
