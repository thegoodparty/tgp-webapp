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

import TgpHelmet from '/components/shared/TgpHelmet';
import ApplicationStep1 from '/components/elections/application/ApplicationStep1';
import ApplicationStep2 from '/components/elections/application/ApplicationStep2';
import ApplicationStep3 from '/components/elections/application/ApplicationStep3';
import ApplicationStep4 from '/components/elections/application/ApplicationStep4';
import ApplicationStep5 from '/components/elections/application/ApplicationStep5';
import ApplicationStep6 from '/components/elections/application/ApplicationStep6';
import ApplicationStep7 from '/components/elections/application/ApplicationStep7';
import ApplicationStep8 from '/components/elections/application/ApplicationStep8';
import ApplicationStep8Review from '/components/elections/application/ApplicationStep8Review';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectApplicationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function ApplicationPage({
  applicationPage,
  dispatch,
  updateApplicationCallback,
  submitApplicationCallback,
  approveApplicationCallback,
  rejectApplicationCallback,
}) {
  useInjectReducer({ key: 'applicationPage', reducer });
  useInjectSaga({ key: 'applicationPage', saga });

  const router = useRouter();
  const stepStr =
    router.query.IdStep?.length > 1 ? router.query.IdStep[1] : '1';
  const id = router.query.IdStep?.length > 0 ? router.query.IdStep[0] : false;
  const step = parseInt(stepStr, 10);

  const { application, reviewMode, issues } = applicationPage;
  useEffect(() => {
    if (id) {
      dispatch(actions.loadApplicationAction(id));
    }
  }, [id]);
  useEffect(() => {
    if (step === 5) {
      dispatch(actions.loadATopIssuesAction());
    }
  }, [step]);

  const childProps = {
    step,
    id,
    application,
    reviewMode,
    updateApplicationCallback,
    submitApplicationCallback,
    approveApplicationCallback,
    rejectApplicationCallback,
    issues,
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
          {step === 4 && <ApplicationStep4 {...childProps} />}
          {step === 5 && <ApplicationStep5 {...childProps} />}
          {step === 6 && <ApplicationStep6 {...childProps} />}
          {step === 7 && <ApplicationStep7 {...childProps} />}
          {step === 8 && !reviewMode && <ApplicationStep8 {...childProps} />}
          {step === 8 && reviewMode && (
            <ApplicationStep8Review {...childProps} />
          )}
        </>
      )}
    </div>
  );
}

ApplicationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  applicationPage: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
  submitApplicationCallback: PropTypes.func,
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
    submitApplicationCallback: (id) => {
      dispatch(actions.submitApplicationAction(id));
    },
    approveApplicationCallback: (id, feedback) => {
      dispatch(actions.approveApplicationAction(id, feedback));
    },
    rejectApplicationCallback: (id, feedback) => {
      dispatch(actions.rejectApplicationAction(id, feedback));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ApplicationPage);
