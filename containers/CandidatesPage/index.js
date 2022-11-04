/**
 *
 * CandidatesPage
 *
 */

import React, { memo, createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';
import { useRouter } from 'next/router';
import { sanitizeUrl } from '@braintree/sanitize-url';
// import { getExperiment } from '/helpers/optimizeHelper';

import CandidatesWrapper from '/components/CandidatesWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getCookie, getUserCookie, setCookie } from '/helpers/cookieHelper';
import { slugify } from '../../helpers/articlesHelper';
import queryHelper from '../../helpers/queryHelper';
import userActions from '../you/YouPage/actions';

export const CandidatesContext = createContext();

const channels = {
  TikTok: [],
  Twitter: [],
  Facebook: [],
  Instagram: [],
};

export function CandidatesPage({
  ssrState,
  dispatch,
  filterCandidatesCallback,
  twitterFollowCallback,
}) {
  const [candidatesByChannel, setCandidatesByChannel] = useState(channels);
  const { candidates, positions, states, routePosition, routeState } = ssrState;
  const [pinnedCandidates, setPinnedCandidates] = useState(candidates);
  const router = useRouter();

  // const [experimentVariant, setExperimentVariant] = useState('0');
  // useEffect(() => {
  //   getExperiment(
  //     'Follow an View buttons',
  //     '3HGV7kfeSwObMqU1lQ_WqA',
  //     (type) => {
  //       setExperimentVariant(type);
  //     },
  //   );
  // }, []);
  //
  // console.log('experimentVariant', experimentVariant);

  let { pinned } = router.query;

  if (typeof window !== 'undefined') {
    const url = window.location.href;
    if (sanitizeUrl(url) === 'about:blank') {
      pinned = false;
    }
  }

  useEffect(() => {
    if (states.length === 0 && routeState) {
      dispatch(push(`/candidates/${routePosition}`));
    }
  }, [states, routeState]);
  useEffect(() => {
    if (pinned) {
      try {
        const ids = JSON.parse(pinned);
        if (Array.isArray(ids)) {
          // create two arrays - pinned and candidates, removing the ids from candidates and adding them to pinned
          const pinnedCandidates = [];
          const rest = [];
          candidates.forEach((candidate) => {
            if (ids.includes(candidate.id)) {
              pinnedCandidates.push(candidate);
            } else {
              rest.push(candidate);
            }
          });
          setPinnedCandidates([...pinnedCandidates, ...rest]);
        }
      } catch (e) {
        setPinnedCandidates(candidates);
      }
    } else {
      setPinnedCandidates(candidates);
    }
  }, [pinned, candidates]);

  useEffect(() => {
    const updated = JSON.parse(JSON.stringify(channels));
    candidates.forEach((candidate) => {
      const { facebook, twitter, instagram, tiktok } = candidate;
      if (facebook) {
        updated.Facebook.push(candidate);
      }
      if (twitter) {
        updated.Twitter.push(candidate);
      }
      if (instagram) {
        updated.Instagram.push(candidate);
      }
      if (tiktok) {
        updated.TikTok.push(candidate);
      }
      setCandidatesByChannel(updated);
    });
  }, [candidates, routePosition, routeState]);

  const user = getUserCookie(true);
  const childProps = {
    candidates: pinnedCandidates,
    positions,
    states,
    user,
    filterCandidatesCallback,
    allCandidates: candidates,
    routePosition,
    routeState,
    candidatesByChannel,
    twitterFollowCallback,
  };

  return (
    <CandidatesContext.Provider value={childProps}>
      <TgpHelmet
        title="Candidates | GOOD PARTY"
        description="Good Certified Candidates on GOOD PARTY are all Non-Partisan, Small Money and Anti-Corruption."
      />
      <CandidatesWrapper />
    </CandidatesContext.Provider>
  );
}

CandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeState: PropTypes.object,
  ssrState: PropTypes.object,

  filterCandidatesCallback: PropTypes.func,
  twitterFollowCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    filterCandidatesCallback: (position, state) => {
      const pinned = queryHelper(window.location.search, 'pinned');
      const query = pinned ? `?pinned=${pinned}` : '';
      let positionRoute = 'all';
      if (position && position !== '') {
        positionRoute = `${slugify(position.name)}|${position.id}`;
      }
      let stateRoute = '';
      if (state && state !== '') {
        stateRoute = slugify(state);
      }
      if (positionRoute === 'all' && stateRoute === '') {
        dispatch(push(`/candidates${query}`));
      } else {
        dispatch(push(`/candidates/${positionRoute}/${stateRoute}${query}`));
      }
    },
    twitterFollowCallback: (candidateId) => {
      setCookie('twitter-follow', `${candidateId}`);

      dispatch(userActions.twitterLoginAction());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
