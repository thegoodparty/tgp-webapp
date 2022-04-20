/**
 *
 * GoalsChart
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

const Wrapper = styled.div`
  position: relative;
`;
const ChartWrapper = styled.div`
  height: 200px;
  transform: scaleX(1) rotate(90deg);

  svg:not(:root) {
    overflow: visible;
  }
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
  position: relative;
  z-index: 1;
`;

const Icon = styled.div`
  transform: rotate(-90deg);
`;

const COLORS = ['#998ee2', '#422CCD'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, index } = props;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  console.log('radius', radius);
  const radiusPlus = radius + 20;
  const x = cx + radiusPlus * Math.cos(-startAngle * RADIAN);
  const y = cy + radiusPlus * Math.sin(-startAngle * RADIAN);

  const xBase = cx + radius * Math.cos(-startAngle * RADIAN);
  const yBase = cy + radius * Math.sin(-startAngle * RADIAN);

  return (
    <>
      {index === 1 && (
        <g>
          {/*<foreignObject x={xBase - 10} y={yBase - 10} width={20} height={20}>*/}
          <foreignObject x={xBase - 10} y={yBase - 10} width={20} height={20}>
            <WhiteCircle />
          </foreignObject>
        </g>
      )}
      <g>
        <foreignObject x={x - 10} y={y - 10} width={20} height={20}>
          {index === 0 ? <Icon>🎉️</Icon> : <Icon>🗳</Icon>}
        </foreignObject>
      </g>
    </>
  );
};

function GoalsChart() {
  const { candidate } = useContext(CandidatePortalHomePageContext);
  const { likelyVoters, votesNeeded } = candidate;
  const data = [
    { name: 'To Win', value: votesNeeded },
    { name: 'So Far', value: likelyVoters },
  ];
  const perc = parseInt((likelyVoters * 100) / votesNeeded, 10);
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
              isAnimationActive={false}
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
          <Large>{perc}%</Large>
          Votes Needed
          <br />
          To Win
        </div>
      </TextWrapper>
    </Wrapper>
  );
}

export default GoalsChart;
