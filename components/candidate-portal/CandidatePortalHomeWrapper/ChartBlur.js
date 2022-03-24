/**
 *
 * ChartBlur
 *
 */

import React from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Wrapper = styled.div`
  height: 200px;
  opacity: 0.6;
  filter: blur(4px);
`;

const data = [
  {
    name: 'Sun',
    val: 200,
  },
  {
    name: 'Mon',
    val: 590,
  },
  {
    name: 'Tue',
    val: 330,
  },
  {
    name: 'Wed',
    val: 780,
  },
  {
    name: 'Thu',
    val: 480,
  },
  {
    name: 'Fri',
    val: 890,
  },
  {
    name: 'Sat',
    val: 300,
  },
];

function ChartBlur() {
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
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#CA2CCD" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#CA2CCD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <Area
            type="monotone"
            dataKey="val"
            stroke="#CA2CCD"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default ChartBlur;
