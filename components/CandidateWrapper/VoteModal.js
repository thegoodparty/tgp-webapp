/**
 *
 * TopSection
 *
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import BlackButton from '../shared/buttons/BlackButton';

const Wrapper = styled.section`
  padding: 20px 50px;
`;

const CloseWrapper = styled.div`
  text-align: right;
  font-size: 20px;
  color: #d3d3d3;
`;

const Title = styled.div`
  font-size: 28px;
  padding: 50px 0;
  text-align: center;
  font-weight: 900;
  border-bottom: 1px solid #ececec;
`;

const ButtonsWrapper = styled.div`
  width: 80%;
  margin: 40px auto;
`;

const ButtonText = styled.div`
  font-size: 15px;
  text-transform: initial;
`;

const Where = styled.div`
  font-size: 15px;
  text-align: center;
  margin-top: 18px;
  text-decoration: underline;
  cursor: pointer;
`;

function VoteModal({
  closeModalCallback,
  checkRegisterVoteCallback,
  whereToVoteCallback,
}) {
  return (
    <Wrapper>
      <CloseWrapper>
        <IoMdClose onClick={closeModalCallback} className="pointer" />
      </CloseWrapper>
      <Title>The election is coming up, get ready!</Title>

      <ButtonsWrapper>
        <BlackButton fullWidth onClick={checkRegisterVoteCallback}>
          <ButtonText>Check to see if you’re registered to vote</ButtonText>
        </BlackButton>

        <Where onClick={whereToVoteCallback}>See where to vote</Where>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default VoteModal;
