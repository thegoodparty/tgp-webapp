/**
 *
 * AddCampaignUpdateModal
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';
import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import Modal from '../../shared/Modal';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { FontH3 } from '../../shared/typogrophy';
import JoditEditorWrapper from '../../admin/shared/JoditEditor';
import YouTubeLazyPlayer from '../../shared/YouTubeLazyPlayer';
import YouTubeInput from '../../shared/YouTubeInput';

const Inner = styled.div`
  max-width: 820px;
  width: 90vw;
  background-color: #fff;
  padding: 48px;
  border-radius: 16px;
  max-height: 90vh;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Cancel = styled.span`
  cursor: pointer;
  display: inline-block;
  margin-right: 32px;
`;

const BottomLinksWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const BottomLink = styled.span`
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
`;

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 20px;
  min-height: 50vh;
  font-size: 36px;
  font-weight: 700;
  position: relative;
`;

const SuccessLogo = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
`;

const initialState = {
  isOpen: false,
  showVideo: false,
  showSuccess: false,
  title: '',
  date: '',
  text: '',
  youtubeId: '',
  image: '',
};

function AddCampaignUpdateModal({
  context,
  editUpdate,
  closeModalCallback = () => {},
}) {
  const { candidate, newUpdateCallback, editUpdateCallback } =
    useContext(context);
  const { id } = candidate;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (editUpdate) {
      setState({
        isOpen: true,
        title: editUpdate.title || '',
        date: editUpdate.date || '',
        text: editUpdate.text || '',
        youtubeId: editUpdate.youtubeId || '',
        image: editUpdate.image || '',
        showVideo: !!editUpdate.youtubeId,
      });
    } else {
      setState(initialState);
    }
  }, [editUpdate]);

  const onChangeField = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const closeModal = () => {
    onChangeField('isOpen', false);
    closeModalCallback();
  };

  const canPublish =
    state.title !== '' &&
    state.date !== '' &&
    (state.youtubeId == '' || state.youtubeId.length === 11);

  const publish = () => {
    const newState = { ...state };
    delete newState.showVideo;
    delete newState.isOpen;
    delete newState.showSuccess;
    if (editUpdate) {
      newState.id = editUpdate.id;
      editUpdateCallback(id, newState);
    } else {
      newUpdateCallback(candidate, newState);
    }
    onChangeField('showSuccess', true);
    setTimeout(() => {
      setState(initialState);
    }, 3000);
  };

  const handleYoutubeInput = (url, youtubeId) => {
    if (youtubeId) {
      onChangeField('youtubeId', youtubeId);
    } else {
      onChangeField('youtubeId', '');
    }
  };

  return (
    <>
      <BlackButton onClick={() => onChangeField('isOpen', true)}>
        <InnerButton>Add Campaign Update</InnerButton>
      </BlackButton>
      <Modal
        open={state.isOpen}
        closeModalCallback={closeModal}
        showCloseButton={false}
      >
        <Inner>
          {state.showSuccess ? (
            <Success>
              <div>🎉</div>

              <div style={{ margin: '24px 0' }}>Nice job!</div>
              <SuccessLogo>
                <img src="/images/new-logo.svg" alt="The Good Party" />
              </SuccessLogo>
            </Success>
          ) : (
            <>
              <Row>
                <FontH3 style={{ margin: 0 }}>
                  {editUpdate ? 'Edit' : 'New'} Campaign Update
                </FontH3>
                <div className="text-right">
                  <Cancel onClick={closeModal}>Cancel</Cancel>
                  <BlackButton onClick={publish} disabled={!canPublish}>
                    <InnerButton>
                      {editUpdate ? 'Update' : 'Publish'}
                    </InnerButton>
                  </BlackButton>
                </div>
              </Row>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    name="title"
                    variant="outlined"
                    label="Title for your update"
                    value={state.title}
                    fullWidth
                    inputProps={{
                      maxLength: 50,
                    }}
                    onChange={(e) => {
                      onChangeField('title', e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    name="date"
                    variant="outlined"
                    value={state.date}
                    fullWidth
                    type="date"
                    onChange={(e) => {
                      onChangeField('date', e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  What&apos;s your update?
                  <br />
                  <TextField
                    style={{ marginTop: '8px' }}
                    name="text"
                    variant="outlined"
                    value={state.text}
                    inputProps={{
                      maxLength: 400,
                    }}
                    required
                    multiline
                    rows={4}
                    fullWidth
                    onChange={(e) => {
                      onChangeField('text', e.target.value);
                    }}
                  />
                </Grid>
                {state.showVideo && (
                  <>
                    <Grid item xs={state.youtubeId ? 6 : 12}>
                      <YouTubeInput
                        onChangeCallback={handleYoutubeInput}
                        initalId={state.youtubeId}
                      />
                    </Grid>
                    <Grid item xs={state.youtubeId ? 6 : 12}>
                      <YouTubeLazyPlayer id={state.youtubeId} />
                    </Grid>
                  </>
                )}{' '}
                {state.image && (
                  <Grid item xs={6}>
                    <img src={state.image} className="full-image" />
                    <br />
                    <BottomLink onClick={() => onChangeField('image', '')}>
                      Remove Image
                    </BottomLink>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <BottomLinksWrapper>
                    {!state.showVideo && (
                      <BottomLink
                        onClick={() => onChangeField('showVideo', true)}
                        style={{ marginRight: '30px' }}
                      >
                        Add Video
                      </BottomLink>
                    )}
                    {!state.image && (
                      <ImageUploadContainer
                        uploadCallback={(image) =>
                          onChangeField('image', image)
                        }
                        customElement={<BottomLink>Add Image</BottomLink>}
                      />
                    )}
                  </BottomLinksWrapper>
                </Grid>
              </Grid>
            </>
          )}
        </Inner>
      </Modal>
    </>
  );
}

export default AddCampaignUpdateModal;
