/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import SocialRegisterPage from 'containers/you/SocialRegisterPage/Loadable';
import FaqArticlePage from 'containers/party/FaqArticlePage/Loadable';

import queryHelper from 'helpers/queryHelper';
import { setCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import { makeSelectContent, makeSelectLocation } from './selectors';
import AnalyticsService from '../../services/AnalyticsService';

function QueryRoutes({ locationState, content, dispatch }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const { search } = locationState;

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const uuid = queryHelper(search, 'u');
    if (uuid) {
      setCookie('referrer', uuid);
    }
    const bloc = queryHelper(search, 'b');
    if (bloc) {
      blocRedirect(bloc);
    }
  }, []);

  useEffect(() => {
    const modalArticleId = queryHelper(search, 'article');
    if (modalArticleId) {
      dispatch(globalActions.setArticleModalAction(modalArticleId));
    } else {
      dispatch(globalActions.clearArticleModalAction());
    }

    const queryRegister = queryHelper(search, 'register');
    setShowRegister(queryRegister === 'true');
    if (queryRegister === 'true') {
      AnalyticsService.sendEvent('signup', 'View Account Signup Page');
    }
  }, [search]);

  const blocRedirect = bloc => {
    const [nameBloc, stateDistrict] = bloc.split('-');
    if (!stateDistrict) {
      dispatch(push(`/elections/presidential?b=${bloc}`));
    } else if (stateDistrict.length === 2) {
      dispatch(
        push(`/elections/senate/${stateDistrict.toLowerCase()}?b=${bloc}`),
      );
    } else {
      const state = stateDistrict.substring(0, 2);
      const district = stateDistrict.substring(2, stateDistrict.length);
      dispatch(
        push(`/elections/house/${state.toLowerCase()}/${district}?b=${bloc}`),
      );
    }
  };

  return (
    <>
      {content && <FaqArticlePage />}
      {showRegister && <SocialRegisterPage />}
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
