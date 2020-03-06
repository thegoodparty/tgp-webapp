/**
 *
 * ZipFinderPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ZipFinderWrapper from 'components/intro/ZipFinderWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectZipFinderPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ZipFinderPage() {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  return (
    <div>
      <Helmet>
        <title>ZipFinderPage</title>
        <meta name="description" content="Description of ZipFinderPage" />
      </Helmet>
      <ZipFinderWrapper />
    </div>
  );
}

ZipFinderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  zipFinderPage: makeSelectZipFinderPage(),
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

export default compose(withConnect)(ZipFinderPage);
