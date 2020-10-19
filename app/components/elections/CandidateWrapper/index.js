import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

// import AddVoteContainer from 'containers/elections/AddVoteContainer/Loadable';
import VerifyVotePage from 'containers/voterize/VerifyVotePage/Loadable';

import PageWrapper from 'components/shared/PageWrapper';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { setSignupRedirectCookie } from 'helpers/cookieHelper';
import { candidateRoute } from 'helpers/electionsHelper';

import TopRow from './TopRow';
import MoneyAndCharacter from './MoneyAndCharacter';
import FollowTheMoney from './FollowTheMoney';
import FinancialText from './FinancialText';
import PolicyPositions from './PolicyPositions';
import CampaignWebsite from './CampaignWebsite';
import CandidateProfile from './CandidateProfile';
import RightCard from './RightCard';
import Tabs from './Tabs';
import CampaignStatus from './CampaignStatus';
import BottomButtons from './BottomButtons';
import ShareModal from './ShareModal';

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
  }
`;

const CandidateWrapper = ({
  candidate,
  chamberRank,
  chamberName,
  incumbent,
  user,
  deleteCandidateRankingCallback,
  routeTab = 'campaign',
  content,
  showRegisterCallback,
  saveRankingCallback,
  queryAddVote = false,
  queryShare = false,
  removeQueryCallback,
}) => {
  const [state, setState] = useState({
    showVoterVerify: user && user.voteStatus !== 'verified' && !!queryAddVote,
    registerFlowShareMode: user?.voteStatus === 'verified' && !!queryAddVote,
    showShare: !!queryShare,
    showStepper: !!queryAddVote,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const { voteStatus } = user;
    if (voteStatus === 'verified' && state.showVoterVerify) {
      setState({
        ...state,
        showVoterVerify: false,
        showShare: false,
        registerFlowShareMode: true,
      });
    }
  }, [user]);

  let isGood;
  let campaignSummary;
  let campaignUpdates;
  if (candidate) {
    ({ isGood, campaignSummary, campaignUpdates } = candidate);
  }
  const isUnknown = isGood === null;
  const isGoodOrUnknown = isGood || isUnknown;

  let tab = routeTab;
  let hideTab = false;
  if (!campaignSummary && !campaignUpdates?.length > 0) {
    tab = 'info';
    hideTab = true;
  }

  const mobileHeaderProps = {
    showGood: true,
    isGood,
    showShare: true,
    user,
  };
  const route = `${candidateRoute(candidate)}?addVote=true`;
  const addVoteCallback = () => {
    if (!user) {
      setSignupRedirectCookie(route);
      showRegisterCallback();
      setState({
        ...state,
        showStepper: true,
      });
    } else if (user.voteStatus === 'verified') {
      saveRank();
      setState({
        ...state,
        registerFlowShareMode: true,
      });
    } else {
      setState({
        ...state,
        showVoterVerify: true,
      });
    }
  };

  const openShareCallback = () => {
    setState({
      ...state,
      showShare: true,
    });
  };

  const buttonsProps = {
    candidate,
    chamberName,
    user,
    chamberRank,
    deleteCandidateRankingCallback,
    addVoteCallback,
    openShareCallback,
  };

  const closeModal = () => {
    if (state.showShare) {
      setState({
        ...state,
        showStepper: false,
      });
    }
    setState({
      ...state,
      showShare: false,
      registerFlowShareMode: false,
    });
    if (!!queryAddVote || !!queryShare) {
      removeQueryCallback();
    }
  };

  // const goToShareCallback = () => {
  //   setState({
  //     ...state,
  //     showShare: true,
  //     registerFlowShareMode: false,
  //   });
  //   if (!!queryAddVote) {
  //     removeQueryCallback();
  //   }
  // };

  const skipVerifyVoterCallback = () => {
    setState({
      ...state,
      registerFlowShareMode: true,
      showVoterVerify: false,
    });
    saveRank();
  };

  const saveRank = () => {
    saveRankingCallback(user, candidate);
  };

  const rightCard = <RightCard {...buttonsProps} tab={tab} hideTab={hideTab} />;
  return (
    <PageWrapper mobileHeaderProps={mobileHeaderProps} isFullWidth white>
      <ContentWrapper>
        {candidate?.name ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={isGoodOrUnknown ? 8 : 12}>
              <TopRow candidate={candidate} chamberName={chamberName} />
              {isGoodOrUnknown && (
                <Hidden mdUp>
                  <Grid item xs={12}>
                    {rightCard}
                  </Grid>
                </Hidden>
              )}
              {!hideTab && <Tabs candidate={candidate} tab={tab} />}
              {tab === 'campaign' ? (
                <>
                  <CampaignStatus
                    candidate={candidate}
                    content={content}
                    showButtons={isGoodOrUnknown}
                    buttonsProps={buttonsProps}
                  />
                </>
              ) : (
                <>
                  <MoneyAndCharacter
                    candidate={candidate}
                    incumbent={incumbent}
                  />
                  <FollowTheMoney candidate={candidate} incumbent={incumbent} />
                  <FinancialText
                    candidate={candidate}
                    incumbent={incumbent}
                    chamberName={chamberName}
                  />
                  <CandidateProfile candidate={candidate} />
                  <CampaignWebsite candidate={candidate} />
                  <PolicyPositions candidate={candidate} />
                  {isGoodOrUnknown && <BottomButtons {...buttonsProps} />}
                </>
              )}
            </Grid>
            {isGoodOrUnknown && (
              <Hidden smDown>
                <Grid item xs={4}>
                  {rightCard}
                </Grid>
              </Hidden>
            )}
          </Grid>
        ) : (
          <LoadingAnimation />
        )}
      </ContentWrapper>
      {/*{state.registerFlowShareMode && (*/}
      {/*  <AddVoteContainer*/}
      {/*    closeCallback={closeModal}*/}
      {/*    goToShareCallback={goToShareCallback}*/}
      {/*    showStepper={state.showStepper}*/}
      {/*  />*/}
      {/*)}*/}
      {state.showVoterVerify && (
        <VerifyVotePage skipVerifyVoterCallback={skipVerifyVoterCallback} />
      )}
      {(state.showShare || state.registerFlowShareMode) && (
        <ShareModal
          closeCallback={closeModal}
          user={user}
          candidate={candidate}
          // showStepper={state.showStepper}
          registerFlowShareMode={state.registerFlowShareMode}
        />
      )}
    </PageWrapper>
  );
};

CandidateWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberRank: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chamberName: PropTypes.string,
  incumbent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  deleteCandidateRankingCallback: PropTypes.func,
  routeTab: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showRegisterCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
  queryAddVote: PropTypes.bool,
  queryShare: PropTypes.bool,
  removeQueryCallback: PropTypes.func,
};

export default CandidateWrapper;
