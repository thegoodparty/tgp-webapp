/**
 *
 * CampaignChart
 *
 */

import React from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Wrapper = styled.div`
  height: 200px;
`;

const data = [
  {
    name: 'Sun',
    count: 200,
  },
  {
    name: 'Mon',
    count: 590,
  },
  {
    name: 'Tue',
    count: 330,
  },
  {
    name: 'Wed',
    count: 780,
  },
  {
    name: 'Thu',
    count: 480,
  },
  {
    name: 'Fri',
    count: 590,
  },
  {
    name: 'Sat',
    count: 300,
  },
];

function CampaignChart() {
  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={600}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCampaign" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2CCDB0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2CCDB0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#2CCDB0"
            fillOpacity={1}
            fill="url(#colorCampaign)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default CampaignChart;
