/**
 *
 * AdminArticlesPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import makeSelectUser from 'containers/you/YouPage/selectors';
import TgpHelmet from 'components/shared/TgpHelmet';
import AdminArticlesFeedback from 'components/admin/AdminArticlesFeedback';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminArticlesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectContent } from '../../App/selectors';
import actions from './actions';

export function AdminArticlesPage({
  dispatch,
  userState,
  content,
  adminArticlesPage,
}) {
  useInjectReducer({ key: 'adminArticlesPage', reducer });
  useInjectSaga({ key: 'adminArticlesPage', saga });

  const { articlesFeedback } = adminArticlesPage;
  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);

  useEffect(() => {
    console.log('loading articles');
    dispatch(actions.loadArticlesFeedback());
  }, []);

  const childProps = {
    content,
    articles: articlesFeedback,
  };

  return (
    <div>
      <TgpHelmet title="Admin Articles Page" />
      <AdminArticlesFeedback {...childProps} />
    </div>
  );
}

AdminArticlesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminArticlesPage: PropTypes.object,
  userState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  adminArticlesPage: makeSelectAdminArticlesPage(),
  userState: makeSelectUser(),
  content: makeSelectContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminArticlesPage);
