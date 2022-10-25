/**
 *
 * CandidateWrapper
 *
 */

import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  Suspense,
} from 'react';
import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';

import NotFound from '/containers/shared/NotFoundPage';
import { CandidateContext } from '/containers/CandidatePage';
import PageWrapper from '../shared/PageWrapper';

import Header from './Header';
import MaxWidth, { Padder } from '../shared/MaxWidth';

import Modal from '../shared/Modal';
import LoadingAnimation from '../shared/LoadingAnimation';
import { getCookie, setCookie } from '../../helpers/cookieHelper';
import { LgUpOnly, MdDownOnly } from '../shared/navigation/NavWrapper';

const TopIssues = dynamic(() => import('./TopIssues'), { suspense: true });
const BioSection = dynamic(() => import('./BioSection'), { suspense: true });
const Feed = dynamic(() => import('./CandidateFeed'), { suspense: true });
const Endorsements = dynamic(() => import('./Endorsements'), {
  suspense: true,
});
const DateBox = dynamic(() => import('./DateBox'), { suspense: true });
const CampaignProgress = dynamic(() => import('./CampaignProgress'), {
  suspense: true,
});

const CheckVoteRegistration = dynamic(
  () => import('../CandidatesWrapper/CheckVoteRegistration'),
  {
    loading: () => (
      <>
        <LoadingAnimation fullPage={false} />
      </>
    ),
  },
);

const FollowModal = dynamic(() => import('./FollowModal'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});

const VoteModal = dynamic(() => import('./VoteModal'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});

const CheckWhereToVoteModal = dynamic(() => import('./CheckWhereToVote'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});

const SocialLinks = dynamic(() => import('./SocialLinks'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});

const ShareModal = dynamic(() => import('components/shared/ShareModal'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});

export const CandidateWrapperContext = createContext();

function CandidateWrapper() {
  const { candidate, tab } = useContext(CandidateContext);
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [registerVoteOpen, setRegisterVoteOpen] = useState(false);
  const [whereVoteOpen, setWhereVoteOpen] = useState(false);
  const [offsetFollow, setOffsetFollow] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const showShareModalCallback = () => {
    setShowShare(true);
  };

  useEffect(() => {
    if (candidate?.state === 'ME' && tab === 'Feed') {
      const cookie = getCookie('voter-modal-seen');
      if (cookie !== 'true') {
        setTimeout(() => {
          setVoteModalOpen(true);
          setCookie('voter-modal-seen', 'true');
        }, 10000);
      }
    }
  }, [candidate]);

  if (!candidate) {
    return <NotFound />;
  }

  const afterFollowCallback = () => {
    setOffsetFollow(offsetFollow + 1);
  };

  const afterUnfollowCallback = () => {
    setOffsetFollow(offsetFollow - 1);
  };

  const openFollowModalCallback = () => {
    setFollowModalOpen(true);
  };

  const closeFollowModalCallback = () => {
    setFollowModalOpen(false);
  };

  const contextProps = {
    openFollowModalCallback,
    closeFollowModalCallback,
    offsetFollow,
    afterFollowCallback,
    afterUnfollowCallback,
    showShareModalCallback,
  };

  const checkRegisterVote = () => {
    setVoteModalOpen(false);
    setRegisterVoteOpen(true);
  };

  const whereToVote = () => {
    setVoteModalOpen(false);
    setWhereVoteOpen(true);
  };

  const RightSide = () => {
    return (
      <>
        <Suspense>
          <Endorsements />
        </Suspense>
        <Suspense>
          <TopIssues />
        </Suspense>
        <Suspense>
          <DateBox />
        </Suspense>
        <Suspense>
          <CampaignProgress />
        </Suspense>
        <Suspense>
          <DateBox showPast />
        </Suspense>
      </>
    );
  };

  return (
    <CandidateWrapperContext.Provider value={contextProps}>
      <PageWrapper isFullWidth>
        <MaxWidth>
          <Padder>
            <Header />
          </Padder>
        </MaxWidth>
        <MaxWidth>
          <Padder>
            <Grid container spacing={8}>
              <Grid item xs={12} lg={8}>
                <Suspense>
                  <BioSection />
                </Suspense>
                <Suspense>
                  <SocialLinks />
                </Suspense>
                <MdDownOnly>
                  <RightSide />
                </MdDownOnly>
                <Suspense>
                  <Feed />
                </Suspense>
              </Grid>
              <Grid item xs={12} lg={4}>
                <LgUpOnly>
                  <RightSide />
                </LgUpOnly>
              </Grid>
            </Grid>
          </Padder>
        </MaxWidth>
        <Modal
          open={followModalOpen}
          showCloseButton={false}
          closeModalCallback={() => setFollowModalOpen(false)}
        >
          <FollowModal />
        </Modal>
        <Modal
          open={voteModalOpen}
          showCloseButton={false}
          closeModalCallback={() => setVoteModalOpen(false)}
        >
          <VoteModal
            closeModalCallback={() => setVoteModalOpen(false)}
            checkRegisterVoteCallback={checkRegisterVote}
            whereToVoteCallback={whereToVote}
          />
        </Modal>
        <Modal
          open={registerVoteOpen}
          showCloseButton={false}
          closeModalCallback={() => setRegisterVoteOpen(false)}
        >
          <CheckVoteRegistration
            closeModalCallback={() => setRegisterVoteOpen(false)}
          />
        </Modal>
        <Modal
          open={whereVoteOpen}
          showCloseButton={false}
          closeModalCallback={() => setWhereVoteOpen(false)}
        >
          <CheckWhereToVoteModal
            closeModalCallback={() => setWhereVoteOpen(false)}
          />
        </Modal>
        {showShare && (
          <ShareModal
            closeCallback={() => setShowShare(false)}
            candidate={candidate}
          />
        )}
      </PageWrapper>
    </CandidateWrapperContext.Provider>
  );
}

export default CandidateWrapper;
