/**
 *
 * CampaignApplicationsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import CampaignApplicationsWrapper from 'components/profile/CampaignApplicationsWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCampaignApplicationsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function CampaignApplicationsPage({
  createApplicationCallback,
  campaignApplicationsPage,
  dispatch,
}) {
  useInjectReducer({ key: 'campaignApplicationsPage', reducer });
  useInjectSaga({ key: 'campaignApplicationsPage', saga });

  useEffect(() => {
    dispatch(actions.loadApplicationsAction());
  }, []);

  const { applications, loading } = campaignApplicationsPage;

  const childProps = {
    createApplicationCallback,
    applications,
    loading,
  };

  return (
    <div>
      <TgpHelmet
        title="Candidate Registration and applications | GOOD PARTY"
        description="The first step to become a Good Party candidate is to complete our application"
      />
      <CampaignApplicationsWrapper {...childProps} />
    </div>
  );
}

CampaignApplicationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createApplicationCallback: PropTypes.func,
  campaignApplicationsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  campaignApplicationsPage: makeSelectCampaignApplicationsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createApplicationCallback: () => {
      dispatch(actions.createApplicationAction());
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
)(CampaignApplicationsPage);
