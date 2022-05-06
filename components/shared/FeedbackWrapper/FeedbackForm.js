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
import BlackButton from '../buttons/BlackButton';

const FormWrapper = styled.form`
  padding: 40px 20px;
  background-color: #fff;
  width: 80vw;
  max-width: 600px;
  border: solid 2px #000;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);

  .dv-star-rating-empty-star .heart-star {
    opacity: 0.4;

    &:hover {
      opacity: 0.6;
    }
  }
`;

const StarsWrapper = styled.div`
  font-size: 24px;
  i {
    margin-left: 5px;
  }
`;

const InnerButton = styled.div`
  padding: 0 20px;
`;

const CHARACTER_LIMIT = 1000;

function FeedbackForm({ closeCallback, sendFeedbackCallback }) {
  const [formState, setFormState] = useState({
    stars: 0,
    suggestion: '',
  });
  const onStarClick = (nextValue) => {
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

  const canSubmit = () => formState.suggestion !== '';

  const submitForm = () => {
    sendFeedbackCallback(
      formState.stars,
      formState.suggestion,
    );
    closeCallback();
    setFormState({
      stars: 0,
      suggestion: '',
    });
  };

  return (
    <Modal open closeModalCallback={closeCallback} showCloseButton={false}>
      <FormWrapper>
        <H3>
          <strong>Please let us know your thoughts about Good Party</strong>
        </H3>
        <br />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Body>
              How do you feel about our plans to{' '}
              <strong>
                Fuck{' '}
                <u>
                  <i>It</i>
                </u>
                !
              </strong>{' '}
              (with a #goodparty)?
            </Body>
          </Grid>
          <Grid item xs={12} md={3}>
            <StarsWrapper>
              <StarRatingComponent
                name="stars"
                onStarClick={onStarClick}
                value={formState.stars}
              />
            </StarsWrapper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              placeholder="Type your suggestion here, please give as much detail as you can. *"
              rows={5}
              value={formState.suggestion}
              onChange={(e) => onChangeField('suggestion', e)}
              inputProps={{
                maxlength: CHARACTER_LIMIT,
              }}
              helperText={`${formState.suggestion.length}/${CHARACTER_LIMIT}`}
            />
          </Grid>
          <Grid item xs={12} className="text-right">
            <BlackButton className="outlined" onClick={closeCallback}>
              <InnerButton>Cancel</InnerButton>
            </BlackButton>
            <BlackButton
              style={{ marginLeft: '18px' }}
              disabled={!canSubmit()}
              onClick={submitForm}
            >
              <InnerButton>Send</InnerButton>
            </BlackButton>
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
