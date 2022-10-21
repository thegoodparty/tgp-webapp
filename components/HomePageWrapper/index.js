import React, { useState, useContext, Suspense } from 'react';
import { HomePageContext } from '/containers/HomePage';
import PageWrapper from '/components/shared/PageWrapper';
import dynamic from 'next/dynamic';

import Hero from './Hero';
import MaxWidth from '../shared/MaxWidth';
import Modal from '../shared/Modal';
import InvolvedModalInner from './InvolvedModalInner';
import CandidatesSection from './CandidatesSection';
import WhatsNext from './WhatsNext';

// const CandidatesSection = dynamic(() => import('./CandidatesSection'), {
//   suspense: true,
// });
//
// const WhatsNext = dynamic(() => import('./WhatsNext'), {
//   suspense: true,
// });

const HomePageWrapper = () => {
  const [involvedModalOpen, setInvolvedModalOpen] = useState(false);

  const handleOpenInvolvedModal = () => {
    setInvolvedModalOpen(true);
  };

  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <Hero />
      </MaxWidth>
      <MaxWidth style={{ padding: '0 24px' }}>
        <CandidatesSection />
      </MaxWidth>
      <WhatsNext openModalCallback={handleOpenInvolvedModal} />

      <Modal
        open={involvedModalOpen}
        showCloseButton={false}
        closeModalCallback={() => setInvolvedModalOpen(false)}
      >
        <InvolvedModalInner
          closeModalCallback={() => setInvolvedModalOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

export default HomePageWrapper;
