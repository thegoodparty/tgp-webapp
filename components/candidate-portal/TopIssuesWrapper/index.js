/**
 *
 * TopIssuesWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { H2, Body11 } from '../../shared/typogrophy';
import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import { BlueButton, PurpleButton } from '../../shared/buttons';
import TopIssue from './TopIssue';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function TopIssuesWrapper({ candidateIssue, updateIssueCallback, topics }) {
  const [topIssues, setTopIssues] = useState([]);
  const [topicList, setTopicList] = useState([]);
  useEffect(() => {
    setTopicList(
      topics.map(topic => ({
        id: topic.id,
        topic: topic.topic,
        positions: topic.positions,
      })),
    );
  }, [topics]);
  useEffect(() => {
    if (candidateIssue) {
      setTopIssues(candidateIssue);
    }
  }, [candidateIssue]);

  const updateIssue = (issueIndex, issue) => {
    const newIssues = [...topIssues];
    newIssues[issueIndex] = issue;
    setTopIssues(newIssues);
  };
  const deleteIssue = deleteIndex => {
    setTopIssues(topIssues.filter((issue, index) => index !== deleteIndex));
  };
  const addNewIssue = () => {
    setTopIssues([...topIssues, {}]);
  };
  const isFormValidate = () => {
    let isValid = true;
    topIssues.forEach(issue => {
      if (!issue.topicId || !issue.positionId || !issue.description) {
        isValid = false;
      }
    });
    return isValid;
  };
  return (
    <PortalPageWrapper>
      <Wrapper>
        <H2 className="text-left">Issues</H2>
        <Body11 className="text-left">
          Select up to 10 top issues for your campaign in order of importance.
        </Body11>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <hr />
          </Grid>
          {topIssues.map((issue, index) => (
            <TopIssue
              index={index}
              topicList={topicList.filter(
                item =>
                  !topIssues
                    .map(issueItem => issueItem.topicId)
                    .includes(item.id) || item.id === issue.topicId,
              )}
              issue={issue}
              updateIssue={updateIssue}
              deleteIssue={() => deleteIssue(index)}
            />
          ))}
          <Grid item xs={3}>
            <BlueButton onClick={addNewIssue} fullWidth>
              Add New Issue
            </BlueButton>
          </Grid>
          <Grid item xs={12}>
            <PurpleButton
              disabled={!isFormValidate()}
              onClick={() => updateIssueCallback(topIssues)}
              fullWidth
            >
              SAVE
            </PurpleButton>
          </Grid>
        </Grid>
      </Wrapper>
    </PortalPageWrapper>
  );
}

TopIssuesWrapper.propTypes = {
  topics: PropTypes.array,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidateIssue: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  updateIssueCallback: PropTypes.func,
};

export default TopIssuesWrapper;
