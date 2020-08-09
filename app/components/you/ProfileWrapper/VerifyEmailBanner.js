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
`;

const Resend = styled.div`
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 6px;
`;

const VerifyEmailBanner = ({ user, verifyEmailCallback }) => {
  if (!user || user.isEmailVerified) {
    return <></>;
  }
  const handleResend = () => {
    verifyEmailCallback(user.email);
  };
  return (
    <Wrapper>
      <InnerWrapper>
        <div>
          Please verify the email sent to validate your account at: {user.email}
        </div>
        <Resend onClick={handleResend}>Resend Email Verification</Resend>
      </InnerWrapper>
    </Wrapper>
  );
};

VerifyEmailBanner.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  verifyEmailCallback: PropTypes.func,
};

export default VerifyEmailBanner;
