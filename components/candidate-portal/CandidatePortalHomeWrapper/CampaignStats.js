import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { numberFormatter } from 'helpers/numberHelper';
import { Body, Body11, Body13, H3 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  text-align: left;
  height: 100%;
  border: solid 1px ${({ theme }) => theme.colors.gray7};
  border-radius: 8px;
  padding: 16px;
`;

const Stat = styled(Body13)`
  margin-top: 8px;
  text-transform: uppercase;
  font-weight: 500;
`;

const Total = styled(Body11)`
  margin-top: 8px;
`;

const Perc = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: green;
  font-weight: 700;
  &.red {
    color: red;
  }
`;

const ChartWrapper = styled.div`
  height: 300px;
  margin-top: 24px;
  background-color: #efefef;
  padding: 12px 0;
  border-radius: 8px;
`;

const progressPerc = (thisTotal, lastTotal) => {
  if (thisTotal === 0 && lastTotal === 0) {
    return '0%';
  }
  if (lastTotal === 0) {
    return '+100%';
  }
  const perc = (thisTotal * 100) / lastTotal;
  const sign = thisTotal > lastTotal ? '+' : '-';
  return `${sign}${parseInt(perc, 10)}%`;
};

const dateRanges = ['Last Week', 'Last 30 days'];

const CampaignStats = ({ stats, loadStatsCallback }) => {
  const [dateRange, setDateRange] = useState(dateRanges[0]);
  if (!stats) {
    return <></>;
  }
  const periodStats = stats.stats;

  const { totals } = stats;

  const totalsLabel = {
    visits: 'Visitors',
    endorsers: 'Endorsers so far',
    likelyVoters: 'Likely Voters',
    unrepVoters: 'Unrepresented Voters',
    votesNeeded: 'Votes Needed',
  };

  const handleChange = event => {
    setDateRange(event.target.value);
    loadStatsCallback(event.target.value);
  };

  return (
    <Wrapper>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Body>
            <strong>Campaign Snapshot</strong>
          </Body>
        </Grid>
        <Grid item xs={12} md={6} className="text-right">
          <Select value={dateRange} onChange={handleChange} variant="outlined">
            {dateRanges.map(range => (
              <MenuItem value={range}>{range}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <br />
      <Body>
        <strong>{dateRange}</strong>
      </Body>
      {Object.keys(periodStats).map(key => (
        <Stat key={key}>
          {numberFormatter(periodStats[key].total)} {key}{' '}
          <Perc
            className={
              periodStats[key].total > periodStats[key].lastPeriod
                ? 'green'
                : 'red'
            }
          >
            {progressPerc(periodStats[key].total, periodStats[key].lastPeriod)}
          </Perc>
        </Stat>
      ))}

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={stats.chart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#8884d8"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="endorsements"
              stroke="#82ca9d"
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="shares"
              stroke="#ffce9f"
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
      <br />
      <Body>
        <strong>All time</strong>
      </Body>
      {Object.keys(totals).map(key => (
        <Total key={key}>
          {numberFormatter(totals[key])} {totalsLabel[key]}{' '}
        </Total>
      ))}
    </Wrapper>
  );
};

CampaignStats.propTypes = {
  stats: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadStatsCallback: PropTypes.func,
};

export default CampaignStats;
