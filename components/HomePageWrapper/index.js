import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import PageWrapper from '/components/shared/PageWrapper';
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
// import VideoSection from './VideoSection';

const HomePageWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
        <Hero />
        <SocialSection openModalCallback={handleOpenShareModal} />
        {/*<VideoSection />*/}
      </MaxWidth>
      <GrayParty openModalCallback={handleOpenModal} />
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
