import React, { useState, useContext, Suspense } from 'react';
import { HomePageContext } from '/containers/HomePage';
import PageWrapper from '/components/shared/PageWrapper';
import dynamic from 'next/dynamic';

import Hero from './Hero';
import MaxWidth from '../shared/MaxWidth';
import Modal from '../shared/Modal';
import ModalInner from './ModalInner';
import InvolvedModalInner from './InvolvedModalInner';

const CandidatesSection = dynamic(() => import('./CandidatesSection'), {
  suspense: true,
});


const WhatsNext = dynamic(() => import('./WhatsNext'), {
  suspense: true,
});

const HomePageWrapper = () => {
  const { showInitModal } = useContext(HomePageContext);
  const [modalOpen, setModalOpen] = useState(showInitModal || false);
  const [involvedModalOpen, setInvolvedModalOpen] = useState(false);

  const handleOpenInvolvedModal = () => {
    setInvolvedModalOpen(true);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <Hero />
      </MaxWidth>
      {/*<MaxWidth style={{ padding: '0 24px' }}>*/}
      {/*  <Suspense fallback={`Loading...`}>*/}
      {/*    <CandidatesSection />*/}
      {/*  </Suspense>*/}
      {/*</MaxWidth>*/}
      {/*<Suspense fallback={`Loading...`}>*/}
      {/*  <WhatsNext openModalCallback={handleOpenInvolvedModal} />*/}
      {/*</Suspense>*/}
      {/*<Modal*/}
      {/*  open={modalOpen}*/}
      {/*  showCloseButton={false}*/}
      {/*  closeModalCallback={() => setModalOpen(false)}*/}
      {/*>*/}
      {/*  <ModalInner closeModalCallback={() => setModalOpen(false)} />*/}
      {/*</Modal>*/}

      {/*<Modal*/}
      {/*  open={involvedModalOpen}*/}
      {/*  showCloseButton={false}*/}
      {/*  closeModalCallback={() => setInvolvedModalOpen(false)}*/}
      {/*>*/}
      {/*  <InvolvedModalInner*/}
      {/*    closeModalCallback={() => setInvolvedModalOpen(false)}*/}
      {/*    openRegisterModalCallback={handleOpenModal}*/}
      {/*  />*/}
      {/*</Modal>*/}
    </PageWrapper>
  );
};

export default HomePageWrapper;
