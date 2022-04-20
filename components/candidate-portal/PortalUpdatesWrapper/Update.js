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

import { PortalUpdatesPageContext } from '/containers/candidate-portal/CandidatePortalUpdatesPage';
import { dateUsHelper } from '/helpers/dateHelper';
import YouTubeLazyPlayer from '/components/shared/YouTubeLazyPlayer';
import { Font16 } from '/components/shared/typogrophy';
import { candidateRoute } from '/helpers/electionsHelper';
import AlertDialog from '../../shared/AlertDialog';

const Wrapper = styled.div`
  padding: 30px 0;
  border-bottom: 1px solid #e8e8e8;

  &.no-border {
    border-bottom: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Edit = styled.div`
  color: #636363;
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
  margin-left: 18px;
`;

const UpdateDate = styled.div`
  font-size: 13px;
  margin-bottom: 15px;
  color: #636363;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  img {
    object-fit: cover;
    object-position: center center;
  }
`;

const Title = styled.div`
  font-weight: 900;
  margin-bottom: 16px;
  color: #000;
`;

const Text = styled(Font16)`
  line-height: 33px;
  overflow-wrap: break-word;
`;

function Update({ update, last, editCallback, deleteCallback }) {
  const { candidate } = useContext(PortalUpdatesPageContext);

  const { date, id, image, text, title, youtubeId } = update;
  const hasMedia = image || youtubeId;

  return (
    <Wrapper key={id} className={last && 'no-border'}>
      <Row>
        <UpdateDate>{dateUsHelper(date)}</UpdateDate>
        <div>
          <Edit onClick={() => deleteCallback(update)}>Delete</Edit>
          <Edit onClick={() => editCallback(update)}>Edit</Edit>
        </div>
      </Row>
      <Grid container spacing={3}>
        {hasMedia && (
          <Grid item xs={12} md={4}>
            {youtubeId ? (
              <YouTubeLazyPlayer
                id={update.youtubeId}
                // params={`start=${update.start}`}
                height="200px"
              />
            ) : (
              <ImageWrapper>
                <Image src={update.image} layout="fill" height="200px" alt="" />
              </ImageWrapper>
            )}
          </Grid>
        )}
        <Grid item xs={12} md={hasMedia ? 8 : 12}>
          <a
            href={`${candidateRoute(candidate)}#candidate-update-${id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Title>{title}</Title>
          </a>
          <Text dangerouslySetInnerHTML={{ __html: text }} />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

Update.propTypes = {
  update: PropTypes.object,
  last: PropTypes.bool,
  editCallback: PropTypes.func,
};

export default Update;
