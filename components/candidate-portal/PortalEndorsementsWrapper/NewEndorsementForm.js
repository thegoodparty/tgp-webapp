/**
 *
 * NewEndorsementForm
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { EndorsementsContext } from '/containers/candidate-portal/PortalEndorsementsPage';
import { isValidUrl } from '/helpers/linkHelper';
import ImageUploadContainer from '/containers/shared/ImageUploadContainer';
import { PurpleButton } from '../../shared/buttons';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 250px;
  height: auto;
`;

const initialState = {
  title: '',
  summary: '',
  link: '',
  image: '',
};
function NewEndorsementForm({ closeAdd }) {
  const { id, addEndorsementCallback } = useContext(EndorsementsContext);
  const [state, setState] = useState(initialState);

  const onChangeField = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onSave = () => {
    addEndorsementCallback(
      id,
      state.title,
      state.summary,
      state.link,
      state.image,
    );
    setState(initialState);
    closeAdd();
  };

  const canSubmit = () =>
    state.summary !== '' &&
    state.title !== '' &&
    (state.link === '' || isValidUrl(state.link));

  const handleUploadImage = (image) => {
    if (image) {
      setState({
        ...state,
        image,
      });
    }
  };
  return (
    <Wrapper>
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          onChange={(e) => onChangeField('title', e.target.value)}
          value={state.title}
        />
        <br />
        <br />
        <TextField
          fullWidth
          variant="outlined"
          label="Summary"
          multiline
          rows={3}
          onChange={(e) => onChangeField('summary', e.target.value)}
          value={state.summary}
        />
        <br />
        <br />
        <TextField
          fullWidth
          variant="outlined"
          label="Link"
          onChange={(e) => onChangeField('link', e.target.value)}
          value={state.link}
        />
        <br />
        <br />
        Endorsement Image (small)
        <br />
        {state.image ? (
          <Img src={state.image} />
        ) : (
          <ImageUploadContainer
            uploadCallback={(image) => handleUploadImage(image)}
          />
        )}
        <br />
        <br />
        <div className="text-right">
          <PurpleButton disabled={!canSubmit()} onClick={onSave} type="submit">
            &nbsp; Save &nbsp;
          </PurpleButton>
        </div>
      </form>
    </Wrapper>
  );
}

NewEndorsementForm.propTypes = {};

export default NewEndorsementForm;
