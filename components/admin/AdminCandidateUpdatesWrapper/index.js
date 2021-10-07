/**
 *
 * AdminCandidateUpdatesWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import { BsTrash } from 'react-icons/bs';
import TextField from '@material-ui/core/TextField';

import CandidateTopMenu from '../CandidateTopMenu';
import { Body13, H2 } from '../../shared/typogrophy';
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

function AdminCandidateUpdatesWrapper({
  candidate,
  saveCallback,
  deleteCallback,
  createCallback,
}) {
  const [editUpdate, setEditUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [editedUpdate, setEditedUpdate] = useState({});
  const [newUpdate, setNewUpdate] = useState(false);
  const updates = candidate?.updatesList || [];

  const handleSetEdit = update => {
    setEditUpdate(update);
    setEditedUpdate({
      id: update.id,
      date: update.date,
      text: update.text,
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
    saveCallback(editedUpdate, candidate.id);
    handleCancelEdit();
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
      date: '',
      text: '',
    });
  };

  const handleCancelNew = () => {
    setNewUpdate(false);
  };

  const handleCreate = () => {
    createCallback(newUpdate, candidate.id);
    handleCancelNew();
  };

  return (
    <AdminPageWrapper>
      <Wrapper>
        <CandidateTopMenu candidate={candidate} />
        <br />
        <div className="text-right">
          <PurpleButton onClick={handleNewUpdate} disabled={!!newUpdate}>
            &nbsp;&nbsp;Add a new Update&nbsp;&nbsp;
          </PurpleButton>
        </div>
        <H2>Candidate Updates</H2>
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
              label="date"
              variant="outlined"
              value={newUpdate.date}
              onChange={e => onChangeFieldNew(e.target.value, 'date')}
            />
            <br />
            <br />
            <JoditEditorWrapper
              onChangeCallback={value => onChangeFieldNew(value, 'text')}
              initialText={newUpdate.text}
            />
            <br />
            <br />
            <div className="text-center">
              <Cancel onClick={handleCancelNew}>Cancel</Cancel>
              <PurpleButton onClick={handleCreate}>
                &nbsp;Create&nbsp;
              </PurpleButton>
            </div>
          </EditUpdate>
        )}
        {updates.map(update => (
          <>
            {editUpdate && editUpdate.id === update.id ? (
              <EditUpdate>
                <Input
                  label="date"
                  fullWidth
                  variant="outlined"
                  value={editedUpdate.date || ''}
                  onChange={e => onChangeField(e.target.value, 'date')}
                />
                <br />
                <br />
                <JoditEditorWrapper
                  onChangeCallback={value => onChangeField(value, 'text')}
                  initialText={editedUpdate.text}
                />
                <br />
                <br />
                <div className="text-center">
                  <Cancel onClick={handleCancelEdit}>Cancel</Cancel>
                  <PurpleButton onClick={handleSave}>Save</PurpleButton>
                </div>
              </EditUpdate>
            ) : (
              <Update key={update.id}>
                <div className="text-right">
                  <EditWrapper onClick={() => handleSetEdit(update)}>
                    <EditIcon />
                  </EditWrapper>
                  <EditWrapper onClick={() => setShowDeleteAlert(update.id)}>
                    <BsTrash style={{ color: 'red' }} />
                  </EditWrapper>
                </div>
                <strong>Date:</strong>
                <br />
                <Body13>{update.date}</Body13>
                <br />
                <br />
                <strong>update:</strong>
                <br />
                <Body13 dangerouslySetInnerHTML={{ __html: update.text }} />
              </Update>
            )}
          </>
        ))}
      </Wrapper>
      <AlertDialog
        open={showDeleteAlert}
        handleClose={handleCloseAlert}
        title="Delete Update"
        ariaLabel="Delete Update"
        description="Are you sure you want to delete this update?"
        handleProceed={handleDeleteUpdate}
      />
    </AdminPageWrapper>
  );
}

AdminCandidateUpdatesWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  saveCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  createCallback: PropTypes.func,
};

export default AdminCandidateUpdatesWrapper;
