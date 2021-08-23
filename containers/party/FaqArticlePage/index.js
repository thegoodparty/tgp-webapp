/**
 *
 * FaqArticlePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import queryHelper from 'helpers/queryHelper';
import { createStructuredSelector } from 'reselect';
import actions from './actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';

import FaqArticleWrapper from 'components/party/FaqArticleWrapper';
import { getArticleById } from 'helpers/articlesHelper';

export function FaqArticlePage({ content, helpfulCallback, locationState }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const [article, setArticle] = useState(null);
  const { search } = locationState;
  const router = useRouter();
  const id = queryHelper(search, 'article');
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
    closeModalCallback: () => router.push(window.location.pathname),
    helpfulCallback,
  };

  return (
    <div>
      <Head>
        <title data-cy="page-title">FAQ Article</title>
        <meta name="description" content="FAQ Article" />
      </Head>
      <FaqArticleWrapper {...childProps} />
    </div>
  );
}

FaqArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  helpfulCallback: PropTypes.func,
  locationState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    helpfulCallback: (id, title, isHelpful, feedback) => {
      console.log('here helpful callback page');
      dispatch(
        actions.sendArticleFeedbackAction(id, title, isHelpful, feedback),
      );
    },
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqArticlePage);
