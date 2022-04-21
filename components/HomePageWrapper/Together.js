import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 60px 16px;
  text-align: center;
  background-color: #f2f2f2;
`;

const H2 = styled.h2`
  margin: 0;
  font-size: 40px;
  line-height: 53px;
  font-weight: 400;
`;

const Good = styled.div`
  font-size: 96px;
  font-weight: 900;
  line-height: 115px;
  margin-top: 15px;
`;
const Together = () => {
  return (
    <Section>
      <H2 data-cy="together-section">
        Together we can change things for <Good>GOOD</Good>
      </H2>
    </Section>
  );
};

export default Together;
