/**
 *
 * CandidateNewPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidateNewWrapper from 'components/elections/CandidateNewWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import { getCandidateChamberDistrictOnly } from 'helpers/candidatesHelper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { push } from 'connected-next-router';
import reducer from './reducer';
import saga from './saga';
import actions from '../CandidatePage/actions';
import { makeSelectContent } from '../../App/selectors';
import { getUserCookie, setCookie } from '../../../helpers/cookieHelper';
import queryHelper from '../../../helpers/queryHelper';
import AdminMenuEditCandidate from '../../../components/admin/AdminMenu/AdminMenuEditCandidate/Loadable';

export function CandidateNewPage({
  ssrState,
  content,
  dispatch,
  endorseCallback,
}) {
  useInjectReducer({ key: 'candidateNewPage', reducer });
  useInjectSaga({ key: 'candidateNewPage', saga });
  let user = getUserCookie();
  if (user) {
    user = JSON.parse(user);
  }
  let showPreviewModal = false;
  let showShareModal = false;
  if (typeof window !== 'undefined') {
    showPreviewModal = queryHelper(window.location.search, 'preview');
    showShareModal = queryHelper(window.location.search, 'share');
  }

  let candidate;
  let tab;

  if (ssrState) {
    ({ candidate, tab } = ssrState);
    dispatch(actions.loadCandidateActionSuccess(candidate));
  }

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
    endorseCallback,
    showPreviewModal,
    showShareModal,
    user,
  };
  return (
    <div>
      {candidate && !emptyCandidate() && (
        <TgpHelmet
          title={title}
          description={description}
          image={candidate?.image}
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
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    endorseCallback: user => {
      // if no user here
      if (user) {
        dispatch(push(`${window.location.pathname}?preview=true`));
      } else {
        dispatch(
          push(`${window.location.pathname}?register=true&candidate=true`),
        );
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateNewPage);
