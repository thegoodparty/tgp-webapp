/**
 *
 * VerifyVoteWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import PageWrapper from 'components/shared/PageWrapper';
import useScript from 'customHooks/useScript';

const VerifyVoteWrapper = () => {
  useScript('https://cdn.voteamerica.com/embed/tools.js');
  return (
    <PageWrapper>
      Verify Vote
    </PageWrapper>
  );
};

VerifyVoteWrapper.propTypes = {
  voteMode: PropTypes.string,
};

export default VerifyVoteWrapper;
