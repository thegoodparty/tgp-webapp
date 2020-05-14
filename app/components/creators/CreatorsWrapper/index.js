import React from 'react';

import PropTypes from 'prop-types';
import Wrapper from 'components/creators/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';
import UniteSection from 'components/creators/shared/UniteSection';
import ProjectsSection from 'components/creators/shared/ProjectsSection';

const CreatorsWrapper = ({ projects = [] }) => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeaderWrapper />
      <Wrapper white>
        <MobileHeader />
        <UniteSection />
        <ProjectsSection projects={projects} />
      </Wrapper>
    </div>
  );
};

CreatorsWrapper.propTypes = {
  projects: PropTypes.array,
};

export default CreatorsWrapper;
