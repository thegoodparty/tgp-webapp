/**
 *
 * AdminCandidateUpdatesWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import { BsTrash } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import ImageUploadContainer from '/containers/shared/ImageUploadContainer';

import CandidateTopMenu from '../CandidateTopMenu';
import { Body13, H2, Body, H3 } from '../../shared/typogrophy';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import JoditEditorWrapper from '../AdminEditCandidate/JoditEditor';
import { PurpleButton } from '../../shared/buttons';
import AlertDialog from '../../shared/AlertDialog';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Update = styled.div`
  padding: 12px;
  border-bottom: solid 1px #eee;
  margin-top: 1rem;
  transition: background-color 0.4s;
  &:hover {
    background-color: #eee;
  }
`;

const EditUpdate = styled.div`
  padding: 12px;
  border: solid 1px #eee;
  margin-top: 1rem;
`;

const EditWrapper = styled.div`
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Input = styled(TextField)`
  && {
    margin-top: 2rem;
  }
`;

const Cancel = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 2px 8px;
  margin-right: 24px;
  color: ${({ theme }) => theme.colors.purple};
`;

const DeleteImage = styled.div`
  margin-top: 12px;
  color: red;
  cursor: pointer;
`;

const Pending = styled.div`
  font-size: 1.4rem;
  color: orange;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const WrapperElement = ({ adminPage, candidate, children }) => {
  return adminPage ? (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        {children}
      </Wrapper>
    </AdminPageWrapper>
  ) : (
    <div>{children}</div>
  );
};

function AdminCandidateUpdatesWrapper({
  candidate,
  saveCallback,
  deleteCallback,
  createCallback,
  approveUpdateCallback,
  adminPage = true,
}) {
  const [editUpdate, setEditUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [editedUpdate, setEditedUpdate] = useState({});
  const [newUpdate, setNewUpdate] = useState(false);
  const [updates, setUpdates] = useState([]);
  useEffect(() => {
    if (candidate?.updatesList) {
      setUpdates(candidate?.updatesList.reverse());
    }
  }, [candidate]);

  const handleSetEdit = update => {
    setEditUpdate(update);
    setEditedUpdate({
      id: update.id,
      date: update.date,
      text: update.text,
      title: update.title,
      youtubeId: update.youtubeId,
      image: update.image,
      start: update.start,
    });
  };

  const handleCancelEdit = () => {
    setEditUpdate(false);
    setEditedUpdate({});
  };

  const onChangeField = (val, key) => {
    setEditedUpdate({
      ...editedUpdate,
      [key]: val,
    });
  };

  const onChangeFieldNew = (val, key) => {
    setNewUpdate({
      ...newUpdate,
      [key]: val,
    });
  };

  const handleSave = () => {
    if(editedUpdate.title) {
      saveCallback(editedUpdate, candidate.id);
      handleCancelEdit();
    }
  };

  const handleCloseAlert = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteUpdate = () => {
    deleteCallback(showDeleteAlert, candidate.id);
    handleCloseAlert();
  };

  const handleNewUpdate = () => {
    setNewUpdate({
      title: '',
      date: '',
      text: '',
      image: '',
      start: 0,
    });
  };

  const handleCancelNew = () => {
    setNewUpdate(false);
  };

  const handleCreate = () => {
    if(newUpdate.title) {
      createCallback(newUpdate, candidate.id);
      handleCancelNew();
    }
  };

  const handleUploadImage = (image, isNewUpdate) => {
    if (image) {
      if (isNewUpdate) {
        setNewUpdate({
          ...newUpdate,
          image,
        });
      } else {
        setEditUpdate({
          ...editUpdate,
          image,
        });
        setEditedUpdate({
          ...editedUpdate,
          image,
        });
      }
    }
  };

  const handleRemoveEditImage = () => {
    setEditUpdate({
      ...editUpdate,
      image: '',
    });
    setEditedUpdate({
      ...editedUpdate,
      image: '',
    });
  };
  return (
    <WrapperElement candidate={candidate} adminPage={adminPage}>
      <>
        <br />
        <br />
        <PurpleButton onClick={handleNewUpdate} disabled={!!newUpdate}>
          <div style={{ padding: '0 32px' }}>Add a new Update</div>
        </PurpleButton>

        <br />
        <br />
        {newUpdate && (
          <EditUpdate>
            <div>
              <strong>New Update</strong>
            </div>
            <br />
            <Input
              fullWidth
              label="Title"
              variant="outlined"
              value={newUpdate.title}
              onChange={e => onChangeFieldNew(e.target.value, 'title')}
            />
            <br />
            <br />
            <Input
              fullWidth
              label="Date"
              type="date"
              variant="outlined"
              value={newUpdate.date || ''}
              onChange={e => onChangeFieldNew(e.target.value, 'date')}
              InputLabelProps={{ shrink: true }}
            />
            <br />
            <br />
            <JoditEditorWrapper
              onChangeCallback={value => onChangeFieldNew(value, 'text')}
              initialText={newUpdate.text}
            />
            <br />
            <br />
            <Input
              fullWidth
              label="YouTube Id"
              variant="outlined"
              value={newUpdate.youtubeId}
              onChange={e => onChangeFieldNew(e.target.value, 'youtubeId')}
            />
            <br />
            <br />
            {newUpdate.youtubeId &&
              <Input
                fullWidth
                label="YouTube Start time (seconds)"
                variant="outlined"
                type="number"
                value={newUpdate.start}
                onChange={e => {
                  if(e.target.value >= 0) {
                    onChangeFieldNew(e.target.value, 'start')
                  }
                }}
              />
            }
            <br />
            <br />
            <br />
            <strong>
              Update Image (in case the update doesn&apos;t have a youtube video)
            </strong>
            <br />
            <br />
            {newUpdate.image && newUpdate.image !== '' ? (
              <div>{newUpdate.image}</div>
            ) : (
              <ImageUploadContainer
                uploadCallback={image => handleUploadImage(image, true)}
              />
            )}

            <br />
            <div className="text-center">
              <Cancel onClick={handleCancelNew}>Cancel</Cancel>
              <PurpleButton disabled={!newUpdate.title} onClick={handleCreate}>
                &nbsp;{adminPage ? 'Create' : 'Submit'}&nbsp;
              </PurpleButton>
            </div>
          </EditUpdate>
        )}
        <br />
        <H3>Previous Updates</H3>
        <br />
        {([ ...updates ]).reverse().map(update => (
          <React.Fragment key={update.id}>
            {editUpdate && editUpdate.id === update.id ? (
              <EditUpdate>
                <Input
                  label="Title"
                  fullWidth
                  variant="outlined"
                  value={editedUpdate.title || ''}
                  onChange={e => onChangeField(e.target.value, 'title')}
                />
                <br />
                <br />
                <Input
                  label="date"
                  fullWidth
                  type="date"
                  variant="outlined"
                  value={editedUpdate.date || ''}
                  onChange={e => onChangeField(e.target.value, 'date')}
                />
                <br />
                <br />
                <Input
                  label="YouTube Id"
                  fullWidth
                  variant="outlined"
                  value={editedUpdate.youtubeId || ''}
                  onChange={e => onChangeField(e.target.value, 'youtubeId')}
                />
                <br />
                <br />
                {editedUpdate.youtubeId &&
                  <Input
                    label="YouTube Start time (seconds)"
                    fullWidth
                    variant="outlined"
                    value={editedUpdate.start}
                    type="number"
                    onChange={e => {
                      if(e.target.value >= 0) {
                        onChangeField(e.target.value, 'start')
                      }
                    }}
                  />
                }
                <br />
                <br />
                <JoditEditorWrapper
                  onChangeCallback={value => onChangeField(value, 'text')}
                  initialText={editedUpdate.text}
                />
                <br />
                <br />
                {editUpdate.image && editUpdate.image !== '' ? (
                  <div>
                    {editUpdate.image}
                    <br />
                    <br />
                    <DeleteImage onClick={handleRemoveEditImage}>
                      <BsTrash /> Delete Image
                    </DeleteImage>
                  </div>
                ) : (
                  <ImageUploadContainer
                    uploadCallback={image => handleUploadImage(image, false)}
                  />
                )}
                <br />
                <br />
                <div className="text-center">
                  <Cancel onClick={handleCancelEdit}>Cancel</Cancel>
                  <PurpleButton disabled={!editedUpdate.title} onClick={handleSave}>Save</PurpleButton>
                </div>
              </EditUpdate>
            ) : (
              <Update key={update.id}>
                {adminPage && (
                  <div className="text-right">
                    <EditWrapper onClick={() => handleSetEdit(update)}>
                      <EditIcon />
                    </EditWrapper>
                    <EditWrapper onClick={() => setShowDeleteAlert(update.id)}>
                      <BsTrash style={{ color: 'red' }} />
                    </EditWrapper>
                    {update.status === 'pending' && (
                      <EditWrapper
                        onClick={() => {
                          approveUpdateCallback(update.id, candidate.id);
                        }}
                      >
                        <IoMdCheckmarkCircleOutline
                          size={18}
                          style={{ color: 'orange' }}
                        />
                      </EditWrapper>
                    )}
                  </div>
                )}
                {update.status === 'pending' && (
                  <Pending>Pending Review</Pending>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <strong>Title:</strong>
                    <br />
                    <Body>{update.title}</Body>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <strong>Date:</strong>
                    <br />
                    <Body13>{update.date}</Body13>
                  </Grid>
                  <Grid item xs={12}>
                    <Body13 dangerouslySetInnerHTML={{ __html: update.text }} />
                  </Grid>
                  {update.youtubeId && update.youtubeId !== '' && (
                    <Grid item xs={12} md={6}>
                      <strong>YouTube Id:</strong>
                      <br />
                      <Body13>
                        {update.youtubeId} &nbsp; &nbsp; Start: {update.start}
                      </Body13>
                      <br />
                      <LiteYouTubeEmbed
                        id={update.youtubeId}
                        height="250px"
                        params={`start=${update.start}`}
                      />
                    </Grid>
                  )}
                  {update.image && update.image !== '' && (
                    <Grid item xs={12} md={6} style={{paddingTop: 70}}>
                      <div
                        style={{
                          backgroundImage: `url(${update.image})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          height: '100%'
                        }}
                      >

                      </div>
                      {/* <img
                        src={update.image}
                        className="full-image"
                        style={{ marginTop: 62 }}
                      /> */}
                    </Grid>
                  )}
                </Grid>
              </Update>
            )}
          </React.Fragment>
        ))}
      </>
      <AlertDialog
        open={showDeleteAlert}
        handleClose={handleCloseAlert}
        title="Delete Update"
        ariaLabel="Delete Update"
        description="Are you sure you want to delete this update?"
        handleProceed={handleDeleteUpdate}
      />
    </WrapperElement>
  );
}

AdminCandidateUpdatesWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  createCallback: PropTypes.func,
  approveUpdateCallback: PropTypes.func,
  adminPage: PropTypes.bool,
};

export default AdminCandidateUpdatesWrapper;
