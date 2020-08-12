import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDirectoryPage from 'containers/directory/DirectoryPage/selectors';
import reducer from 'containers/directory/DirectoryPage/reducer';
import saga from 'containers/directory/DirectoryPage/saga';
import actions from 'containers/directory/DirectoryPage/actions';
import getSitemap from 'helpers/sitemap';

const Sitemap = ({ dispatch, directoryPage }) => {
  useInjectReducer({ key: 'directoryPage', reducer });
  useInjectSaga({ key: 'directoryPage', saga });

  const { candidates } = directoryPage;
  useEffect(() => {
    if (!candidates) {
      dispatch(actions.allCandidatesAction());
    }
  }, []);
  const sitemap = getSitemap(candidates);
  return (

    <>
      {'<?xml version="1.0" encoding="UTF-8"?>'}
      {sitemap}
    </>
  )
};
Sitemap.propTypes = {
  dispatch: PropTypes.func.isRequired,
  directoryPage: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  directoryPage: makeSelectDirectoryPage(),
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
)(Sitemap);
