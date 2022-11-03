/**
 *
 * ApplicationPreview
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

import { dateUsHelper } from '/helpers/dateHelper';

import { Body, Body13, Body11 } from '../../shared/typogrophy';
import {
  candidateName,
  candidatePhoto,
  runningFor,
} from '/helpers/applicationHelper';

const ApplicationWrapper = styled.div`
  padding: 20px;
  background: #fff;
  border-top: 3px solid #000;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 20px 20px -10px #a3a5ae;
  text-align: center;
  margin-bottom: 10px;
`;
const PhotoWrapper = styled.div`
  display: block;
  width: 130px;
  height: 130px;
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto 12px;
  border: solid 2px #000;
`;

const Photo = styled.div`
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;
function ApplicationPreview({ app, deleteApplicationCallback }) {
  const photo = candidatePhoto(app);
  return (
    <Link
      href={`/campaign-application/${app.id}/1`}
      className="no-underline"
      data-cy="application-link"
    >
      <ApplicationWrapper className="break-word">
        {app.status === 'incomplete' ? (
          <div className="text-right trash">
            <FaTrash
              onClick={(e) => deleteApplicationCallback(app.id, e)}
              color="red"
            />
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        <PhotoWrapper>
          <Photo
            style={{
              backgroundImage: `url(${
                photo || '/images/profile/application.png'
              })`,
            }}
          />
        </PhotoWrapper>
        <Body data-cy="application-name">
          <strong>{candidateName(app)}</strong>
        </Body>
        <Body13 data-cy="application-runfor">{runningFor(app)}</Body13>
        <br />
        <Body className="bold500" data-cy="application-status">
          <i>Status: {app.status}</i>
        </Body>
        <br />
        <Body11 data-cy="application-date">
          Created At: {dateUsHelper(app.createdAt)}
          <br />
          Last Update: {dateUsHelper(app.updatedAt)}
        </Body11>
      </ApplicationWrapper>
    </Link>
  );
}

ApplicationPreview.propTypes = {
  app: PropTypes.object,
  deleteApplicationCallback: PropTypes.func,
};

export default ApplicationPreview;
