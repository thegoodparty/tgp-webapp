import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
import { HomePageContext } from '/containers/HomePage';
import PageWrapper from '/components/shared/PageWrapper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Hero from './Hero';
import MaxWidth from '../shared/MaxWidth';
import SocialSection from './SocialSection';
import GrayParty from './GrayParty';
import WhatIsIt from './WhatIsIt';
import Accomplish from './Accomplish';
import Anatomy from './Anatomy';
import SoFIt from './SoFIt';
import Modal from '../shared/Modal';
import ModalInner from './ModalInner';
import ShareModal from './ShareModal';
import VideoSection from './VideoSection';
import SmVideoSection from './SmVideoSection';

const HomePageWrapper = () => {
  const { showInitModal } = useContext(HomePageContext);
  const [modalOpen, setModalOpen] = useState(showInitModal || false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={8}>
            <Hero openModalCallback={handleOpenModal} />
            <Hidden mdUp>
              <SmVideoSection />
            </Hidden>
            <SocialSection
              openModalCallback={handleOpenShareModal}
              registerModalCallback={handleOpenModal}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Hidden smDown>
              <VideoSection />
            </Hidden>
          </Grid>
        </Grid>
      </MaxWidth>
      <GrayParty
        openModalCallback={handleOpenModal}
        openShareModalCallback={handleOpenShareModal}
      />
      <MaxWidth style={{ padding: '0 24px' }}>
        <WhatIsIt />
        <Accomplish openModalCallback={handleOpenModal} />
        <Anatomy />
        <SoFIt
          openModalCallback={handleOpenModal}
          openShareModalCallback={handleOpenShareModal}
        />
      </MaxWidth>
      <Modal
        open={modalOpen}
        showCloseButton={false}
        closeModalCallback={() => setModalOpen(false)}
      >
        <ModalInner closeModalCallback={() => setModalOpen(false)} />
      </Modal>
      <Modal
        open={shareModalOpen}
        showCloseButton={false}
        closeModalCallback={() => setShareModalOpen(false)}
      >
        <ShareModal closeModalCallback={() => setShareModalOpen(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default HomePageWrapper;
