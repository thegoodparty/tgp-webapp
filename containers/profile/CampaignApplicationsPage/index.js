/**
 *
 * CampaignApplicationsPage
 *
 */

import React, { memo, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from '/components/shared/TgpHelmet';
import CampaignApplicationsWrapper from '/components/profile/CampaignApplicationsWrapper';
import { getApplicationStorage } from '/helpers/localstorageHelper';
import { getUserCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCampaignApplicationsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import passCreationActions from '../../entrance/PasswordCreationPage/actions';
import passCreationSaga from '../../entrance/PasswordCreationPage/saga';

export const CampaignApplicationsPageContext = createContext();

export function CampaignApplicationsPage({
  createApplicationCallback,
  campaignApplicationsPage,
  dispatch,
  deleteApplicationCallback,
}) {
  const router = useRouter();
  useInjectReducer({ key: 'campaignApplicationsPage', reducer });
  useInjectSaga({ key: 'campaignApplicationsPage', saga });

  useInjectSaga({ key: 'passwordCreationPage', saga: passCreationSaga });
  const user = getUserCookie(true);
  const { applications, loading, staff } = campaignApplicationsPage;
  useEffect(() => {
    dispatch(actions.loadApplicationsAction());
    const application = getApplicationStorage();
    if (application) {
      dispatch(passCreationActions.saveApplicationAction(application));
    }
    if (!staff) {
      dispatch(actions.loadStaffAction());
    }
    if (typeof window !== 'undefined' && !user) {
      router.push('/login');
    }
  }, []);

  const childProps = {
    createApplicationCallback,
    applications,
    loading,
    deleteApplicationCallback,
    staff,
  };

  return (
    <CampaignApplicationsPageContext.Provider value={childProps}>
      <TgpHelmet
        title="Candidate Registration and applications | GOOD PARTY"
        description="The first step to become a Good Party candidate is to complete our application"
      />
      {user && <CampaignApplicationsWrapper />}
    </CampaignApplicationsPageContext.Provider>
  );
}

CampaignApplicationsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createApplicationCallback: PropTypes.func,
  campaignApplicationsPage: PropTypes.object,
  deleteApplicationCallback: PropTypes.func,
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
    deleteApplicationCallback: (id) => {
      dispatch(actions.deleteApplicationAction(id));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CampaignApplicationsPage);
