/**
 *
 * GoodPracticesPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGoodPracticesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import TgpHelmet from '../../components/shared/TgpHelmet';
import GoodPracticesWrapper from '../../components/GoodPracticesWrapper';

export function GoodPracticesPage({ ssrState }) {
  useInjectReducer({ key: 'goodPracticesPage', reducer });
  useInjectSaga({ key: 'goodPracticesPage', saga });
  const { content, candidates } = ssrState;

  const childProps = {
    content,
    candidates,
  };
  return (
    <div>
      <TgpHelmet
        title="Good practices | GOOD PARTY"
        description="How to win elections with Good Party - Launch, Grow and Win!"
      />
      <GoodPracticesWrapper {...childProps} />
    </div>
  );
}

GoodPracticesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  goodPracticesPage: makeSelectGoodPracticesPage(),
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
)(GoodPracticesPage);
