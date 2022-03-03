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
import AdminPageWrapper from '../../admin/AdminWrapper/AdminPageWrapper';

import { BlueButton, PurpleButton } from '../../shared/buttons';
import TopIssue from './TopIssue';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function TopIssuesWrapper({
  candidateIssue,
  candidate,
  updateIssueCallback,
  topics,
  candidateId,
  role,
  isAdmin,
}) {
  const [topIssues, setTopIssues] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setTopicList(
      topics.map((topic) => ({
        id: topic.id,
        topic: topic.topic,
        positions: topic.positions,
      })),
    );
  }, [topics]);
  useEffect(() => {
    if (candidateIssue) {
      setIsLoading(false);
      setTopIssues(candidateIssue);
    }
  }, [candidateIssue]);
  const onUpdateIssue = (topIssues, candidateId) => {
    updateIssueCallback(
      topIssues.map(topIssue => ({...topIssue, topic: topIssue.topic.id})), 
      candidateId
    );
    setIsLoading(true);
  };
  const updateIssue = (issueIndex, issue) => {
    const newIssues = [...topIssues];
    newIssues[issueIndex] = issue;
    setTopIssues(newIssues);
  };
  const deleteIssue = (deleteIndex) => {
    setTopIssues(topIssues.filter((issue, index) => index !== deleteIndex));
  };
  const addNewIssue = () => {
    setTopIssues([...topIssues, {}]);
  };
  const isFormValidate = () => {
    let isValid = true;
    topIssues.forEach((issue) => {
      if (!issue.topic || !issue.positionId || !issue.description) {
        isValid = false;
      }
    });
    return isValid;
  };
  const PageWrapper = isAdmin ? AdminPageWrapper : PortalPageWrapper;
  const availTopicList = topicList.filter(
    (item) =>
      !topIssues
        .map((issueItem) => issueItem.topic?.id)
        .includes(item.id));

  return (
    <PageWrapper role={role}>
      <Wrapper>
        <H2 className="text-left">
          Issues
          {candidateId ? ` - ${candidate.firstName} ${candidate.lastName}` : ''}
        </H2>
        <Body11 className="text-left">
          Select up to 10 top issues for your campaign in order of importance.
        </Body11>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <hr />
          </Grid>
          {topIssues.map((issue, index) => (
            <TopIssue
              key={index}
              index={index}
              topicList={issue.topic ? [...availTopicList, issue.topic]: availTopicList}
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
              disabled={!isFormValidate() || isLoading}
              onClick={() => onUpdateIssue(topIssues, candidateId)}
              fullWidth
            >
              SAVE
            </PurpleButton>
          </Grid>
        </Grid>
      </Wrapper>
    </PageWrapper>
  );
}

TopIssuesWrapper.propTypes = {
  topics: PropTypes.array,
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  candidateId: PropTypes.number,
  candidateIssue: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  updateIssueCallback: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default TopIssuesWrapper;
