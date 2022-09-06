/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext, useState, createContext } from 'react';
// import styled from 'styled-components';
import dynamic from 'next/dynamic';

import NotFound from '/containers/shared/NotFoundPage';
import PageWrapper from '../shared/PageWrapper';

import { CandidateContext } from '../../containers/CandidatePage';
import Header from './Header';
import Tabs from './Tabs';
import MaxWidth, { Padder } from '../shared/MaxWidth';

const Feed = dynamic(() => import('./Feed'), { loading: () => <>Loading</> });
const Campaign = dynamic(() => import('./Campaign'), {
  loading: () => <>Loading</>,
});
const Bio = dynamic(() => import('./Bio'), { loading: () => <>Loading</> });
import Modal from '../shared/Modal';
import FollowModal from './FollowModal';

const tabs = [
  { route: 'Feed', component: <Feed /> },
  { route: 'Campaign', component: <Campaign /> },
  { route: 'Bio', component: <Bio /> },
];

export const CandidateWrapperContext = createContext();

function CandidateWrapper() {
  const { candidate, tab } = useContext(CandidateContext);
  const [followModalOpen, setFollowModalOpen] = useState(false);

  if (!candidate) {
    return <NotFound />;
  }

  const openFollowModalCallback = () => {
    console.log('callback');
    setFollowModalOpen(true);
  };

  const closeFollowModalCallback = () => {
    setFollowModalOpen(false);
  };

  const contextProps = {
    openFollowModalCallback,
    closeFollowModalCallback,
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
      </PageWrapper>
    </CandidateWrapperContext.Provider>
  );
}

export default CandidateWrapper;
