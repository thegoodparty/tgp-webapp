/**
 *
 * ChangeLogWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';

import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import BuildIcon from '@material-ui/icons/Build';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import UpdateIcon from '@material-ui/icons/Update';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from '../shared/PageWrapper';
import { H1, H2 } from '../shared/typogrophy';

const StyledH1 = styled(H1)`
  && {
    margin-top: 30px;
    color: #000;
    font-size: 26px;
    line-height: 52px;

    @media only screen and (min-width: 768px) {
      font-size: 36px;
      line-height: 82px;
    }
  }
  
`;

function ChangeLogWrapper({ releases }) {
  const sortedReleases = releases?.sort(function(a, b) {
    const aDate = new Date(a.releaseDate);
    const bDate = new Date(b.releaseDate);
    if (aDate > bDate) {
      return -1;
    }
    if (aDate < bDate) {
      return 1;
    }
    return 0;
  });
  return (
    <PageWrapper white noPadding>
      <StyledH1>Change Log</StyledH1>
      <Timeline align="alternate">
        {sortedReleases?.map(release => (
          <TimelineItem id={release.id} key={release.id}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {release.releaseDate}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              {release.releaseType === 'fix' && (
                <TimelineDot color="secondary">
                  <BuildIcon />
                </TimelineDot>
              )}
              {release.releaseType === 'update' && (
                <TimelineDot>
                  <UpdateIcon />
                </TimelineDot>
              )}
              {release.releaseType === 'new' && (
                <TimelineDot color="primary">
                  <FiberNewIcon />
                </TimelineDot>
              )}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="h1">
                {release.releaseNote}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </PageWrapper>
  );
}

ChangeLogWrapper.propTypes = {
  releases: PropTypes.array,
};

export default ChangeLogWrapper;
