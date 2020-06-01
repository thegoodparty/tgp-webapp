import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Wrapper from 'components/creators/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';
import UniteSection from 'components/creators/shared/UniteSection';
import ProjectsSection from 'components/creators/shared/ProjectsSection';
import { Join } from 'components/creators/shared/modals';

const CreatorsWrapper = ({
  projects = [],
  user,
  socialLoginCallback,
  socialLoginFailureCallback,
}) => {
  const [join, setJoin] = useState(false);
  useEffect(() => {
    setJoin(false);
  }, [user])
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeaderWrapper toggleJoin={join => setJoin(join)} user={user} />
      <Wrapper white>
        <UniteSection toggleJoin={join => setJoin(join)} user={user} />
      </Wrapper>
      <Wrapper blue>
        <ProjectsSection
          projects={projects}
          toggleJoin={join => setJoin(join)}
          user={user}
        />
      </Wrapper>
      <Join
        open={join}
        handleClose={() => setJoin(false)}
        socialLoginCallback={socialLoginCallback}
        socialLoginFailureCallback={socialLoginFailureCallback}
      />
    </div>
  );
};

CreatorsWrapper.propTypes = {
  projects: PropTypes.array,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
};

export default CreatorsWrapper;
