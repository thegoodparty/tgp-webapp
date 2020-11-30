import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import { Body13, H2, H3 } from 'components/shared/typogrophy/index';
import tgpTheme from 'theme/index';

const EmailConfirmationImage = '/images/email-confirmation.svg';
const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  position: relative;
  height: 100vh;
`;

const Img = styled.img`
  max-height: 30vh;
  margin-bottom: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: 30vh;
  }
`;
const ContentWrapper = styled.div`
  color: #fff;
  text-align: center;
  padding: 20px 0;
`;
const StyledH2 = styled(H2)`
  color: #fff;
`;
const StyledH3 = styled(H3)`
  color: #fff;
  font-weight: 400;
  margin-top: 16px;
`;
const Resend = styled(Body13)`
  color: #fff;
  margin-top: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  letter-spacing: 0.5px;
  cursor: pointer;
`;

const wrapperStyles = {
  backgroundColor: tgpTheme.colors.blue,
};

const ConfirmationSentWrapper = ({ email, emailSendCallback }) => {
  return (
    <PageWrapper>
      <Wrapper style={wrapperStyles}>
        <div className="text-center">
          <Img src={EmailConfirmationImage} />
        </div>
        <ContentWrapper>
          <StyledH2>Sign-in link sent {email && <>to {email}</>}</StyledH2>
          <StyledH3>
            Tap on the link sent in your email to automatically sign -in
          </StyledH3>
          <Resend onClick={emailSendCallback}>Resend Email</Resend>
        </ContentWrapper>
      </Wrapper>
    </PageWrapper>
  );
};

ConfirmationSentWrapper.propTypes = {
  email: PropTypes.string,
  emailSendCallback: PropTypes.func,
};

export default ConfirmationSentWrapper;
