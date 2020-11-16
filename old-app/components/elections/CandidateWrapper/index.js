import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

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
  trackShareCallback,
}) => {
  const [state, setState] = useState({
    registerFlowShareMode: !!user,
    showShare: !!queryShare,
    showStepper: !!queryShare,
  });
  useEffect(() => {
    window.scrollTo(0, 0);

    // voterX
    (function(w, d, t, r, u) {
      w[u] = w[u] || [];
      w[u].push({ projectId: '10000', properties: { pixelId: '10137705' } });
      var s = d.createElement(t);
      s.src = r;
      s.async = true;
      s.onload = s.onreadystatechange = function() {
        var y,
          rs = this.readyState,
          c = w[u];
        if (rs && rs != 'complete' && rs != 'loaded') {
          return;
        }
        try {
          y = YAHOO.ywa.I13N.fireBeacon;
          w[u] = [];
          w[u].push = function(p) {
            y([p]);
          };
          y(c);
        } catch (e) {}
      };
      var scr = d.getElementsByTagName(t)[0],
        par = scr.parentNode;
      par.insertBefore(s, scr);
    })(window, document, 'script', 'https://s.yimg.com/wi/ytc.js', 'dotq');
    window.dotq = window.dotq || [];
    window.dotq.push({
      projectId: '10000',
      properties: {
        pixelId: '10137705',
        qstrings: {
          et: 'custom',
          ec: 'add',
        },
      },
    });
    // end voterX
  }, []);

  useEffect(() => {
    if (user && state.showVoterVerify) {
      setState({
        ...state,
        showShare: false,
        registerFlowShareMode: true,
      });
    }
    if (user && !!queryAddVote) {
      removeQueryCallback();
      saveRank();
      setState({
        ...state,
        showShare: true,
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
        registerFlowShareMode: true,
      });
    } else {
      saveRank();
      setState({
        ...state,
        registerFlowShareMode: false,
        showShare: true,
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

  const saveRank = () => {
    saveRankingCallback(user, candidate);
  };

  const rightCard = <RightCard {...buttonsProps} tab={tab} hideTab={hideTab} />;
  return (
    <PageWrapper mobileHeaderProps={mobileHeaderProps} isFullWidth white>
      <img
        height="1"
        width="1"
        style={{ borderStyle: 'none' }}
        alt=""
        src="https://insight.adsrvr.org/track/pxl/?adv=kwzncc1&ct=0:ry26isr&fmt=3"
      />
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
      {state.showShare && (
        <ShareModal
          closeCallback={closeModal}
          user={user}
          candidate={candidate}
          // showStepper={state.showStepper}
          registerFlowShareMode={state.registerFlowShareMode}
          trackShareCallback={trackShareCallback}
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
  trackShareCallback: PropTypes.func,
};

export default CandidateWrapper;
