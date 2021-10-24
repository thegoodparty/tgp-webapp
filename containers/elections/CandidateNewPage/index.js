/**
 *
 * CandidateNewPage
 *
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidateNewWrapper from 'components/elections/CandidateNewWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import { getUserCookie, setSignupRedirectCookie } from 'helpers/cookieHelper';
import queryHelper from 'helpers/queryHelper';
import AdminMenuEditCandidate from 'components/admin/AdminMenu/AdminMenuEditCandidate';
import { partyResolver } from 'helpers/electionsHelper';

import registerReducer from 'containers/entrance/RegisterPage/reducer';
import registerSaga from 'containers/entrance/RegisterPage/saga';
import registerActions from 'containers/entrance/RegisterPage/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { push } from 'connected-next-router';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import { makeSelectContent } from '../../App/selectors';
import makeSelectCandidateNewPage from './selectors';
import { getExperiment } from '../../../helpers/optimizeHelper';

export function CandidateNewPage({
  ssrState,
  candidateNewPage,
  dispatch,
  supportCallback,
  removeSupportCallback,
  adminDeleteSupportCallback,
  trackShareCallback,
  helpfulCallback,
}) {
  const [candidate, setCandidate] = useState(ssrState.candidate);
  const [show404, setShow404] = useState(false);
  useInjectReducer({ key: 'candidateNewPage', reducer });
  useInjectSaga({ key: 'candidateNewPage', saga });

  useInjectReducer({ key: 'registerUpdatePage', reducer: registerReducer });
  useInjectSaga({ key: 'registerUpdatePage', saga: registerSaga });

  const user = getUserCookie(true);
  const { userSupports, candidateSupports, total } = candidateNewPage;

  const router = useRouter();
  const showShareModal = router.query.share;
  const supportLink = router.query.support;

  const stateCandidate = candidateNewPage.candidate;

  const { NameIdTab } = router.query;
  const candidateId = NameIdTab[1];
  const { topics, userAgent } = ssrState;

  useEffect(() => {
    const width = window.innerWidth || document.body.clientWidth;
    const height = window.innerHeight || document.body.clientHeight;
    console.log('herer')
    dispatch(
      actions.trackVisitAction(
        window.location.pathname,
        JSON.stringify({
          userAgent,
          width,
          height,
          url: window.location.pathname,
        }),
      ),
    );
  }, []);

  useEffect(() => {
    setShow404(false);
    if (Object.keys(ssrState.candidate).length === 0 && user?.isAdmin) {
      if (candidateNewPage.candidate) {
        setCandidate(candidateNewPage.candidate);
      } else {
        dispatch(actions.loadInactiveCandidateAction(NameIdTab[1]));
      }
    } else {
      if (Object.keys(ssrState.candidate).length === 0) {
        setShow404(true);
      }
      setCandidate(ssrState.candidate);
      dispatch(actions.loadCandidateActionSuccess(ssrState.candidate));
    }
  }, [NameIdTab, stateCandidate]);

  useEffect(() => {
    // redirect to correct route

    if (
      typeof window !== 'undefined' &&
      (!NameIdTab ||
        NameIdTab[0] !== `${candidate.firstName}-${candidate.lastName}`) &&
      Object.keys(candidate).length !== 0
    ) {
      router.replace(
        `/candidate/${candidate.firstName}-${
          candidate.lastName
        }/${candidateId}${window.location.search}`,
      );
    }
  }, [candidateId]);

  useEffect(() => {
    if (!userSupports && user) {
      dispatch(actions.userSupportsAction());
    }
    dispatch(actions.candidateSupportsAction(candidateId));
  }, [candidateId]);

  const emptyCandidate = () =>
    Object.keys(candidate).length === 0 && candidate.constructor === Object;
  const { firstName, lastName, party, race, id } = candidate;
  const title = `${firstName} ${lastName} ${partyResolver(
    party,
  ).toLowerCase()} for
${race} | Crowd-voting on GOOD PARTY`;

  const description = `Join the crowd-voting campaign for ${firstName} ${lastName}, ${partyResolver(
    party,
  ).toLowerCase()} for
${race}.`;

  const [experimentVariant, setExperimentVariant] = useState('0');
  // useEffect(() => {
  //   getExperiment('candidate-order', 'EgYaDqBHTpast2N8btQIsA', type => {
  //     setExperimentVariant(type);
  //   });
  // }, []);
  // console.log('experimentVariant', experimentVariant);

  const childProps = {
    candidate,
    supportCallback,
    removeSupportCallback,
    // showPreviewModal,
    showShareModal,
    // fromShareLink,
    supportLink,
    user,
    isUserSupportCandidate: userSupports && userSupports[candidateId],
    // previewNextStepCallback,
    candidateSupports,
    total,
    adminDeleteSupportCallback,
    helpfulCallback,
    trackShareCallback,
    experimentVariant,
    topics,
  };
  if (show404) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      {candidate && !emptyCandidate() && (
        <TgpHelmet
          title={title}
          description={description}
          image={`https://s3-us-west-2.amazonaws.com/assets.goodparty.org/share-image/${firstName
            ?.trim()
            ?.toLowerCase()}-${lastName?.trim()?.toLowerCase()}-${id}${
            supportLink ? '-support' : '-share'
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
  // previewNextStepCallback: PropTypes.func,
  adminDeleteSupportCallback: PropTypes.func,
  trackShareCallback: PropTypes.func,
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  helpfulCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidateNewPage: makeSelectCandidateNewPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    supportCallback: (candidateId, user, newUser) => {
      // if no user here
      if (user) {
        // dispatch(push(`${window.location.pathname}?preview=true`));
        dispatch(actions.supportAction(candidateId));
      } else {
        setSignupRedirectCookie(`${window.location.pathname}?share=true`);
        const callback = () => {
          dispatch(actions.supportAction(candidateId));
        };
        dispatch(
          registerActions.registerAction(
            newUser.name,
            newUser.email,
            newUser.phone,
            newUser.zip,
            callback,
          ),
        );
      }
    },
    removeSupportCallback: candidateId => {
      // if no user here
      dispatch(actions.removeSupportAction(candidateId));
    },
    // previewNextStepCallback: (candidateId, message) => {
    //   const updateSupport = queryHelper(window.location.search, 'support');
    //   if (updateSupport) {
    //     dispatch(actions.updateSupportAction(candidateId, message));
    //     dispatch(
    //       push(
    //         `${window.location.pathname}?share=${encodeURIComponent(
    //           message,
    //         )}&support=true`,
    //       ),
    //     );
    //   } else {
    //     dispatch(
    //       push(
    //         `${window.location.pathname}?share=${encodeURIComponent(message)}`,
    //       ),
    //     );
    //   }
    // },
    adminDeleteSupportCallback: (supportId, candidateId) => {
      dispatch(actions.adminDeleteSupportAction(supportId, candidateId));
    },
    trackShareCallback: candidateId => {
      dispatch(actions.trackShare(candidateId));
    },
    helpfulCallback: (id, title, isHelpful, feedback) => {
      console.log('here helpful callback page');
      dispatch(actions.sendTopicFeedbackAction(id, title, isHelpful, feedback));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateNewPage);
