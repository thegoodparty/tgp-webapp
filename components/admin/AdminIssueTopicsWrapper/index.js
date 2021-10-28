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
import { makeStringId } from 'helpers/stringHelper';
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
  const [index, setIndex] = useState(null);
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
                      setIndex(null);
                      updatePosition(topicIndex, form, pIndex);
                    }}
                  >
                    Save
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="text"
                    onClick={() => {
                      setIndex(null);
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
        {index === -1 && (
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
        {index === -1 && (
          <Box mt={1}>
            <Button
              variant="contained"
              disabled={!form}
              onClick={() => {
                setIndex(null);
                addPosition(topicIndex, form);
              }}
            >
              Save
            </Button>
            &nbsp;&nbsp;
            <Button
              variant="text"
              onClick={() => {
                setIndex(null);
              }}
            >
              Close
            </Button>
          </Box>
        )}
        {index === null && (
          <IconButton
            color="secondary"
            onClick={() => {
              setIndex(-1);
              setForm('');
            }}
          >
            <AddIcon />
          </IconButton>
        )}

        {/* <TextField
          fullWidth
          name="Positions"
          variant="outlined"
          value={issueTopics[issue]}
          onChange={e => addPosition(issue, e.target.value)}
        /> */}
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
    // setIssueTopics({
    //   HealthCare: [
    //     'Free Market Healthcare',
    //     'Medicare for all',
    //     'Public Option',
    //   ],
    //   Guns: ['Defend 2nd Amendment', 'Ban All guns', 'Sensible Gun Control'],
    //   Taxiation: ['Tax the Rich', 'Cut Taxes for Everyone', 'Flat Tax'],
    // });
  }, [topics]);

  const addPosition = (topicIndex, position) => {
    const oldAdminIssueTopics = [...issueTopics];
    oldAdminIssueTopics[topicIndex].positions.push({
      id: makeStringId(10),
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

          {/* <Grid item xs={12}>
              <PurpleButton onClick={() => updateUgcCallback(ugc)} fullWidth>
                SAVE
              </PurpleButton>
            </Grid> */}
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
