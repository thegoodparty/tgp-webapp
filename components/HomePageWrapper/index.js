import React from 'react';
// import styled from 'styled-components';
import PageWrapper from '/components/shared/PageWrapper';
import Hero from './Hero';
import Together from './Together';

const HomePageWrapper = () => {

  return <PageWrapper isFullWidth>
    <Hero />
    <Together />
  </PageWrapper>;
};


export default HomePageWrapper;
