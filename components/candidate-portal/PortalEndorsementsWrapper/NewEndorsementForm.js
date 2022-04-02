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
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 250px;
  height: auto;
`;

const UploadWrapper = styled.div`
  border: solid 1px rgb(0, 0, 0, 0.2);
  border-radius: 4px;
  line-height: 1.1876em;
  padding: 18.5px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Upload = styled.div`
  text-decoration: underline;
`;

const Inner = styled.div`
  width: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 60%;
  }
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
      <Inner>
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
          {state.image ? (
            <>
              Endorsement Image
              <br />
              <Img src={state.image} />
            </>
          ) : (
            <UploadWrapper>
              <div>Endorsement Image</div>
              <ImageUploadContainer
                uploadCallback={(image) => handleUploadImage(image)}
                customElement={<Upload>Uplaod</Upload>}
              />
            </UploadWrapper>
          )}
          <br />
          <br />
          <div className="text-right">
            <BlackButton disabled={!canSubmit()} onClick={onSave} type="submit">
              <InnerButton>Save</InnerButton>
            </BlackButton>
          </div>
        </form>
      </Inner>
    </Wrapper>
  );
}

NewEndorsementForm.propTypes = {};

export default NewEndorsementForm;
