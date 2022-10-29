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
import FaqArticleModal from '/containers/faqs/FaqArticleModal';

import queryHelper from '/helpers/queryHelper';
import { setCookie } from '/helpers/cookieHelper';
import ShareModal from '/components/shared/ShareModal';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import globalActions from './actions';
import { makeSelectLocation } from './selectors';
import RegisterPage from '../entrance/RegisterPage';
import LoginPage from '../entrance/LoginPage';
import Modal from '../../components/shared/Modal';

function QueryRoutes({ locationState, dispatch }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { search } = locationState;
  const router = useRouter();
  const pathWithNoQuery = router.asPath.split('?')[0];

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

    const register = queryHelper(search, 'register');

    if (register === 'true') {
      if (!showRegister) {
        setShowRegister(true);
      }
    } else {
      if (showRegister) {
        setShowRegister(false);
      }
    }
    const login = queryHelper(search, 'login');

    if (login === 'true') {
      if (!showLogin) {
        setShowLogin(true);
      }
    } else {
      if (showLogin) {
        setShowLogin(false);
      }
    }
  }, [search]);

  const handleCloseModal = () => {
    router.push(pathWithNoQuery);
  };

  return (
    <>
      <FaqArticleModal />
      {showRegister && (
        <Modal
          open
          closeModalCallback={() => {
            setShowRegister(false);
            handleCloseModal();
          }}
        >
          <RegisterPage modalMode />
        </Modal>
      )}
      {showLogin && (
        <Modal
          open
          closeModalCallback={() => {
            setShowLogin(false);
            handleCloseModal();
          }}
        >
          <LoginPage modalMode />
        </Modal>
      )}
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
