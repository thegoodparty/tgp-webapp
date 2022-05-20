/**
 *
 * ManifestoPage
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ManifestoWrapper from '/components/ManifestoWrapper';

// import { useInjectSaga } from '/utils/injectSaga';
// import { useInjectReducer } from '/utils/injectReducer';
// import makeSelectManifestoPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';

// export const ManifestoPageContext = createContext();

export function ManifestoPage() {
  // useInjectReducer({ key: 'manifestoPage', reducer });
  // useInjectSaga({ key: 'manifestoPage', saga });

  // const childProps = {};

  return (
    <div>
      <TgpHelmet
        title="The #goodparty Manifesto"
        description="for the love of us over it!"
      />
      <ManifestoWrapper />
    </div>
  );
}

ManifestoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // manifestoPage: makeSelectManifestoPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ManifestoPage);
