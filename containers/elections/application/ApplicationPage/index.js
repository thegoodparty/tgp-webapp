/**
 *
 * ApplicationPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import ApplicationStep1 from 'components/elections/application/ApplicationStep1';
import ApplicationStep2 from 'components/elections/application/ApplicationStep2';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApplicationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import ApplicationStep3 from '../../../../components/elections/application/ApplicationStep3';

export function ApplicationPage({
  applicationPage,
  dispatch,
  updateApplicationCallback,
}) {
  useInjectReducer({ key: 'applicationPage', reducer });
  useInjectSaga({ key: 'applicationPage', saga });

  const router = useRouter();
  const stepStr =
    router.query.IdStep?.length > 1 ? router.query.IdStep[1] : '1';
  const id = router.query.IdStep?.length > 0 ? router.query.IdStep[0] : false;
  const step = parseInt(stepStr, 10);

  const { application } = applicationPage;
  useEffect(() => {
    if (id) {
      dispatch(actions.loadApplicationAction(id));
    }
  }, [id]);

  const childProps = {
    step,
    id,
    application,
    updateApplicationCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign application | GOOD PARTY"
        description="Complete this application to create your campaign on Good Party."
      />
      {id && application && (
        <>
          {step === 1 && <ApplicationStep1 {...childProps} />}
          {step === 2 && <ApplicationStep2 {...childProps} />}
          {step === 3 && <ApplicationStep3 {...childProps} />}
        </>
      )}
    </div>
  );
}

ApplicationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  applicationPage: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  applicationPage: makeSelectApplicationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateApplicationCallback: (id, data) => {
      dispatch(actions.updateApplicationAction(id, data));
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
)(ApplicationPage);
