import React from 'react';
import styled from 'styled-components';

import { MaxContent } from '../TeamWrapper';
import GoodCertifiedPoints from '../CandidatesWrapper/GoodCertifiedPoints';

const Section = styled.section`
  padding: 60px 16px;
`;

const H3 = styled.h3`
  margin: 0 0 45px;
  font-size: 28px;
  line-height: 53px;
  font-weight: 900;
`;

const Pledge = () => {
  return (
    <Section>
      <MaxContent>
        <H3 className="text-center">Good Certified candidates pledge to be:</H3>
        <GoodCertifiedPoints homepageMode />
      </MaxContent>
    </Section>
  );
};

export default Pledge;