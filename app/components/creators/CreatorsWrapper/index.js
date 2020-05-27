import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Wrapper from 'components/creators/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';
import UniteSection from 'components/creators/shared/UniteSection';
import ProjectsSection from 'components/creators/shared/ProjectsSection';

const CreatorsWrapper = ({ projects = [] }) => {
  const [isLoggedIn, toggleLoggedIn] = useState(false);
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeaderWrapper
        isLoggedIn={isLoggedIn}
        toggleLoggedIn={toggleLoggedIn}
      />
      <Wrapper white>
        <UniteSection isLoggedIn={isLoggedIn} toggleLoggedIn={toggleLoggedIn} />
      </Wrapper>
      <Wrapper blue>
        <ProjectsSection projects={projects} toggleLoggedIn={toggleLoggedIn} isLoggedIn={isLoggedIn} />
      </Wrapper>
    </div>
  );
};

CreatorsWrapper.propTypes = {
  projects: PropTypes.array,
};

export default CreatorsWrapper;
