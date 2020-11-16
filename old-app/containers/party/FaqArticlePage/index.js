/**
 *
 * FaqArticlePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack, replace } from 'connected-react-router';

import { createStructuredSelector } from 'reselect';

import globalActions from 'containers/App/actions';

import {
  makeSelectContent,
  makeSelectModalArticleId,
} from 'containers/App/selectors';

import FaqArticleWrapper from 'components/party/FaqArticleWrapper';
import { getArticleById } from 'helpers/articlesHelper';
import TgpHelmet from 'components/shared/TgpHelmet';

export function FaqArticlePage({
  id,
  content,
  backButtonCallback,
  closeModalCallback,
  helpfulCallback,
}) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (content) {
      setArticle(getArticleById(content.faqArticles, id));
    }
  }, [id]);

  if (!id) {
    return <></>;
  }

  const childProps = {
    article,
    backButtonCallback,
    closeModalCallback,
    helpfulCallback,
  };

  return (
    <div>
      <TgpHelmet
        title={article ? article.title : 'FAQ Article'}
        description={article ? article.title : 'FAQ Article'}
      />
      <FaqArticleWrapper {...childProps} />
    </div>
  );
}

FaqArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backButtonCallback: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  closeModalCallback: PropTypes.func,
  helpfulCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    backButtonCallback: () => {
      dispatch(goBack());
    },
    closeModalCallback: () => {
      if (document.referrer && !document.referrer.includes(location.host)) {
        dispatch(replace(window.location.pathname));
      } else {
        dispatch(goBack());
      }
    },
    helpfulCallback: (id, title, isHelpful, feedback) => {
      dispatch(
        globalActions.sendArticleFeedbackAction(id, title, isHelpful, feedback),
      );
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
