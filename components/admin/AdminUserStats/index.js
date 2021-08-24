/**
 *
 * AdminUserStats
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import { H3, H1, H2, Body13 } from 'components/shared/typogrophy';
import { numberFormatter } from 'helpers/numberHelper';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
`;

const Title = styled(H2)`
  margin-bottom: 12px;
  text-align: center;
`;

const Box = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoxTitle = styled(H3)`
  margin: 12px auto;
`;

const StyledTooltip = styled(Body13)`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 6px;
  font-weight: 600;
`;

const dateRanges = ['All time', 'last 12 months', 'last 30 days', 'last week'];

function AdminUserStats({ users, loadUsersCallback }) {
  const [dateRange, setDateRange] = useState(dateRanges[0]);
  const [verifiedEmailData, setVerifiedEmailData] = useState([]);
  const [socialRegisterData, setSocialRegisterData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [zipData, setZipData] = useState([]);

  useEffect(() => {
    let verifiedEmailCount = 0;
    let socialRegister = 0;
    let google = 0;
    let facebook = 0;
    let hasPassword = 0;
    const states = {};
    const zips = {};
    users &&
      users?.map(user => {
        if (user.isEmailVerified) {
          verifiedEmailCount++;
        }
        if (user.socialId) {
          socialRegister++;
          if (user.socialProvider === 'google') {
            google++;
          } else if (user.socialProvider === 'facebook') {
            facebook++;
          }
        }
        if (user.hasPassword) {
          hasPassword++;
        }
        const state = user.shortState;
        if (!states[state]) {
          states[state] = 1;
        } else {
          states[state] = states[state] + 1;
        }
        const zip = user.zipCode;
        if (!zips[zip]) {
          zips[zip] = 1;
        } else {
          zips[zip] = zips[zip] + 1;
        }
      });

    setVerifiedEmailData([
      { name: 'Verified Email', value: verifiedEmailCount, fill: '#8dd1e1' },
      {
        name: 'Email Not Verified',
        value: users.length - verifiedEmailCount,
        fill: '#82ca9d',
      },
    ]);

    setSocialRegisterData([
      { name: 'Social - Facebook', value: facebook, fill: '#d88d36' },
      { name: 'Social - Google', value: google, fill: '#82ca9d' },
      {
        name: 'Social - Unknown',
        value: socialRegister - facebook - google,
        fill: '#8884d8',
      },
      {
        name: 'Email - No Password',
        value: users.length - socialRegister - hasPassword,
        fill: '#ed78b8',
      },
      {
        name: 'Email with password',
        value: hasPassword,
        fill: '#83a6ed',
      },
    ]);
    const flatStates = [];
    Object.keys(states).forEach(state => {
      flatStates.push({
        state: state === '' ? 'Not Set' : state,
        count: states[state],
      });
    });
    setStateData(flatStates);

    const flatZips = [];
    Object.keys(zips).forEach(zip => {
      flatZips.push({
        zip: zip ? zip : 'Not Set',
        count: zips[zip],
      });
    });
    setZipData(flatZips);
  }, [users]);

  const customTooltip = ({ active, payload, label }) => {
    if (active) {
      const val = payload[0].value;
      const fill = payload[0].payload?.fill || '#000';
      return (
        <StyledTooltip style={{ color: fill }}>
          {`${payload[0].name} : ${numberFormatter(val)}`}
          <br />
          Percentage:{' '}
          {val === 0 ? val : parseFloat((val * 100) / users.length).toFixed(2)}%
        </StyledTooltip>
      );
    }

    return null;
  };

  const handleChange = event => {
    setDateRange(event.target.value);
    loadUsersCallback(event.target.value);
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <div>
          <Select value={dateRange} onChange={handleChange} variant="outlined">
            {dateRanges.map(range => (
              <MenuItem value={range}>{range}</MenuItem>
            ))}
          </Select>
        </div>
        <Title>User Stats</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              <H3>Total Number of Users</H3>
              <br />
              <H1>{users.length}</H1>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <BoxTitle>Verified Emails</BoxTitle>
              {verifiedEmailData.length > 0 && (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={verifiedEmailData}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <BoxTitle>Social Registration</BoxTitle>
              {socialRegisterData.length > 0 && (
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={socialRegisterData}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip content={customTooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <BoxTitle>States Distribution</BoxTitle>
              {stateData && (
                <ResponsiveContainer>
                  <BarChart data={stateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <BoxTitle>Zip Code Distribution</BoxTitle>
              {zipData && (
                <ResponsiveContainer>
                  <BarChart data={zipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zip" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminUserStats.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminUserStats;
