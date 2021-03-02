/**
 *
 * CandidateNewPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidateNewWrapper from 'components/elections/CandidateNewWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import { getCandidateChamberDistrictOnly } from 'helpers/candidatesHelper';
import { getUserCookie, setCookie } from 'helpers/cookieHelper';
import queryHelper from 'helpers/queryHelper';
import AdminMenuEditCandidate from 'components/admin/AdminMenu/AdminMenuEditCandidate/Loadable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { push } from 'connected-next-router';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { makeSelectContent } from '../../App/selectors';
import makeSelectCandidateNewPage from './selectors';

export function CandidateNewPage({
  ssrState,
  candidateNewPage,
  content,
  dispatch,
  supportCallback,
  removeSupportCallback,
  previewNextStepCallback,
}) {
  useInjectReducer({ key: 'candidateNewPage', reducer });
  useInjectSaga({ key: 'candidateNewPage', saga });
  let user = getUserCookie();
  if (user) {
    user = JSON.parse(user);
  }
  const { userSupports, candidateSupports } = candidateNewPage;

  let showPreviewModal = false;
  let showShareModal = false;
  if (typeof window !== 'undefined') {
    showPreviewModal = queryHelper(window.location.search, 'preview');
    showShareModal = queryHelper(window.location.search, 'share');
  }

  let candidate;
  let tab;

  if (ssrState) {
    ({ candidate } = ssrState);
    dispatch(actions.loadCandidateActionSuccess(candidate));
  }
  useEffect(() => {
    if (!userSupports && user) {
      dispatch(actions.userSupportsAction());
    }
    if (!candidateSupports) {
      dispatch(actions.candidateSupportsAction(candidate?.id));
    }
  }, []);

  const emptyCandidate = () =>
    Object.keys(candidate).length === 0 && candidate.constructor === Object;

  const title = `${
    candidate && !emptyCandidate()
      ? `${candidate.firstName} ${candidate.lastName}`
      : ''
  } | ${candidate.chamber} ${
    candidate && !emptyCandidate() && candidate.isIncumbent
      ? 'incumbent'
      : 'candidate'
  }`;

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const description = `${
    candidate && !emptyCandidate()
      ? `${candidate.firstName} ${candidate.lastName}`
      : ''
  } could win in ${getCandidateChamberDistrictOnly(
    candidate,
  )}, if we all just share this crowd-voting campaign! Add Your Vote & Share here: ${url}`;

  const childProps = {
    candidate,
    content,
    supportCallback,
    removeSupportCallback,
    showPreviewModal,
    showShareModal,
    user,
    isUserSupportCandidate: userSupports && userSupports[candidate.id],
    previewNextStepCallback,
    candidateSupports,
  };
  return (
    <div>
      {candidate && !emptyCandidate() && (
        <TgpHelmet
          title={title}
          description={description}
          image={`https://s3-us-west-2.amazonaws.com/assets.thegoodparty.org/share-image/${candidate.firstName.toLowerCase()}-${candidate.lastName.toLowerCase()}-${
            candidate.id
          }.jpeg`}
        />
      )}
      <CandidateNewWrapper {...childProps} />
      {user?.isAdmin && <AdminMenuEditCandidate candidate={candidate} />}
    </div>
  );
}

CandidateNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  candidateNewPage: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  previewNextStepCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  candidateNewPage: makeSelectCandidateNewPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    supportCallback: (candidateId, user) => {
      // if no user here
      if (user) {
        // dispatch(push(`${window.location.pathname}?preview=true`));
        dispatch(actions.supportAction(candidateId));
      } else {
        dispatch(
          push(`${window.location.pathname}?register=true&candidate=true`),
        );
      }
    },
    removeSupportCallback: candidateId => {
      // if no user here
      dispatch(actions.removeSupportAction(candidateId));
    },
    previewNextStepCallback: (candidateId, message) => {
      const updateSupport = queryHelper(window.location.search, 'support');
      if (updateSupport) {
        dispatch(actions.updateSupportAction(candidateId, message));
      }
      dispatch(
        push(
          `${window.location.pathname}?share=${encodeURIComponent(message)}`,
        ),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateNewPage);
