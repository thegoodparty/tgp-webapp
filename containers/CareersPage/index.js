/**
 *
 * CareersPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCareersPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import TgpHelmet from '../../components/shared/TgpHelmet';
import CareersWrapper from '../../components/CareersWrapper';
import actions from './actions';

export function CareersPage({ notificationsCallback }) {
  useInjectReducer({ key: 'careersPage', reducer });
  useInjectSaga({ key: 'careersPage', saga });

  useEffect(() => {
    if (!window.leverJobsOptions) {
      window.leverJobsOptions = { accountName: 'good-party', includeCss: true };
      const script = document.createElement('script');
      script.src = 'https://andreasmb.github.io/lever-jobs-embed/index.js';
      document.body.appendChild(script);
    }
  }, []);

  const childProps = {
    notificationsCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Work with us | GOOD PARTY"
        description="Good Party is building amazing, open-source social tools that empower the creative community to mobilize digital natives and have millions of people vote differently."
      />
      <CareersWrapper {...childProps} />
    </div>
  );
}

CareersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notificationsCallback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  careersPage: makeSelectCareersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    notificationsCallback: (email, notifications) => {
      dispatch(actions.updateSignupAction(email, notifications));
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
)(CareersPage);
