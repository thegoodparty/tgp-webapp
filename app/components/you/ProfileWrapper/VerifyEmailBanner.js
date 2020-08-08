import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body13 } from 'components/shared/typogrophy';

const Wrapper = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.orange};
`;
const InnerWrapper = styled(Body13)`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  color: #fff;
  display: flex;
  justify-content: space-between;
  a {
    color: #fff;
    text-decoration: underline;
  }
`;

const VerifyEmailBanner = ({ user }) => {
  if (!user || user.isEmailVerified) {
    return <></>;
  }
  return (
    <Wrapper>
      <InnerWrapper>
        <span>Please verify your email so we can get you counted.</span>
        <a href="#">Resend Email Verification</a>
      </InnerWrapper>
    </Wrapper>
  );
};

VerifyEmailBanner.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default VerifyEmailBanner;
