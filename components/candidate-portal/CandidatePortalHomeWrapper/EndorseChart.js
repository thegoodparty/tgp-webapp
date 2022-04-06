/**
 *
 * EndorseChart
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

const Wrapper = styled.div`
  height: 200px;
`;

function EndorseChart() {
  const { stats } = useContext(CandidatePortalHomePageContext);
  const data = stats.chart;
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
            <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c92fc9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#c92fc9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="impressions"
            stroke="#c92fc9"
            fillOpacity={1}
            fill="url(#colorImpressions)"
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorClicks)"
          />
          <Area
            type="monotone"
            dataKey="ctr"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#colorCtr)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default EndorseChart;
