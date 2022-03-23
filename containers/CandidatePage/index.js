/**
 *
 * CandidatePage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidateWrapper from '/components/CandidateWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { partyResolver } from '/helpers/electionsHelper';
import { getUserCookie, setSignupRedirectCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import registerActions from '../entrance/RegisterPage/actions';
import registerReducer from '../entrance/RegisterPage/reducer';
import registerSaga from '../entrance/RegisterPage/saga';

const shareImageUrl = (candidate) => {
  const { firstName, lastName, id } = candidate;
  return `https://s3-us-west-2.amazonaws.com/assets.goodparty.org/share-image/${firstName
    ?.trim()
    ?.toLowerCase()}-${lastName?.trim()?.toLowerCase()}-${id}-share.jpeg`;
};

export const CandidateContext = createContext();

export function CandidatePage({
  dispatch,
  ssrState,
  candidatePage,
  userSupportCallback,
  guestSupportCallback,
  removeSupportCallback,
}) {
  useInjectReducer({ key: 'candidatePage', reducer });
  useInjectSaga({ key: 'candidatePage', saga });
  useInjectReducer({ key: 'registerUpdatePage', reducer: registerReducer });
  useInjectSaga({ key: 'registerUpdatePage', saga: registerSaga });

  const {
    candidate,
    candidateSupports,
    similarCampaigns,
    supportCount,
    candidatePositions,
    userAgent,
  } = ssrState;
  const { userSupports } = candidatePage;
  const { firstName, lastName, party, race, id } = candidate;

  // the reducer will be updated if the user took an action on the page.
  const updatedSupports = candidatePage.candidateSupports
    ? candidatePage.candidateSupports
    : candidateSupports;

  const updatedSupportsCount = candidatePage.supportCount
    ? candidatePage.supportCount
    : supportCount;

  const user = getUserCookie(true);

  useEffect(() => {
    const width = window.innerWidth || document.body.clientWidth;
    const height = window.innerHeight || document.body.clientHeight;
    dispatch(
      actions.trackVisitAction(
        window.location.pathname,
        JSON.stringify({
          userAgent,
          width,
          height,
          url: window.location.pathname,
        }),
      ),
    );
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(actions.userSupportsAction());
    }
  }, [id]);

  const title = `${firstName} ${lastName} ${partyResolver(
    party,
  ).toLowerCase()} for ${race} | Crowd-voting on GOOD PARTY`;

  const description = `Join the crowd-voting campaign for ${firstName} ${lastName}, ${partyResolver(
    party,
  ).toLowerCase()} for ${race}.`;

  const childProps = {
    candidate,
    isUserSupportCandidate: userSupports && userSupports[id],
    userSupportCallback,
    guestSupportCallback,
    removeSupportCallback,
    user,
    candidateSupports: updatedSupports,
    supportCount: updatedSupportsCount,
    candidatePositions,
    similarCampaigns,
  };

  const is404 = !candidate || Object.keys(candidate).length === 0;
  if (is404) {
    return <Error statusCode={404} />;
  }
  return (
    <CandidateContext.Provider value={childProps}>
      {candidate && (
        <>
          <TgpHelmet
            title={title}
            description={description}
            image={shareImageUrl(candidate)}
          />
          <CandidateWrapper />
        </>
      )}
    </CandidateContext.Provider>
  );
}

CandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidatePage: PropTypes.object,
  userSupportCallback: PropTypes.func,
  guestSupportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatePage: makeSelectCandidatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    userSupportCallback: (candidateId) => {
      dispatch(actions.supportAction(candidateId));
    },
    guestSupportCallback: (candidateId, newUser) => {
      console.log('callback page', candidateId, newUser);
      setSignupRedirectCookie(`${window.location.pathname}?share=true`);
      const callback = () => {
        dispatch(actions.supportAction(candidateId));
      };
      dispatch(
        registerActions.registerAction(
          newUser.name,
          newUser.email,
          newUser.phone,
          newUser.zip,
          callback,
        ),
      );
    },
    removeSupportCallback: (candidateId) => {
      dispatch(actions.removeSupportAction(candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatePage);
