/**
 *
 * CampaignChart
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

const Wrapper = styled.div`
  height: 200px;
`;

function CampaignChart() {
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
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2CCDB0" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2CCDB0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="visits"
            stroke="#2CCDB0"
            fillOpacity={1}
            fill="url(#colorVisits)"
          />
          <Area
            type="monotone"
            dataKey="followers"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorFollowers)"
          />
          <Area
            type="monotone"
            dataKey="shares"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#colorShares)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default CampaignChart;
