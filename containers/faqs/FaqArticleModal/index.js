/**
 *
 * FaqArticleModal
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';

import queryHelper from '/helpers/queryHelper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import { makeSelectLocation } from '/containers/App/selectors';
import FaqArticleModalWrapper from '/components/faqs/FaqArticleModalWrapper';

import reducer from './reducer';
import saga from './saga';
import actions from './actions';

import makeSelectFaqArticleModal from './selectors';

export function FaqArticleModal({
  dispatch,
  helpfulCallback,
  locationState,
  FaqArticleModal,
}) {
  useInjectReducer({ key: 'faqArticle', reducer });
  useInjectSaga({ key: 'faqArticle', saga });
  const { search } = locationState;
  const router = useRouter();
  const id = queryHelper(search, 'article');
  useEffect(() => {
    if (id) {
      dispatch(actions.loadArticleAction(id));
    }
  }, [id]);

  const { article } = FaqArticleModal;

  if (!id || !article) {
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
      <FaqArticleModalWrapper {...childProps} />
    </div>
  );
}

FaqArticleModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  helpfulCallback: PropTypes.func,
  locationState: PropTypes.object,
  FaqArticleModal: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    helpfulCallback: (id, title, isHelpful, feedback) => {
      dispatch(
        actions.sendArticleFeedbackAction(id, title, isHelpful, feedback),
      );
    },
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
  FaqArticleModal: makeSelectFaqArticleModal(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqArticleModal);
