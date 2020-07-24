/**
 *
 * AdminUserStats
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
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

import { H3, H1, H2 } from '../../shared/typogrophy';

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

function AdminUserStats({ users }) {
  const [verifiedEmailData, setVerifiedEmailData] = useState([]);
  const [socialRegisterData, setSocialRegisterData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [zipData, setZipData] = useState([]);

  useEffect(() => {
    let verifiedEmailCount = 0;
    let socialRegister = 0;
    const states = {};
    const zips = {};
    users?.map(user => {
      if (user.isEmailVerified) {
        verifiedEmailCount++;
      }
      if (user.socialId) {
        socialRegister++;
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
      { name: 'Social Register', value: socialRegister, fill: '#8884d8' },
      {
        name: 'Email Register',
        value: users.length - socialRegister,
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

  return (
    <Wrapper>
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
                  <Tooltip />
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
                  <Tooltip />
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
  );
}

AdminUserStats.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminUserStats;
