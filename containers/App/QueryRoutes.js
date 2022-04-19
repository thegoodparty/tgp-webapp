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
import FaqArticlePage from '/containers/party/FaqArticlePage';

import queryHelper from '/helpers/queryHelper';
import { setCookie } from '/helpers/cookieHelper';
import ShareModal from '/components/shared/ShareModal';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import { makeSelectLocation } from './selectors';

function QueryRoutes({ locationState, dispatch }) {
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
  const isCandidatePage = router.pathname === '/candidate/[...NameId]';
  useEffect(() => {
    const modalArticleId = queryHelper(search, 'article');

    if (modalArticleId) {
      dispatch(globalActions.setArticleModalAction(modalArticleId));
    } else {
      dispatch(globalActions.clearArticleModalAction());
    }

    const queryShare = queryHelper(search, 'share');

    setShowShare(queryShare === 'true');
  }, [search]);

  return (
    <>
      <FaqArticlePage />
      {showShare && <ShareModal isCandidate={isCandidatePage} />}
    </>
  );
}

QueryRoutes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QueryRoutes);
