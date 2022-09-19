/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext, useState, createContext, useEffect } from 'react';
// import styled from 'styled-components';
import dynamic from 'next/dynamic';

import NotFound from '/containers/shared/NotFoundPage';
import { CandidateContext } from '/containers/CandidatePage';
import PageWrapper from '../shared/PageWrapper';

import Header from './Header';
import Tabs from './Tabs';
import MaxWidth, { Padder } from '../shared/MaxWidth';

const Feed = dynamic(() => import('./Feed'), { loading: () => <>Loading</> });
const Campaign = dynamic(() => import('./Campaign'), {
  loading: () => (
    <>
      <LoadingAnimation fullPage={false} />
    </>
  ),
});
const Bio = dynamic(() => import('./Bio'), { loading: () => <>Loading</> });
import Modal from '../shared/Modal';
import LoadingAnimation from '../shared/LoadingAnimation';

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

const tabs = [
  { route: 'Feed', component: <Feed /> },
  { route: 'Campaign', component: <Campaign /> },
  { route: 'Bio', component: <Bio /> },
];

export const CandidateWrapperContext = createContext();

function CandidateWrapper() {
  const { candidate, tab } = useContext(CandidateContext);
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [registerVoteOpen, setRegisterVoteOpen] = useState(false);
  const [whereVoteOpen, setWhereVoteOpen] = useState(false);

  useEffect(() => {
    if (candidate?.state === 'ME' && tab === 'Feed') {
      setTimeout(() => {
        setVoteModalOpen(true);
      }, 10000);
    }
  }, [candidate]);

  if (!candidate) {
    return <NotFound />;
  }

  const openFollowModalCallback = () => {
    setFollowModalOpen(true);
  };

  const closeFollowModalCallback = () => {
    setFollowModalOpen(false);
  };

  const contextProps = {
    openFollowModalCallback,
    closeFollowModalCallback,
  };

  const checkRegisterVote = () => {
    setVoteModalOpen(false);
    setRegisterVoteOpen(true);
  };

  const whereToVote = () => {
    setVoteModalOpen(false);
    setWhereVoteOpen(true);
  };

  return (
    <CandidateWrapperContext.Provider value={contextProps}>
      <PageWrapper isFullWidth>
        <MaxWidth>
          <Padder>
            <Header />
          </Padder>
        </MaxWidth>
        <Tabs />
        <MaxWidth>
          <Padder>
            {tabs.map((tabContent) => (
              <React.Fragment key={tabContent.route}>
                {tabContent.route === tab && <>{tabContent.component}</>}
              </React.Fragment>
            ))}
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
      </PageWrapper>
    </CandidateWrapperContext.Provider>
  );
}

export default CandidateWrapper;
