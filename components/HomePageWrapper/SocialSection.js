import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

import { numberFormatter } from '/helpers/numberHelper';
import Row from '../shared/Row';

const Wrapper = styled.section`
  padding-bottom: 130px;
`;

const TopRow = styled(Row)`
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const Stat = styled(Row)`
  align-items: initial;
  margin-right: 70px;
`;
const Icon = styled.div`
  font-size: 40px;
  margin-right: 16px;
`;
const Count = styled.div`
  font-size: 48px;
  font-weight: 900;
`;
const Label = styled.div`
  font-size: 19px;
  font-weight: 900;
`;


const stats = [
  { label: '#goodparty posts', count: '146123', icon: <>😁</> },
  { label: '#goodparty hosts', count: '621', icon: <>🎉</> },
];

const SocialSection = () => {
  return (
    <Wrapper>
      <TopRow>
        <Row>
          {stats.map((stat) => (
            <Stat key={stat.label}>
              <Icon>{stat.icon}</Icon>
              <div>
                <Count>{numberFormatter(stat.count)}</Count>
                <Label>{stat.label}</Label>
              </div>
            </Stat>
          ))}
        </Row>
        <div>What does partying accomplish?</div>
      </TopRow>
      <Grid container spacing={8} className="text-center">
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social1.jpg" height={615} width={369} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social2.jpg" height={615} width={369} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social3.jpg" height={615} width={369} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SocialSection;
