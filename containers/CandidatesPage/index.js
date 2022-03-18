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

export const CandidatesContext = createContext();

export function CandidatesPage({
  ssrState,

  filterCandidatesCallback,
}) {
  const { candidates, filters, positionNames } = ssrState;

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
        filterStr += `${position.id},`;
      });
      const queryStr = filterStr.substring(0, filterStr.length - 1); // remove last |

      if (positions.length === 0 || queryStr === '') {
        dispatch(push('/candidates'));
      } else {
        dispatch(
          push({ pathname: '/candidates', query: { filters: queryStr } }),
        );
      }
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatesPage);
