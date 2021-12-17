/**
 *
 * ChangeLogPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ChangeLogWrapper from 'components/ChangeLogWrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TgpHelmet from '../../components/shared/TgpHelmet';
import makeSelectChangeLogPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ChangeLogPage({ dispatch, changeLogPage }) {
  useInjectReducer({ key: 'changeLogPage', reducer });
  useInjectSaga({ key: 'changeLogPage', saga });

  useEffect(() => {
    dispatch(actions.loadReleasesAction());
  }, []);

  const { releases } = changeLogPage;

  const childProps = {
    releases,
  };

  return (
    <div>
      <TgpHelmet title="ChangeLog Page | GOOD PARTY" description="ChangeLog" />
      <ChangeLogWrapper {...childProps} />
    </div>
  );
}

ChangeLogPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeLogPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  changeLogPage: makeSelectChangeLogPage(),
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
)(ChangeLogPage);
