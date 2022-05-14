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

const HomePageWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <Hero />
        <SocialSection openModalCallback={handleOpenModal} />
      </MaxWidth>
      <GrayParty openModalCallback={handleOpenModal} />
      <MaxWidth style={{ padding: '0 24px' }}>
        <WhatIsIt />
        <Accomplish openModalCallback={handleOpenModal} />
        <Anatomy />
        <SoFIt openModalCallback={handleOpenModal} />
      </MaxWidth>
      <Modal
        open={modalOpen}
        showCloseButton={false}
        closeModalCallback={() => setModalOpen(false)}
      >
        <ModalInner closeModalCallback={() => setModalOpen(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default HomePageWrapper;
