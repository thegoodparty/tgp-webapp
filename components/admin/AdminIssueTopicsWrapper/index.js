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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { H3, H2 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const ControlButton = styled(IconButton)`
  && {
    padding: 8px;
  }
`;
const POSITION_STATUS = {
  NONE: null,
  CREATE: -1,
};
function AdminIssueTopic({
  topicIndex,
  topic,
  issue,
  addPosition,
  updatePosition,
  deletePosition,
  deleteTopic,
  updateTopic,
}) {
  const [form, setForm] = useState('');
  const [topicForm, setTopicForm] = useState(null);
  const [index, setIndex] = useState(POSITION_STATUS.NONE);
  return (
    <React.Fragment key={topic}>
      <Grid item xs={12} md={6} container alignItems="center">
        {!topicForm && (
          <>
            <strong>{topic}</strong>
            <ControlButton
              color="primary"
              onClick={() => {
                setTopicForm(topic);
              }}
            >
              <EditIcon />
            </ControlButton>
            <ControlButton
              color="primary"
              onClick={() => {
                deleteTopic(issue.id);
              }}
            >
              <DeleteIcon />
            </ControlButton>
          </>
        )}
        {topicForm && (
          <Box>
            <TextField
              fullWidth
              size="small"
              primary
              name="Positions"
              variant="outlined"
              value={topicForm}
              onChange={e => setTopicForm(e.target.value)}
            />
            <Box mt={1}>
              <Button
                disabled={!topicForm}
                variant="contained"
                onClick={() => {
                  updateTopic(topicIndex, topicForm);
                  setTopicForm(null);
                }}
              >
                Save
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="text"
                onClick={() => {
                  setTopicForm(null);
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {(issue?.positions || []).map((position, pIndex) => (
          <Grid item container alignItems="center">
            {pIndex !== index && (
              <>
                <span>{position?.name}</span>
                <ControlButton
                  color="primary"
                  onClick={() => {
                    setIndex(pIndex);
                    setForm(position.name);
                  }}
                >
                  <EditIcon />
                </ControlButton>
                <ControlButton
                  color="primary"
                  onClick={() => {
                    deletePosition(topicIndex, position.id);
                  }}
                >
                  <DeleteIcon />
                </ControlButton>
              </>
            )}
            {pIndex === index && (
              <>
                <TextField
                  fullWidth
                  size="small"
                  primary
                  name="Positions"
                  variant="outlined"
                  value={form}
                  onChange={e => setForm(e.target.value)}
                />
                <Box mt={1}>
                  <Button
                    variant="contained"
                    disabled={!form}
                    onClick={() => {
                      setIndex(POSITION_STATUS.NONE);
                      updatePosition(topicIndex, form, pIndex);
                    }}
                  >
                    Save
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="text"
                    onClick={() => {
                      setIndex(POSITION_STATUS.NONE);
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
            <br />
          </Grid>
        ))}
        {index === POSITION_STATUS.CREATE && (
          <>
            <TextField
              fullWidth
              size="small"
              primary
              name="Positions"
              variant="outlined"
              value={form}
              onChange={e => setForm(e.target.value)}
            />
          </>
        )}
        {index === POSITION_STATUS.CREATE && (
          <Box mt={1}>
            <Button
              variant="contained"
              disabled={!form}
              onClick={() => {
                setIndex(POSITION_STATUS.NONE);
                addPosition(topicIndex, form);
              }}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="text"
              onClick={() => {
                setIndex(POSITION_STATUS.NONE);
              }}
            >
              Close
            </Button>
          </Box>
        )}
        {index === POSITION_STATUS.NONE && (
          <IconButton
            color="secondary"
            onClick={() => {
              setIndex(POSITION_STATUS.CREATE);
              setForm('');
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={12}>
        <hr />
      </Grid>
    </React.Fragment>
  );
}
AdminIssueTopic.propTypes = {
  addPosition: PropTypes.func,
  updatePosition: PropTypes.func,
  deletePosition: PropTypes.func,
  issue: PropTypes.object,
  topic: PropTypes.string,
  topicIndex: PropTypes.number,
  deleteTopic: PropTypes.func,
  updateTopic: PropTypes.func,
};
function AdminIssueTopicsWrapper({
  createCallback,
  topics,
  editCallback,
  deleteCallback,
}) {
  const [issueTopics, setIssueTopics] = useState([]);
  const [newTopic, setNewTopic] = useState(null);
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
    setNewTopic(null);
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
          {newTopic !== null && (
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
          {newTopic !== null && (
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
                  setNewTopic(null);
                }}
              >
                Close
              </Button>
            </Box>
          )}
          {newTopic === null && (
            <IconButton
              color="secondary"
              size="medium"
              onClick={() => setNewTopic('')}
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
