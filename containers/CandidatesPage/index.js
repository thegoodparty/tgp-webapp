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

import CandidatesWrapper from '/components/CandidatesWrapper';
import TgpHelmet from '../../components/shared/TgpHelmet';
import { getUserCookie } from '../../helpers/cookieHelper';

export const CandidatesContext = createContext();

export function CandidatesPage({ ssrState }) {
  let candidates = [];
  let topics = [];
  if (ssrState) {
    ({ candidates, topics } = ssrState);
  }
  const user = getUserCookie(true);
  const childProps = {
    candidates,
    topics,
    user,
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
};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CandidatesPage);
