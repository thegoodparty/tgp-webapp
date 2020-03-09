/**
 *
 * PresidentialElectionPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';

import districtActions from 'containers/intro/ZipFinderPage/actions';
import globalActions from 'containers/App/actions';
import ElectionWrapper from 'components/elections/ElectionWrapper';
import makeSelectZipFinderPage from '../../intro/ZipFinderPage/selectors';
import { makeSelectContent, makeSelectLocation } from '../../App/selectors';

export function PresidentialElectionPage({ content, districtState, dispatch }) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  const { presidential } = districtState;
  useEffect(() => {
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
    if (!content) {
      dispatch(globalActions.loadContentAction());
    }
  }, []);

  const childProps = {
    candidates: presidential,
    content,
    electionType: 'Presidential',
  };
  return (
    <div>
      <Helmet>
        <title>Presidential Election | The Good Party</title>
        <meta
          name="description"
          content="Presidential Election | The Good Party"
        />
      </Helmet>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

PresidentialElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  districtState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  search: makeSelectLocation(),
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
)(PresidentialElectionPage);
