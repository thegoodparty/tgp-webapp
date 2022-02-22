/**
 *
 * CandidatePortalUpdatesContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import PortalPageWrapper from '/components/candidate-portal/CandidatePortalHomeWrapper/PortalPageWrapper';
import AdminCandidateUpdatesWrapper from '/components/admin/AdminCandidateUpdatesWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePortalUpdatesContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

export function CandidatePortalUpdatesContainer({
  candidate,
  pageLevel,
  createCallback,
  role,
}) {
  useInjectReducer({ key: 'candidatePortalUpdatesContainer', reducer });
  useInjectSaga({ key: 'candidatePortalUpdatesContainer', saga });

  const WrapperElement = ({ children }) =>
    pageLevel ? (
      <PortalPageWrapper role={role}>
        <Wrapper>{children}</Wrapper>
      </PortalPageWrapper>
    ) : (
      <div>{children}</div>
    );

  const childProps = {
    candidate,
    createCallback,
    adminPage: false,
  };

  return (
    <WrapperElement>
      <AdminCandidateUpdatesWrapper {...childProps} />
    </WrapperElement>
  );
}

CandidatePortalUpdatesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  pageLevel: PropTypes.bool,

  createCallback: PropTypes.func,
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  candidatePortalUpdatesContainer: makeSelectCandidatePortalUpdatesContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCallback: (update, candidateId) => {
      dispatch(actions.createUpdateAction(update, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CandidatePortalUpdatesContainer);
