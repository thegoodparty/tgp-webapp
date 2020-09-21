import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from 'components/shared/PageWrapper';
import useScript from 'customHooks/useScript';

const VerifyVoterRegistration = ({ voteMode }) => {
  useScript('https://cdn.voteamerica.com/embed/tools.js');
  return (
    <PageWrapper>
      <div
        className="voteamerica-embed"
        data-subscriber="thegoodparty"
        data-tool={voteMode}
      />
    </PageWrapper>
  );
};

VerifyVoterRegistration.propTypes = {
  voteMode:PropTypes.string
};

export default VerifyVoterRegistration;
