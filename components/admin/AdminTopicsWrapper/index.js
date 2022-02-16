/**
 *
 * AdminTopicsWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FaSave } from 'react-icons/fa';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Nav from '/containers/shared/Nav';
import { Body, H2 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Header = styled(Body)`
  background-color: #eee;
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  background-color: #f8f8f8;
  padding: 0.5rem;
`;

const initialState = {
  name: '',
  description: '',
};

function AdminTopicsWrapper({
  createCallback,
  topics,
  editCallback,
  topicsFeedback,
  deleteCallback,
}) {
  const [state, setState] = useState(initialState);
  const [editTopic, setEditTopic] = useState(false);
  const [feedbackByTopic, setFeedbackByTopic] = useState({});
  useEffect(() => {
    if (topicsFeedback) {
      const feedbackByTopicObj = {};
      topics.map(topic => {
        feedbackByTopicObj[topic.id] = {
          helpful: 0,
          notHelpful: 0,
        };
      });
      topicsFeedback.map(feedback => {
        if (!feedbackByTopicObj[feedback.topicId]) {
          feedbackByTopicObj[feedback.topicId] = {
            helpful: 0,
            notHelpful: 0,
          };
        }
        if (feedback.isHelpful) {
          feedbackByTopicObj[feedback.topicId].helpful++;
        } else {
          feedbackByTopicObj[feedback.topicId].notHelpful++;
        }
        setFeedbackByTopic(feedbackByTopicObj);
      });
    }
  }, [topicsFeedback]);
  const onChangeField = (key, e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const onChangeEdit = (key, e) => {
    setEditTopic({
      ...editTopic,
      [key]: e.target.value,
    });
  };

  const handleCreate = () => {
    createCallback(state.name, state.description);
    setState(initialState);
  };

  const canSave = () => state.name !== '' && state.description !== '';

  const handleEdit = () => {
    editCallback(editTopic);
    setEditTopic(false);
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <br />
        <H2 className="text-center">Admin Topics</H2>

        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Header>Name</Header>
          </Grid>
          <Grid item xs={4}>
            <Header>Description</Header>
          </Grid>
          <Grid item xs={2}>
            <Header>Helpful</Header>
          </Grid>
          <Grid item xs={2}>
            <Header>Not Helpful</Header>
          </Grid>
          <Grid item xs={1}>
            <Header>Actions</Header>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={state.name}
              onChange={e => onChangeField('name', e)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Description"
              multiline
              rows={3}
              onChange={e => onChangeField('description', e)}
              value={state.description}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={1} style={{ alignSelf: 'center' }}>
            <PurpleButton
              fullWidth
              disabled={!canSave()}
              onClick={handleCreate}
            >
              <FaSave size={24} />
            </PurpleButton>
          </Grid>
          {topics &&
            topics.map(topic => (
              <React.Fragment key={topic.id}>
                <>
                  {editTopic.id === topic.id ? (
                    <>
                      <Grid item xs={3}>
                        <Field>
                          <Body>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Name"
                              value={editTopic.name}
                              onChange={e => onChangeEdit('name', e)}
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={4}>
                        <Field>
                          <Body>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Description"
                              multiline
                              rows={3}
                              onChange={e => onChangeEdit('description', e)}
                              value={editTopic.description}
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{feedbackByTopic[topic.id]?.helpful}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{feedbackByTopic[topic.id]?.notHelpful}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={1} style={{ alignSelf: 'center' }}>
                        <div className="text-center">
                          <FaSave size={18} onClick={handleEdit} />
                        </div>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={3}>
                        <Field>
                          <Body>{topic.name}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={4}>
                        <Field>
                          <Body>{topic.description}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{feedbackByTopic[topic.id]?.helpful}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{feedbackByTopic[topic.id]?.notHelpful}</Body>
                        </Field>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        style={{ alignSelf: 'center', cursor: 'pointer' }}
                      >
                        <div className="text-center">
                          <EditIcon onClick={() => setEditTopic(topic)} />{' '}
                          &nbsp;
                          <DeleteIcon
                            onClick={() => {
                              deleteCallback(topic.id);
                            }}
                          />
                        </div>
                      </Grid>
                    </>
                  )}
                </>
              </React.Fragment>
            ))}
        </Grid>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminTopicsWrapper.propTypes = {
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  topics: PropTypes.array,
  topicsFeedback: PropTypes.array,
};

export default AdminTopicsWrapper;
