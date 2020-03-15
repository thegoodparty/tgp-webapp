import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H1, H3 } from 'components/shared/typogrophy/index';
import EmailConfirmationImage from 'images/email-confirmation.svg';
import tgpTheme from 'theme/index';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
`;

const Img = styled.div`
  height: 40vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;
const ContentWrapper = styled.div`
  color: #fff;
  text-align: center;
  padding: 20px 0;
`;
const StyledH1 = styled(H1)`
  color: #fff;
`;
const StyledH3 = styled(H3)`
  color: #fff;
  font-weight: 400;
  margin-top: 16px;
`;
const Resend = styled(Body13)`
  color: #fff;
  position: fixed;
  bottom: 5rem;
  left: 0;
  width: 100%;
  text-align: center;
  letter-spacing: 0.5px;
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 2rem;
  }
`;

const wrapperStyles = {
  backgroundColor: tgpTheme.colors.blue,
};

const ConfirmationSentWrapper = ({ email, emailSendCallback }) => {
  return (
    <PageWrapper>
      <Nav />
      <Wrapper style={wrapperStyles}>
        <MobileHeader whiteBackButton />
        <Img
          style={{
            backgroundImage: `url(${EmailConfirmationImage})`,
          }}
        />
        <ContentWrapper>
          <StyledH1>Sign-in link sent {email && <>to {email}</>}</StyledH1>
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
