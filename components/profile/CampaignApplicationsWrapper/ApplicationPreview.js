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

import { dateUsHelper } from 'helpers/dateHelper';

import { Body, Body13, Body11 } from '../../shared/typogrophy';

const ApplicationWrapper = styled.div`
  padding: 20px;
  background: #fff;
  border-top: 3px solid ${({ theme }) => theme.colors.purple};
  border-radius: 6px;
  cursor: pointer;
  overflow-wrap: break-word;
  box-shadow: 0 20px 20px -10px #a3a5ae;
  text-align: center;
  &.red {
    border-color: #cc3366;
    .trash {
      color: #cc3366;
    }
  }
`;
const PhotoWrapper = styled.div`
  display: block;
  width: 130px;
  height: 130px;
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto 12px;
  border: solid 2px ${({ theme }) => theme.colors.purple};
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

function candidateName(app) {
  let name = 'n/a';
  let { data } = app;
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
  }
  if (data.candidate) {
    name = `${data.candidate.firstName} ${data.candidate.lastName}`;
  }
  return name;
}

function candidatePhoto(app) {
  let { data } = app;
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
  }
  return data?.campaign?.photos?.headshot || false;
}

function runningFor(app) {
  let { data } = app;
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
  }
  if (data?.campaign && data.campaign['running for']) {
    return `Running for ${data.campaign['running for']}`;
  }
  return 'No office specified';
}

function ApplicationPreview({ app, deleteApplicationCallback }) {
  const photo = candidatePhoto(app);
  return (
    <Link href={`/campaign-application/${app.id}/1`} passHref>
      <a>
        <ApplicationWrapper
          className={app.status === 'in review' ? 'purple' : 'red'}
        >
          {app.status === 'incomplete' ? (
            <div className="text-right trash">
              <FaTrash onClick={e => deleteApplicationCallback(app.id, e)} />
            </div>
          ) : (
            <div>&nbsp;</div>
          )}
          <PhotoWrapper>
            <Photo
              style={{
                backgroundImage: `url(${photo ||
                  '/images/profile/application-selected.png'})`,
              }}
            />
          </PhotoWrapper>
          <Body>
            <strong>{candidateName(app)}</strong>
          </Body>
          <Body13>{runningFor(app)}</Body13>
          <br />
          <Body className="bold500">
            <i>Status: {app.status}</i>
          </Body>
          <br />
          <Body11>
            Created At: {dateUsHelper(app.createdAt)}
            <br />
            Last Update: {dateUsHelper(app.updatedAt)}
          </Body11>
        </ApplicationWrapper>
      </a>
    </Link>
  );
}

ApplicationPreview.propTypes = {
  app: PropTypes.object,
  deleteApplicationCallback: PropTypes.func,
};

export default ApplicationPreview;
