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

import CandidatesWrapper from '/components/CandidatesWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';
import { slugify } from '../../helpers/articlesHelper';
import queryHelper from '../../helpers/queryHelper';

export const CandidatesContext = createContext();

export function CandidatesPage({
  ssrState,
  dispatch,
  filterCandidatesCallback,
}) {
  const { candidates, positions, states, routePosition, routeState } = ssrState;
  const [pinnedCandidates, setPinnedCandidates] = useState(candidates);
  const router = useRouter();
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
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
