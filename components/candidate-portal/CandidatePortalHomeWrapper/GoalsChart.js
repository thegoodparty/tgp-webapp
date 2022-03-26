/**
 *
 * GoalsChart
 *
 */

import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const Wrapper = styled.div`
  height: 200px;
  //transform: rotate(90deg);
  transform: scaleX(-1) rotate(90deg);
`;
const data = [
  { name: 'To Win', value: 100 },
  { name: 'So Far', value: 60 },
];
const COLORS = ['#422CCD', '#998ee2'];

function GoalsChart() {
  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={50}
            endAngle={310}
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/*<Pie*/}
          {/*  data={data02}*/}
          {/*  dataKey="value"*/}
          {/*  cx="50%"*/}
          {/*  cy="50%"*/}
          {/*  innerRadius={70}*/}
          {/*  outerRadius={90}*/}
          {/*  fill="#82ca9d"*/}
          {/*  label*/}
          {/*/>*/}
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default GoalsChart;
