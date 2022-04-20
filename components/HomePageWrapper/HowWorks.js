import React from 'react';
import styled from 'styled-components';

import MaxWidth from '/components/shared/MaxWidth';

const Section = styled.section`
  padding: 60px 16px;
  text-align: center;
  font-size: 24px;
  line-height: 36px;
`;

const H3 = styled.h3`
  margin: 0 0 45px;
  font-size: 28px;
  line-height: 53px;
  font-weight: 900;
`;
const HowWorks = () => {
  return (
    <Section>
      <MaxWidth>
        <H3>How does it work?</H3>
        <div>
          We provide <strong>free crowd-voting tools</strong> to help Good
          Certified candidates run and win.
          <br />
          <br />
          Crowd-voting tools help <strong>mobilize the votes</strong> needed to
          win elections and make change happen.
          <br />
          <br />
          It’s kind of like crowd-funding (GoFundMe), but for{' '}
          <strong>votes instead of money.</strong>
        </div>
      </MaxWidth>
    </Section>
  );
};

export default HowWorks;
