/**
 *
 * Update
 *
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';

import { EndorsementsContext } from '/containers/candidate-portal/PortalEndorsementsPage';
import NewEndorsementForm from './NewEndorsementForm';

const Wrapper = styled.div`
  padding: 30px 0;
  border-bottom: 1px solid #e8e8e8;
  &.no-border {
    border-bottom: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  img {
    object-fit: cover;
    object-position: center center;
    height: 200px;
  }
`;

const Title = styled.div`
  font-weight: 900;
  margin-bottom: 16px;
  color: #000;
`;

const DeleteWrapper = styled.div`
  text-align: right;
`;

const Delete = styled.div`
  display: inline-block;
  color: #636363;
  text-decoration: underline;
  cursor: pointer;
  padding: 12px 8px;
`;

function Endorsement({ endorsement, last, deleteCallback }) {
  const [showEdit, setShowEdit] = useState(false);
  const { summary, id, image, link, title } = endorsement;
  const { editEndorsementCallback, candidate } =
    useContext(EndorsementsContext);

  const handleUpdate = (updated) => {
    editEndorsementCallback(updated, candidate.id);
    setShowEdit(false);
  };

  return (
    <Wrapper key={id} className={`break-word ${last && 'no-border'}`} data-cy="endorsement-item">
      <DeleteWrapper>
        {showEdit ? (
          <Delete onClick={() => setShowEdit(false)} data-cy="endorsement-edit-cancel">Cancel</Delete>
        ) : (
          <>
            <Delete onClick={() => deleteCallback(endorsement)} data-cy="endorsement-edit-delete">Delete</Delete>
            <Delete onClick={() => setShowEdit(true)} data-cy="endorsement-edit">Edit</Delete>
          </>
        )}
      </DeleteWrapper>
      <Grid container spacing={3}>
        {image && (
          <Grid item xs={12} md={4}>
            <ImageWrapper>
              <Image src={image} layout="fill" alt="" />
            </ImageWrapper>
          </Grid>
        )}
        <Grid item xs={12} md={image ? 8 : 12} data-cy="endorsement-info">
          <Title>{title}</Title>
          {summary}
          <br />
          {link}
        </Grid>
      </Grid>
      {showEdit && (
        <NewEndorsementForm
          existingEndorsement={endorsement}
          updateEndorsementCallback={handleUpdate}
        />
      )}
    </Wrapper>
  );
}

Endorsement.propTypes = {
  endorsement: PropTypes.object,
  last: PropTypes.bool,
  deleteCallback: PropTypes.func,
};

export default Endorsement;
