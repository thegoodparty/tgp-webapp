import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import MaxWidth from '/components/shared/MaxWidth';
import { TESTIMONIALS } from '../../utils/constants';

const Section = styled.section`
  padding: 60px 16px;
`;

const H3 = styled.h3`
  margin: 0 0 45px;
  font-size: 28px;
  line-height: 53px;
  font-weight: 900;
`;

const TestWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  padding: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const TextWrapper = styled.div`
  margin-left: 45px;
  line-height: 30px;
`;

const WhosInIt = () => {
  return (
    <Section>
      <MaxWidth>
        <H3 data-cy="testimonial-subtitle">Who&apos;s into it?</H3>
        <Grid container spacing={4}>
          {TESTIMONIALS.map((test) => (
            <TestWrapper key={test.name} data-cy="testimonial-item">
              <Img width={100} height={100} src={test.img} data-cy="testimonial-avatar" />
              <TextWrapper>
                <strong data-cy="testimonial-content">&quot;{test.text}&quot;</strong>
                <br />
                {test.name}
                <br />
                <strong data-cy="testimonial-position">{test.position}</strong>
              </TextWrapper>
            </TestWrapper>
          ))}
        </Grid>
      </MaxWidth>
    </Section>
  );
};

export default WhosInIt;
