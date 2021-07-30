/**
 *
 * TeamPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import TeamWrapper from 'components/TeamWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function TeamPage({ ssrState }) {
  useInjectReducer({ key: 'teamPage', reducer });
  useInjectSaga({ key: 'teamPage', saga });

  const { content } = ssrState;

  const childProps = {
    content,
  };

  return (
    <div>
      <TgpHelmet title="Team | GOOD PARTY" description="TGP team" />
      <TeamWrapper {...childProps} />
    </div>
  );
}

TeamPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamPage: makeSelectTeamPage(),
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
)(TeamPage);
