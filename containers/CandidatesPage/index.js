/**
 *
 * CandidatesPage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import CandidatesWrapper from '/components/CandidatesWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';
import { slugify } from '../../helpers/articlesHelper';

export const CandidatesContext = createContext();

const filtertopics = (candidates, topics) => {
  const candidateTopics = {};
  candidates.forEach((candidate) => {
    candidate.topics.forEach((topic) => {
      candidateTopics[topic.id] = true;
    });
  });
  const filtered = [];
  topics.forEach((topic) => {
    if (candidateTopics[topic.id]) {
      filtered.push(topic);
    }
  });
  return filtered;
};

export function CandidatesPage({
  ssrState,
  dispatch,
  filterCandidatesCallback,
}) {
  const {
    candidates,
    positions,
    positionsByTopIssues,
    states,
    routePosition,
    routeState,
  } = ssrState;

  useEffect(() => {
    if (states.length === 0 && routeState) {
      dispatch(push(`/candidates/${routePosition}`));
    }
  }, [states, routeState]);

  const user = getUserCookie(true);
  const childProps = {
    candidates,
    positions,
    positionsByTopIssues,
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
      let positionRoute = 'all';
      if (position && position !== '') {
        positionRoute = `${slugify(position.name)}|${position.id}`;
      }
      let stateRoute = '';
      if (state && state !== '') {
        stateRoute = slugify(state);
      }
      if (positionRoute === 'all' && stateRoute === '') {
        dispatch(push('/candidates/'));
      } else {
        dispatch(push(`/candidates/${positionRoute}/${stateRoute}`));
      }
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
