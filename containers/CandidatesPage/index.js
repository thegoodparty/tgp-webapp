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
import { useRouter } from 'next/router';

import CandidatesWrapper from '/components/CandidatesWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';
import { useInjectReducer } from '/utils/injectReducer';

import makeSelectCandidatesPage from './selectors';
import reducer from './reducer';
import actions from './actions';

export const CandidatesContext = createContext();

const filterCandidates = (allCandidates, positions) => {
  if (positions.length === []) {
    return allCandidates;
  }
  const filtered = allCandidates.filter((candidate) => {
    if (candidate.topics) {
      for (let i = 0; i < candidate.topics.length; i++) {
        const positionId = candidate.topics[i].positionId;
        if (positions.find((position) => position.id === positionId)) {
          return true;
        }
      }
    }
    return false;
  });
  return filtered;
};

export function CandidatesPage({
  dispatch,
  ssrState,
  candidatesPage,
  selectPositionsCallback,
  filterCandidatesCallback,
}) {
  useInjectReducer({ key: 'candidatesPage', reducer });

  const router = useRouter();
  const { filters } = router.query;

  const ssrCandidates = ssrState.candidates;
  useEffect(() => {
    if (filters) {
      const queryPositions = filters.split(',');
      const positions = [];
      queryPositions.forEach((position) => {
        positions.push({ id: position });
      });

      dispatch(actions.setPositionsAction(positions));
      const filtered = filterCandidates(ssrCandidates, positions);
      dispatch(actions.setCandidatesAction(filtered));
    } else {
      dispatch(actions.setCandidatesAction(ssrCandidates));
    }
  }, []);

  const user = getUserCookie(true);
  const { positions, candidates } = candidatesPage;
  const childProps = {
    candidates: candidates || ssrCandidates,
    positions,
    user,
    selectPositionsCallback,
    filterCandidatesCallback,
    allCandidates: ssrCandidates,
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
  candidatesPage: PropTypes.object,
  selectPositionsCallback: PropTypes.func,
  filterCandidatesCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatesPage: makeSelectCandidatesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    selectPositionsCallback: (positions) => {
      dispatch(actions.setPositionsAction(positions));
    },
    filterCandidatesCallback: (allCandidates, positions) => {
      const filtered = filterCandidates(allCandidates, positions);
      if (positions.length === []) {
        dispatch(actions.setCandidatesAction(filtered));
        dispatch(actions.setPositionsAction(positions));
        dispatch(push('/candidates'));
      }
      dispatch(actions.setCandidatesAction(filtered));

      let filterStr = '';
      positions.forEach((position) => {
        filterStr += `${position.id},`;
      });

      const queryStr = filterStr.substring(0, filterStr.length - 1); // remove last |
      dispatch(push({ pathname: '/candidates', query: { filters: queryStr } }));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
