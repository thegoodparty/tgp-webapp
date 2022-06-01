import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Tooltip from './Tooltip';
import BlackButton, { InnerButton } from './buttons/BlackButton';

const InnerTooltip = styled.div`
  padding: 20px;
  font-size: 12px;
`;

const Title = styled.div`
  font-weight: 900;
  margin-bottom: 22px;
  font-size: 18px;
`;

const Small = styled.div`
  font-size: 11px;
`;
const points = [
  { title: 'is the system', content: 'that tears away our hopes' },
  { title: 'is the duopoly', content: 'that fights to keep us divided' },
  { title: 'is the rat race', content: 'that consumes our lives' },
];

const It = () => {
  return (
    <Tooltip
      triggerEl={
        <u>
          <i className="pointer">It</i>
        </u>
      }
    >
      <InnerTooltip>
        <Title>
          What is{' '}
          <u>
            <i>It?</i>
          </u>
        </Title>
        <Grid container spacing={3}>
          {points.map((point) => (
            <Grid item xs={12} lg={4} key={point.title}>
              <strong>
                <u>
                  <i>It</i>
                </u>{' '}
                {point.title}
              </strong>
              <br />
              {point.content}
            </Grid>
          ))}
        </Grid>
        <div className="text-center" style={{ marginTop: '24px' }}>
          <BlackButton>
            <InnerButton>
              <Small>Read our Manifesto</Small>
            </InnerButton>
          </BlackButton>
        </div>
      </InnerTooltip>
    </Tooltip>
  );
};

export default It;
