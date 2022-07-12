import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { MdClose } from 'react-icons/md';

import { HomePageContext } from '/containers/HomePage';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import EmailInput, { isValidEmail } from '../shared/EmailInput';
import { getUserCookie } from '../../helpers/cookieHelper';

const Wrapper = styled.div`
  padding: 36px;
  background-color: #fff;
  border-radius: 4px;
  max-width: 400px;
  min-width: 300px;
  font-size: 16px;

  .MuiInputBase-input {
    font-size: 14px !important;
  }
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
  color: #d3d3d3;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  font-weight: 900;
  margin-bottom: 4px;
  margin-top: 30px;
`;
const P = styled.div`
  margin-bottom: 16px;
`;

const Button = styled(BlackButton)``;

const InvolvedModalInner = ({
  closeModalCallback,
  openRegisterModalCallback,
}) => {
  const user = getUserCookie(true);
  const [email, setEmail] = useState(user ? user.email : '');
  const { subscribeEmailCallback } = useContext(HomePageContext);
  const handleHost = () => {
    closeModalCallback();
    openRegisterModalCallback();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const canSubmit = () => isValidEmail(email);

  const submitEmail = () => {
    if (isValidEmail(email)) {
      subscribeEmailCallback(email);
    }
  };
  return (
    <Wrapper>
      <div className="text-right">
        <CloseWrapper onClick={closeModalCallback}>
          <MdClose />
        </CloseWrapper>
      </div>
      <Title>Get Involved</Title>
      <SubTitle>Host a #goodparty:</SubTitle>
      <P>
        Use your freedom of assembly when you host and post a party with your
        friends.
      </P>

      <BlackButton onClick={handleHost} style={{ padding: '5px' }}>
        <InnerButton>Learn more</InnerButton>
      </BlackButton>

      <SubTitle>Follow Good Candidates:</SubTitle>
      <P>
        Discover indie and third party candidates fighting for issues you care
        about
      </P>
      <Link href="/candidates" passHref>
        <a className="no-underline">
          <BlackButton style={{ padding: '5px' }}>
            <InnerButton>Find Candidates</InnerButton>
          </BlackButton>
        </a>
      </Link>

      <SubTitle>Stay in the know:</SubTitle>
      <P>
        Subscribe to stay in the loop about the movement, campaign progress, and
        more!
      </P>
      <EmailInput hideIcon onChangeCallback={handleEmailChange} value={email} />
      <BlackButton
        disabled={!canSubmit()}
        onClick={submitEmail}
        style={{ padding: '5px' }}
      >
        <InnerButton>Submit</InnerButton>
      </BlackButton>
    </Wrapper>
  );
};

export default InvolvedModalInner;
