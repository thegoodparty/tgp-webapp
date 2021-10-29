/**
 *
 * AdminIssueTopicsWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { H3, H2 } from '../../shared/typogrophy';
import AdminIssueTopic from './AdminIssueTopic';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;
const TOPIC_STATUS = {
  NONE: null,
  CREATE: '',
};
function AdminIssueTopicsWrapper({
  createCallback,
  topics,
  editCallback,
  deleteCallback,
}) {
  const [issueTopics, setIssueTopics] = useState([]);
  const [newTopic, setNewTopic] = useState(TOPIC_STATUS.NONE);
  useEffect(() => {
    setIssueTopics(topics);
  }, [topics]);

  const addPosition = (topicIndex, position) => {
    const oldAdminIssueTopics = [...issueTopics];
    const uuid = Math.random()
      .toString(36)
      .substring(2, 12);
    oldAdminIssueTopics[topicIndex].positions.push({
      id: uuid,
      name: position,
    });
    setIssueTopics(oldAdminIssueTopics);
    editCallback(oldAdminIssueTopics[topicIndex]);
  };
  const updatePosition = (topicIndex, position, index) => {
    const oldAdminIssueTopics = [...issueTopics];
    oldAdminIssueTopics[topicIndex].positions[index].name = position;
    setIssueTopics(oldAdminIssueTopics);
    editCallback(oldAdminIssueTopics[topicIndex]);
  };

  const deletePosition = (topicIndex, positionId) => {
    const oldAdminIssueTopics = [...issueTopics];
    oldAdminIssueTopics[topicIndex].positions = oldAdminIssueTopics[
      topicIndex
    ].positions.filter(position => position.id !== positionId);
    setIssueTopics(oldAdminIssueTopics);
    editCallback(oldAdminIssueTopics[topicIndex]);
  };
  const createNewIssueTopic = () => {
    setIssueTopics([
      ...issueTopics,
      {
        topic: newTopic,
        positions: [],
      },
    ]);
    setNewTopic(TOPIC_STATUS.NONE);
    createCallback(newTopic, []);
  };

  const updateTopic = (topicIndex, newTopicName) => {
    const oldAdminIssueTopics = [...issueTopics];
    oldAdminIssueTopics[topicIndex].topic = newTopicName;
    setIssueTopics(oldAdminIssueTopics);
    editCallback(oldAdminIssueTopics[topicIndex]);
  };

  const deleteTopic = topicId => {
    const oldAdminIssueTopics = issueTopics.filter(
      topic => topic.id !== topicId,
    );
    setIssueTopics(oldAdminIssueTopics);
    deleteCallback(topicId);
  };
  return (
    <AdminPageWrapper>
      <Wrapper>
        <br />
        <H2 className="text-center">Admin Issue Topics</H2>

        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">Topic</H3>
          </Grid>
          <Grid item xs={12} md={6}>
            <H3 className="text-center">Positions</H3>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
          {issueTopics.map((item, index) => (
            <AdminIssueTopic
              topicIndex={index}
              issue={item}
              topic={item.topic}
              addPosition={addPosition}
              updatePosition={updatePosition}
              deletePosition={deletePosition}
              deleteTopic={deleteTopic}
              updateTopic={updateTopic}
            />
          ))}
          {newTopic !== TOPIC_STATUS.NONE && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                primary
                name="Positions"
                variant="outlined"
                value={newTopic}
                onChange={e => setNewTopic(e.target.value)}
              />
            </Grid>
          )}
          {newTopic !== TOPIC_STATUS.NONE && (
            <Box p={1}>
              <Button
                disabled={!newTopic}
                variant="contained"
                onClick={createNewIssueTopic}
              >
                Save
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="text"
                onClick={() => {
                  setNewTopic(TOPIC_STATUS.NONE);
                }}
              >
                Close
              </Button>
            </Box>
          )}
          {newTopic === TOPIC_STATUS.NONE && (
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => setNewTopic(TOPIC_STATUS.CREATE)}
            >
              <AddIcon />
            </IconButton>
          )}
        </Grid>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminIssueTopicsWrapper.propTypes = {
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  topics: PropTypes.array,
};

export default AdminIssueTopicsWrapper;
