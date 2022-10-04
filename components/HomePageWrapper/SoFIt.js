import React from 'react';
import styled from 'styled-components';

import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import MaxWidth from '../shared/MaxWidth';

const Wrapper = styled.section`
  background-color: #f1f1f1;
`;

const Banner = styled.div`
  background-color: #f1f1f1;
  padding: 36px 36px 260px;
  font-size: 24px;

  background-size: auto 50%;
  background-repeat: no-repeat;
  background-position: right bottom;

  position: relative;

  @media only screen and (min-width: 1024px) {
    padding: 72px;
    background-size: auto 100%;
    font-size: 30px;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 900;
`;

const SoFIt = ({ openModalCallback = () => {} }) => {
  return (
    <Wrapper id="host">
      <MaxWidth>
        <Banner
          style={{ backgroundImage: 'url(/images/homepage/banner-bg-1.png)' }}
        >
          <Title>So what’s next?</Title>
          <BlackButton
            style={{ marginTop: '40px' }}
            onClick={openModalCallback}
            id="what-do-i-do-button"
          >
            <InnerButton>Get Involved</InnerButton>
          </BlackButton>
        </Banner>
      </MaxWidth>
    </Wrapper>
  );
};

export default SoFIt;
