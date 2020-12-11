import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Footer from 'components/shared/Footer';
import Wrapper from 'components/creators/shared/Wrapper';
import CreatorsHeaderWrapper from 'components/creators/shared/CreatorsHeaderWrapper';
import UniteSection from 'components/creators/shared/UniteSection';
import ProjectsSection from 'components/creators/shared/ProjectsSection';
import { Join } from 'components/creators/shared/modals';
const CreatorsWrapper = ({
  projects = [],
  user,
  socialLoginCallback,
  socialLoginFailureCallback,
  setSignupRedirectCookieCallback,
  sendMessageToCreatorCallback,
  twitterButtonCallback,
}) => {
  const [join, setJoin] = useState(false);
  useEffect(() => {
    setJoin(false);
  }, [user]);
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <CreatorsHeaderWrapper toggleJoin={value => setJoin(value)} user={user} />
      <Wrapper white>
        <UniteSection user={user} />
      </Wrapper>
      <Wrapper blue>
        <ProjectsSection
          projects={projects}
          toggleJoin={value => setJoin(value)}
          user={user}
          sendMessageToCreatorCallback={sendMessageToCreatorCallback}
        />
      </Wrapper>
      <Footer isCreators />

      <Join
        open={join}
        handleClose={() => setJoin(false)}
        socialLoginCallback={socialLoginCallback}
        socialLoginFailureCallback={socialLoginFailureCallback}
        setSignupRedirectCookieCallback={setSignupRedirectCookieCallback}
        twitterButtonCallback={twitterButtonCallback}
      />
    </div>
  );
};

CreatorsWrapper.propTypes = {
  projects: PropTypes.array,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  setSignupRedirectCookieCallback: PropTypes.func,
  sendMessageToCreatorCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

export default CreatorsWrapper;
