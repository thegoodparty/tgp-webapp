/**
 *
 * AdminTopIssueRequestsWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { candidateRoute } from '/helpers/electionsHelper';

import RequestTopTab from './RequestTopTab';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { Body, H3 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import { dateUsHelper } from '/helpers/dateHelper';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
`;

const RequestWrapper = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: solid 1px #ccc;
`;

function AdminTopIssueRequestsWrapper({
  topIssues,
  topics,
  acceptIssueRequestCallback,
  rejectIssueRequestCallback,
}) {
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const newCandidateList = [];
    (topIssues || []).forEach(item => {
      if (!newCandidateList.includes(item.candidate.id)) {
        newCandidateList.push(item.candidate.id);
      }
    });
    setCandidateList(newCandidateList);
  }, [topIssues]);
  return (
    <AdminPageWrapper>
      <Wrapper>
        <RequestTopTab activeTab="Top Issues Requests" />
        <Title>Top Issue Requests from Candidates</Title>
        <br />
        <br />
        {candidateList &&
          candidateList.map(candidateId => {
            const issueRequest = (topIssues || []).find(
              item => item.candidate.id === candidateId,
            );
            const { candidate } = issueRequest;
            return (
              <RequestWrapper key={issueRequest.id}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Body>
                      Candidate:{' '}
                      <a href={candidateRoute(candidate)} target="_blank" rel="noreferrer">
                        {candidate.firstName} {candidate.lastName}
                      </a>
                    </Body>
                  </Grid>
                  <Grid item xs={12} md={6} className="text-right" />
                </Grid>
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Body>Top Issues</Body>
                  </Grid>
                  <Grid item xs={12} md={6} className="text-right">
                    <Body>{dateUsHelper(issueRequest.updatedAt)}</Body>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={1}>
                    <span />
                  </Grid>
                  <Grid item xs={2}>
                    <Body>
                      <strong>Topic</strong>
                    </Body>
                  </Grid>
                  <Grid item xs={3}>
                    <Body>
                      <strong>Position</strong>
                    </Body>
                  </Grid>
                  <Grid item xs={3}>
                    <Body>
                      <strong>Description</strong>
                    </Body>
                  </Grid>
                  <Grid item xs={3}>
                    <Body>
                      <strong>Website URL</strong>
                    </Body>
                  </Grid>
                  {issueRequest.data.map((issue, index) => {
                    const topic = (topics || []).find(
                      item => item.id === issue.topicId,
                    );
                    const position = topic?.positions?.find(
                      item => item.id === issue.positionId,
                    );
                    return (
                      <>
                        <Grid item xs={1}>
                          <span>{index + 1}.</span>
                        </Grid>
                        <Grid item xs={2}>
                          <strong>{topic.topic}</strong>
                        </Grid>
                        <Grid item xs={3}>
                          {position.name}
                        </Grid>
                        <Grid item xs={3}>
                          {issue.description}
                        </Grid>
                        <Grid item xs={3}>
                          {issue.websiteUrl}
                        </Grid>
                        {/* <Grid item xs={12}>
                        <hr />
                      </Grid> */}
                      </>
                    );
                  })}
                  <Grid item xs={12} md={8}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <br />
                    <PurpleButton
                      onClick={() =>
                        rejectIssueRequestCallback(issueRequest.id)
                      }
                      style={{ background: 'red', borderColor: 'red' }}
                    >
                      &nbsp;Deny Request&nbsp;
                    </PurpleButton>
                    &nbsp; &nbsp;
                    <PurpleButton
                      onClick={() =>
                        acceptIssueRequestCallback(issueRequest.id)
                      }
                    >
                      &nbsp;Accept Request&nbsp;
                    </PurpleButton>
                  </Grid>
                </Grid>
              </RequestWrapper>
            );
          })}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminTopIssueRequestsWrapper.propTypes = {
  topics: PropTypes.array,
  topIssues: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  acceptIssueRequestCallback: PropTypes.func,
  rejectIssueRequestCallback: PropTypes.func,
};

export default AdminTopIssueRequestsWrapper;
