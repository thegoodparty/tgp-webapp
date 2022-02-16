/**
 *
 * YouPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectUser, {
  makeSelectRanking,
} from '/containers/you/YouPage/selectors';
import reducer from '/containers/you/YouPage/reducer';
import saga from '/containers/you/YouPage/saga';
import userActions from '/containers/you/YouPage/actions';
import { createStructuredSelector } from 'reselect';
import districtSaga from '/containers/intro/ZipFinderPage/saga';
import districtReducer from '/containers/intro/ZipFinderPage/reducer';
import districtActions from '/containers/intro/ZipFinderPage/actions';

import YouWrapper from '/components/you/YouWrapper';

import { getSignupRedirectCookie } from '/helpers/cookieHelper';
import { userDistrict } from '/helpers/userHelper';
import articlesHelper from '/helpers/articlesHelper';
import { countCandidates } from '/helpers/candidatesHelper';

import makeSelectZipFinderPage from '../../intro/ZipFinderPage/selectors';
import { makeSelectContent } from '../../App/selectors';

export function YouPage({
  userState,
  districtState,
  dispatch,
  signoutCallback,
  content,
  rankingObj,
  changePasswordCallback,
  verifyEmailCallback,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  useInjectReducer({ key: 'zipFinderPage', reducer: districtReducer });
  useInjectSaga({ key: 'zipFinderPage', saga: districtSaga });

  const { user, crewPreview, crewCount, ranking } = userState;
  const { houseCandidates, senateCandidates } = districtState;
  useEffect(() => {
    const cookieRedirect = getSignupRedirectCookie();
    if (cookieRedirect) {
      dispatch(push(cookieRedirect.route));
    }
    if (user && !crewPreview) {
      dispatch(userActions.crewAction(true));
    }
    if (user) {
      const { shortState } = user;
      const districtNumber = userDistrict(user);
      if (shortState && districtNumber) {
        dispatch(
          districtActions.loadHouseCandidatesAction(shortState, districtNumber),
        );
      }

      if (shortState) {
        dispatch(districtActions.loadSenateCandidatesAction(shortState));
      }
      if (!ranking) {
        dispatch(userActions.userRankingAction());
      }
    }
  }, [user]);

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }

  const senateCandidatesCount = countCandidates(senateCandidates);
  const houseCandidatesCount = countCandidates(houseCandidates);

  const accountProps = {
    articles,
    user,
    crewPreview,
    crewCount,
    signoutCallback,
    houseCandidatesCount,
    senateCandidatesCount,
    rankingObj,
    changePasswordCallback,
    verifyEmailCallback,
  };

  const youProps = {
    articles,
  };

  return (
    <div>
      <Head>
        <title data-cy="page-title">You | The Good Party</title>
        <meta name="description" content="You | The Good Party" />
      </Head>

      <YouWrapper {...youProps} />
    </div>
  );
}

YouPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  signoutCallback: PropTypes.func,
  districtState: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rankingObj: PropTypes.object,
  changePasswordCallback: PropTypes.func,
  verifyEmailCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutCallback: () => {
      dispatch(userActions.signoutAction());
      dispatch(push('/'));
    },
    changePasswordCallback: (newPassword, oldPassword, hasPassword) => {
      if (hasPassword) {
        dispatch(userActions.changePasswordAction(newPassword, oldPassword));
      } else {
        dispatch(userActions.addPasswordAction(newPassword));
      }
    },
    verifyEmailCallback: email => {
      dispatch(userActions.resendEmailAction(email));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  districtState: makeSelectZipFinderPage(),
  content: makeSelectContent(),
  rankingObj: makeSelectRanking(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(YouPage);
