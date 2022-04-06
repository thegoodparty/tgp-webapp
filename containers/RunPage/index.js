/**
 *
 * RunPage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectRunPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import RunWrapper from '../../components/RunWrapper';

export const RunPageContext = createContext();

export function RunPage() {
  useInjectReducer({ key: 'runPage', reducer });
  useInjectSaga({ key: 'runPage', saga });

  const childProps = {};

  return (
    <RunPageContext.Provider value={childProps}>
      <TgpHelmet
        title="Run as an Indie or 3rd Party. | Good Party"
        description="We’ve made it simple and free like democracy should be."
      />
      <RunWrapper />
    </RunPageContext.Provider>
  );
}

RunPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  runPage: makeSelectRunPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RunPage);
