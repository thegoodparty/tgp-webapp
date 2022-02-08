/**
 *
 * TopIssues
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
            if (currentTopic && currentTopic !== item && currentPosition) {
              const newPositions = topicList?.find(
                topic => topic.id === item.id,
              )?.positions;
              if (newPositions.length > 0) {
                updateIssue(index, {
                  ...issue,
                  positionId: newPositions[0]?.id,
                  topicId: item?.id,
                });
                setPosition(newPositions[0]);
              }
            }
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

export default TopIssue;
