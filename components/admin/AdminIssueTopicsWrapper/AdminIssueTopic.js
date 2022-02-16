/**
 *
 * AdminIssueTopic
 *
 */

import React, { useState } from 'react';
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
          <Grid item container alignItems="center" key={pIndex}>
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
          </>
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

export default AdminIssueTopic;
