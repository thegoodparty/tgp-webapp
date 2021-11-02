/**
 *
 * FeedbackForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StarRatingComponent from 'react-star-rating-component';
import Select from '@material-ui/core/Select';

import Modal from '../Modal';
import { Body, H3 } from '../typogrophy';
import { OutlinedButton, PurpleButton } from '../buttons';

const FormWrapper = styled.form`
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 8px;
  width: 80vw;
  max-width: 900px;
  border: solid 2px ${({ theme }) => theme.colors.purple};
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);

  .dv-star-rating-empty-star .heart-star {
    opacity: 0.4;

    &:hover {
      opacity: 0.6;
    }
  }
`;

const Logo = styled.img`
  margin-right: 8px;
  width: 30px;
  height: auto;
`;

const InnerButton = styled.div`
  padding: 0 20px;
`;

const feedbackTypes = ['Bug Report', 'Feature Request', 'Question', 'Other'];
const CHARACTER_LIMIT = 1000;

function FeedbackForm({ closeCallback, sendFeedbackCallback }) {
  const [formState, setFormState] = useState({
    stars: 0,
    feedbackType: '',
    suggestion: '',
  });
  const onStarClick = nextValue => {
    setFormState({
      ...formState,
      stars: nextValue,
    });
  };

  const onChangeField = (key, e) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  const canSubmit = () =>
    formState.feedbackType !== '' &&
    formState.suggestion !== '' &&
    formState.stars > 0;

  const submitForm = () => {
    sendFeedbackCallback(
      formState.stars,
      formState.feedbackType,
      formState.suggestion,
    );
    closeCallback();
    setFormState({
      stars: 0,
      feedbackType: '',
      suggestion: '',
    });
  };

  return (
    <Modal open closeModalCallback={closeCallback} showCloseButton={false}>
      <FormWrapper>
        <H3>
          <strong>
            Please let us know your thoughts and how we can improve
          </strong>
        </H3>
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={6} md={5}>
            <Body>How do you feel about Good Party right now?</Body>
          </Grid>
          <Grid item xs={6} md={7}>
            <StarRatingComponent
              name="stars"
              renderStarIcon={() => (
                <Logo src="/images/heart.svg" alt="" className="heart-star" />
              )}
              onStarClick={onStarClick}
              value={formState.stars}
            />
          </Grid>
          <Grid item xs={6} md={5}>
            <Body>Feedback Type*</Body>
          </Grid>
          <Grid item xs={6} md={7}>
            <Select
              fullWidth
              variant="outlined"
              native
              onChange={e => onChangeField('feedbackType', e)}
              value={formState.feedbackType}
            >
              <option value="">Suggestion</option>
              {feedbackTypes.map(type => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              label="Type your suggestion here, please give as much detail as you can. *"
              rows={5}
              value={formState.suggestion}
              onChange={e => onChangeField('suggestion', e)}
              inputProps={{
                maxlength: CHARACTER_LIMIT,
              }}
              helperText={`${formState.suggestion.length}/${CHARACTER_LIMIT}`}
            />
          </Grid>
          <Grid item xs={12} className="text-right">
            <PurpleButton className="outline" onClick={closeCallback}>
              <InnerButton>Cancel</InnerButton>
            </PurpleButton>
            <PurpleButton
              style={{ marginLeft: '18px' }}
              disabled={!canSubmit()}
              onClick={submitForm}
            >
              <InnerButton>Send</InnerButton>
            </PurpleButton>
          </Grid>
        </Grid>
      </FormWrapper>
    </Modal>
  );
}

FeedbackForm.propTypes = {
  closeCallback: PropTypes.func,
  sendFeedbackCallback: PropTypes.func,
};

export default FeedbackForm;
