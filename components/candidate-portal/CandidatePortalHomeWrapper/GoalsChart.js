/**
 *
 * GoalsChart
 *
 */

import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const Wrapper = styled.div`
  position: relative;
`;
const ChartWrapper = styled.div`
  height: 200px;
  transform: scaleX(1) rotate(90deg);
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Large = styled.div`
  font-size: 28px;
  font-weight: 900;
`;

const WhiteCircle = styled.div`
  background-color: #fff;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: solid 1px #998ee2;
`;

const Icon = styled.div`
  transform: rotate(-90deg);
`;

const data = [
  { name: 'To Win', value: 100 },
  { name: 'So Far', value: 11 },
];
const COLORS = ['#998ee2', '#422CCD'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, index } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const radiusPlus = radius + 5;
  const x = cx + radiusPlus * Math.cos(-startAngle * RADIAN);
  const y = cy + radiusPlus * Math.sin(-startAngle * RADIAN);

  const xBase = cx + radius * Math.cos(-startAngle * RADIAN);
  const yBase = cy + radius * Math.sin(-startAngle * RADIAN);

  return (
    <>
      <g>
        <foreignObject x={x} y={y} width={20} height={20}>
          {index === 0 ? <Icon>🎉️</Icon> : <Icon>🗳</Icon>}
        </foreignObject>
      </g>

      {index === 1 && (
        <g>
          <foreignObject x={xBase - 10} y={yBase - 10} width={20} height={20}>
            <WhiteCircle />
          </foreignObject>
        </g>
      )}
    </>
  );
};

function GoalsChart() {
  return (
    <Wrapper>
      <ChartWrapper>
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
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
      <TextWrapper>
        <div className="text-center">
          <Large>60%</Large>
          Votes Needed
          <br />
          To Win
        </div>
      </TextWrapper>
    </Wrapper>
  );
}

export default GoalsChart;
