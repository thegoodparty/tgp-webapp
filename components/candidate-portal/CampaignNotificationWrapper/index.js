/**
 *
 * CampaignNotificationWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { H2 } from '../../shared/typogrophy';
import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function CampaignNotificationWrapper({
  campaignNotification,
  updateCampaignNotificationCallback,
  candidate,
  role,
}) {
  const [template, setTemplate] = useState('');
  const [isWeekly, setIsWeekly] = useState(false);
  const [weekday, setWeekday] = useState(-1);
  useEffect(() => {
    setTemplate(campaignNotification.template);
    setWeekday(campaignNotification.weekday);
    setIsWeekly(campaignNotification.weekday >= 0);
  }, [campaignNotification]);
  const isFormValidate = () => template !== '';
  return (
    <PortalPageWrapper role={role}>
      <Wrapper>
        <H2 className="text-left">Notification Setting</H2>
        <br />
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Email Template"
          multiline
          rows={4}
          fullWidth
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          variant="outlined"
        />
        <br />
        <br />
        <FormControlLabel
          value="start"
          control={
            <Checkbox
              color="primary"
              value={isWeekly}
              checked={isWeekly}
              onChange={(e) => {
                setIsWeekly(e.target.checked);
                if (e.target.checked) {
                  setWeekday(5);
                } else {
                  setWeekday(-1);
                }
              }}
            />
          }
          label="Receive Weekly Newsletter?"
          labelPlacement="start"
        />
        <br />
        <br />
        {isWeekly && (
          <FormControl variant="filled" style={{ width: 300 }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Day of Week
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
              label="Age"
            >
              <MenuItem value={0}>Sunday</MenuItem>
              <MenuItem value={1}>Monday</MenuItem>
              <MenuItem value={2}>Tuesday</MenuItem>
              <MenuItem value={3}>Wednesday</MenuItem>
              <MenuItem value={4}>Thursday</MenuItem>
              <MenuItem value={5}>Friday</MenuItem>
              <MenuItem value={6}>Saturday</MenuItem>
            </Select>
          </FormControl>
        )}
        <Box mt={3}>
          <Grid item xs={12}>
            <PurpleButton
              disabled={!isFormValidate()}
              onClick={() =>
                updateCampaignNotificationCallback(
                  { template, weekday },
                  candidate.id,
                )
              }
              fullWidth
            >
              SAVE
            </PurpleButton>
          </Grid>
        </Box>
      </Wrapper>
    </PortalPageWrapper>
  );
}

CampaignNotificationWrapper.propTypes = {
  campaignNotification: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateCampaignNotificationCallback: PropTypes.func,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default CampaignNotificationWrapper;
