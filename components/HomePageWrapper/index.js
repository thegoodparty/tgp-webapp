import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';
import Hero from './Hero';
import NotRepresented from './NotRepresented';

const HomePageWrapper = ({ homepageCandidates }) => {
  const sections = [
    { component: <Hero />, key: 'hero' },
    { component: <NotRepresented />, key: 'not-rep' },
    ];

  return (
    <PageWrapper isFullWidth>
      {sections.map(section => (
        <section key={section.key}>{section.component}</section>
      ))}
    </PageWrapper>
  );
};

HomePageWrapper.propTypes = {
  homepageCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default HomePageWrapper;
