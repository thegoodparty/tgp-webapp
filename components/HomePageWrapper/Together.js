import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import { FontH1 } from '../shared/typogrophy';
import { MaxContent } from '../TeamWrapper';
import { numberFormatter } from '../../helpers/numberHelper';
import { HomePageContext } from '../../containers/HomePage';

const Section = styled.section`
  padding: 62px 12px;
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
      <H2>
        Together we can change things for <Good>GOOD</Good>
      </H2>
    </Section>
  );
};

export default Together;
