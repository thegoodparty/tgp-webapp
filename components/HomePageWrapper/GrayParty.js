import React from 'react';
import styled from 'styled-components';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Wrapper = styled.section`
  background-color: #f3f3f3;
  padding: 116px 24px;
  text-align: center;
`;

const H2 = styled.h2`
  margin: 0 0 40px;
  font-size: 64px;
  font-weight: 900;
`;

const GrayParty = () => {
  return (
    <Wrapper>
      <H2>
        We party every Tuesday.
        <br />
        Because{' '}
        <i>
          <u>it</u>
        </i>{' '}
        doesn’t want us to.
      </H2>
      <BlackButton>
        <InnerButton style={{ textTransform: 'none', padding: '0 80px' }}>
          Host a #goodparty
        </InnerButton>
      </BlackButton>
    </Wrapper>
  );
};

export default GrayParty;
