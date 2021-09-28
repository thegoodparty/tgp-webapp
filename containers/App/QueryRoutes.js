/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-next-router';

import SocialRegisterPage from 'containers/you/SocialRegisterPage';
import FaqArticlePage from 'containers/party/FaqArticlePage';

import queryHelper from 'helpers/queryHelper';
import { setCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import { makeSelectContent, makeSelectLocation } from './selectors';
import { logEvent } from '../../services/AnalyticsService';
import ShareModal from '../../components/elections/CandidateNewWrapper/ShareModal';

function QueryRoutes({ locationState, content, dispatch }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { search } = locationState;
  const router = useRouter();
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const uuid = queryHelper(search, 'u');
    if (uuid) {
      setCookie('referrer', uuid);
    }
  }, []);

  useEffect(() => {
    const modalArticleId = queryHelper(search, 'article');

    if (modalArticleId) {
      dispatch(globalActions.setArticleModalAction(modalArticleId));
    } else {
      dispatch(globalActions.clearArticleModalAction());
    }

    const queryShare = queryHelper(search, 'share');
    const isCandidatePage = router.pathname === '/candidate/[...NameIdTab]';
    setShowShare(queryShare === 'true' && !isCandidatePage);
  }, [search]);

  return (
    <>
      {content && <FaqArticlePage />}
      {showShare && <ShareModal />}
    </>
  );
}

QueryRoutes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(QueryRoutes);
