/**
 *
 * RegisterComboWrapper
 *
 */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 32px;
  border-radius: 12px;
  min-width: 280px;
  max-width: 600px;
  width: 80vw;
`;

const Title = styled.h3`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  padding-bottom: 35px;
  margin-bottom: 35px;
  font-size: 17px;
  border-bottom: solid 1px #ececec;
`;


function RegisterComboWrapper() {
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <SubTitle>
        Get Good Party updates and track indie campaigns near you!
      </SubTitle>
      <form noValidate onSubmit={(e) => e.preventDefault()}>

      </form>
    </Wrapper>
  );
}

RegisterComboWrapper.propTypes = {};

export default RegisterComboWrapper;
