/**
 *
 * ApplicationPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import ApplicationStep1 from 'components/elections/application/ApplicationStep1';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApplicationPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function ApplicationPage() {
  useInjectReducer({ key: 'applicationPage', reducer });
  useInjectSaga({ key: 'applicationPage', saga });

  const router = useRouter();
  const step = parseInt(router.query.step, 10);

  const childProps = {
    step,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign application | GOOD PARTY"
        description="Complete this application to create your campaign on Good Party."
      />
      {step === 1 && <ApplicationStep1 {...childProps} />}
      {step === 2 && <ApplicationStep1 {...childProps} />}
    </div>
  );
}

ApplicationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationPage: makeSelectApplicationPage(),
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
)(ApplicationPage);
