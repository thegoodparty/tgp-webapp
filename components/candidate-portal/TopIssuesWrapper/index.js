/**
 *
 * TopIssuesWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { H2, Body11 } from '../../shared/typogrophy';

import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';
import { BlueButton, PurpleButton } from '../../shared/buttons';
import PortalContentTopMenu from '../PortalContentTopMenu';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function TopIssue({ index, topicList, issue, updateIssue, deleteIssue }) {
  const [currentTopic, setTopic] = useState();
  const [currentPosition, setPosition] = useState();
  const [currentWebsiteUrl, setWebsiteUrl] = useState();
  const [currentDescription, setDescription] = useState();

  useEffect(() => {
    if (issue) {
      const { topicId, positionId, websiteUrl, description } = issue;
      const topic = topicList?.find(item => item.id === topicId);
      setTopic(topic);
      setPosition(topic?.positions.find(item => item.id === positionId));
      setWebsiteUrl(websiteUrl);
      setDescription(description);
    }
  }, [issue]);
  return (
    <React.Fragment key={issue?.id}>
      <Grid item xs={1}>
        <span>{index + 1}.</span>
      </Grid>
      <Grid item xs={2}>
        <Autocomplete
          size="small"
          options={topicList}
          value={
            topicList?.find(item => item.id === issue.topicId) || currentTopic
          }
          getOptionLabel={item => item.topic}
          fullWidth
          renderInput={params => (
            <TextField {...params} label="Topic" variant="outlined" />
          )}
          onChange={(event, item) => {
            updateIssue(index, {
              ...issue,
              topicId: item?.id,
            });
            setTopic(item);
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          size="small"
          options={currentTopic?.positions || []}
          value={
            topicList
              ?.find(item => item.id === issue.topicId)
              ?.positions.find(item => item.id === issue.positionId) ||
            currentPosition
          }
          getOptionLabel={item => item.name}
          fullWidth
          renderInput={params => (
            <TextField {...params} label="Position" variant="outlined" />
          )}
          onChange={(event, item) => {
            updateIssue(index, {
              ...issue,
              positionId: item?.id,
            });
            setPosition(item);
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size="small"
          primary
          label="Description"
          name="Description"
          variant="outlined"
          value={currentDescription}
          onChange={e => {
            setDescription(e.target.value);
            updateIssue(index, {
              ...issue,
              description: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          size="small"
          primary
          label="Website URL(optional)"
          name="Description"
          variant="outlined"
          value={currentWebsiteUrl}
          onChange={e => {
            setWebsiteUrl(e.target.value);
            updateIssue(index, {
              ...issue,
              websiteUrl: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton
          color="primary"
          onClick={() => {
            deleteIssue();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </React.Fragment>
  );
}
TopIssue.propTypes = {
  topicList: PropTypes.array,
  issue: PropTypes.object,
  updateIssue: PropTypes.func,
  deleteIssue: PropTypes.func,
  index: PropTypes.number,
};
function TopIssuesWrapper({
  candidate,
  candidateIssue,
  updateIssueCallback,
  topics,
}) {
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
        <PortalContentTopMenu candidate={candidate} />
        <br />
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
                  !candidateIssue
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
