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
import CandidateSchema from './CandidateSchema';

const shareImageUrl = (candidate) => {
  const { firstName, lastName, id } = candidate;
  return `https://s3-us-west-2.amazonaws.com/assets.goodparty.org/share-image/${firstName
    ?.trim()
    ?.toLowerCase()
    .replace(' ', '-')}-${lastName
    ?.trim()
    ?.toLowerCase()
    .replace(' ', '-')}-${id}-share.jpeg`;
};

export const CandidateContext = createContext();

export function CandidatePage({
  dispatch,
  ssrState,
  candidatePage,
  claimCampaignCallback,
}) {
  useInjectReducer({ key: 'candidatePage', reducer });
  useInjectSaga({ key: 'candidatePage', saga });
  useInjectReducer({ key: 'registerUpdatePage', reducer: registerReducer });
  useInjectSaga({ key: 'registerUpdatePage', saga: registerSaga });

  const { candidate, candidatePositions, userAgent, tab, followers, feed } =
    ssrState;
  const { claiming } = candidatePage;
  const { firstName, lastName, party, otherParty, race, headline } = candidate;

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

  const title = `${firstName} ${lastName} ${partyResolver(party, otherParty)} ${
    party !== 'I' ? 'Party ' : ''
  }candidate for ${race}`;

  const description = `Join the crowd-voting campaign for ${firstName} ${lastName}, ${partyResolver(
    party,
    otherParty,
  ).toLowerCase()} for ${race} | ${
    headline ? ` ${headline} | ` : ' '
  }Crowd-voting on GOOD PARTY`;

  const childProps = {
    candidate,
    claimCampaignCallback,
    user,
    candidatePositions,
    tab,
    followers,
    feed,
    claiming,
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
          <CandidateSchema />
        </>
      )}
    </CandidateContext.Provider>
  );
}

CandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidatePage: PropTypes.object,
  claimCampaignCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatePage: makeSelectCandidatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    claimCampaignCallback: (name, email, phone, candidateId) => {
      dispatch(actions.claimAction(name, email, phone, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatePage);
