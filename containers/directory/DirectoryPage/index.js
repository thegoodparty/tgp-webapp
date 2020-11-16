/**
 *
 * DirectoryPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import DirectoryWrapper from 'components/directory/DirectoryWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDirectoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function DirectoryPage({ dispatch, directoryPage }) {
  useInjectReducer({ key: 'directoryPage', reducer });
  useInjectSaga({ key: 'directoryPage', saga });

  const { candidates } = directoryPage;
  useEffect(() => {
    if (!candidates) {
      dispatch(actions.allCandidatesAction());
    }
  }, []);

  const childProps = {
    candidates,
  };
  return (
    <div>
      <Helmet>
        <title>Directory Page | The Good Party</title>
        <meta name="description" content="Directory Page" />
      </Helmet>
      <DirectoryWrapper {...childProps} />
    </div>
  );
}

DirectoryPage.propTypes = {
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
)(DirectoryPage);
