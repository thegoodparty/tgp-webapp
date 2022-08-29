/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext, useState, createContext } from 'react';
// import styled from 'styled-components';

import NotFound from '/containers/shared/NotFoundPage';
import PageWrapper from '../shared/PageWrapper';

import { CandidateContext } from '../../containers/CandidatePage';
import Header from './Header';
import Tabs from './Tabs';
import MaxWidth, { Padder } from '../shared/MaxWidth';
import Feed from './Feed';
import Campaign from './Campaign';
import Bio from './Bio';
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
    console.log('callback')
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
