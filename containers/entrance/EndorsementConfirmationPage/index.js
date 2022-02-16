/**
 *
 * EndorsementConfirmationPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from '/components/shared/TgpHelmet';
import EndorsementConfirmationWrapper from '/components/entrance/EndorsementConfirmationWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectEndorsementConfirmationPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function EndorsementConfirmationPage({ ssrState }) {
  useInjectReducer({ key: 'endorsementConfirmationPage', reducer });
  useInjectSaga({ key: 'endorsementConfirmationPage', saga });

  const { candidate, id, candidateSupports, total } = ssrState;
  console.log('cc', candidate, candidateSupports, total);

  const childProps = {
    candidate,
    total,
  };

  return (
    <div>
      <TgpHelmet
        title="Endorsement Confirmation | GOOD PARTY"
        description="You endorsed Tomer ggg"
      />
      <EndorsementConfirmationWrapper {...childProps} />
    </div>
  );
}

EndorsementConfirmationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  endorsementConfirmationPage: makeSelectEndorsementConfirmationPage(),
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
)(EndorsementConfirmationPage);
