/**
 *
 * ConfirmPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getUserCookie } from 'helpers/cookieHelper';
import TgpHelmet from 'components/shared/TgpHelmet';
import ConfirmWrapper from 'components/entrance/ConfirmWrapper';
import candidateNewPageSaga from 'containers/elections/CandidateNewPage/saga';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectConfirmPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ConfirmPage({ confirmCodeCallback, resendCodeCallback }) {
  useInjectReducer({ key: 'confirmPage', reducer });
  useInjectSaga({ key: 'confirmPage', saga });
  useInjectSaga({ key: 'candidateNewPage', saga: candidateNewPageSaga });

  const user = getUserCookie(true);

  const childProps = {
    user,
    confirmCodeCallback,
    resendCodeCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Confirm you account | GOOD PARTY"
        description="Confirm you account"
      />
      <ConfirmWrapper {...childProps} />
    </div>
  );
}

ConfirmPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  confirmCodeCallback: PropTypes.func,
  resendCodeCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  confirmPage: makeSelectConfirmPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    confirmCodeCallback: code => {
      dispatch(actions.confirmCodeAction(code));
    },
    resendCodeCallback: () => {
      dispatch(actions.resendCodeAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmPage);
