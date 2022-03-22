/**
 *
 * CandidatesPage
 *
 */

import React, { memo, createContext } from 'react';
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

  filterCandidatesCallback,
}) {
  const { candidates, filters, positionNames, topics } = ssrState;
  // console.log('ssr', ssrState);
  const filteredTopics = filtertopics(candidates, topics);
  console.log('fil', filteredTopics);

  const queryPositions = filters.split(',');
  const positions = [];
  queryPositions.forEach((position) => {
    positions.push({ id: position });
  });

  const user = getUserCookie(true);
  const childProps = {
    candidates: candidates,
    positions,
    user,
    filterCandidatesCallback,
    allCandidates: candidates,
    positionNames,
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

    filterCandidatesCallback: (allCandidates, positions) => {
      let filterStr = '';
      positions.forEach((position) => {
        filterStr += `${slugify(position.name)},`;
      });
      const queryStr = filterStr.substring(0, filterStr.length - 1); // remove last ,

      if (positions.length === 0 || queryStr === '') {
        dispatch(push('/candidates'));
      } else {
        dispatch(push(`/candidates/${queryStr}`));
      }
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
