/**
 *
 * AdminUpdateRequestsWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { candidateRoute } from 'helpers/electionsHelper';

import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { Body, H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { PurpleButton } from '../../shared/buttons';
import { dateUsHelper } from '../../../helpers/dateHelper';

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

function AdminUpdateRequestsWrapper({
  ugc,
  topIssues,
  topics,
  acceptRequestCallback,
  rejectRequestCallback,
  acceptIssueRequestCallback,
  rejectIssueRequestCallback,
}) {
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const newCandidateList = [];
    (ugc || []).forEach(item => {
      if (!newCandidateList.includes(item.candidate.id)) {
        newCandidateList.push(item.candidate.id);
      }
    });
    (topIssues || []).forEach(item => {
      if (!newCandidateList.includes(item.candidate.id)) {
        newCandidateList.push(item.candidate.id);
      }
    });
    setCandidateList(newCandidateList);
  }, [ugc, topIssues]);
  return (
    <AdminPageWrapper>
      <Wrapper>
        <Title>Update Requests from Candidates</Title>
        <br />
        <br />
        {candidateList &&
          candidateList.map(candidateId => {
            const ugcRequest = (ugc || []).find(
              item => item.candidate.id === candidateId,
            );
            const issueRequest = (topIssues || []).find(
              item => item.candidate.id === candidateId,
            );
            const { candidate } = ugcRequest || issueRequest;
            return (
              <RequestWrapper key={ugcRequest.id}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Body>
                      Candidate:{' '}
                      <a href={candidateRoute(candidate)} target="_blank">
                        {candidate.firstName} {candidate.lastName}
                      </a>
                    </Body>
                  </Grid>
                  <Grid item xs={12} md={6} className="text-right" />
                </Grid>
                {ugcRequest && (
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} />
                      <Grid item xs={12} md={6} className="text-right">
                        <Body>{dateUsHelper(ugcRequest.updatedAt)}</Body>
                      </Grid>
                    </Grid>

                    <br />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Body>
                          <strong>Field</strong>
                        </Body>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Body>
                          <strong>On Production</strong>
                        </Body>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={4}
                        style={{ marginBottom: '12px' }}
                      >
                        <Body>
                          <strong>Updates Requested</strong>
                        </Body>
                      </Grid>

                      {Object.keys(ugcRequest.data).map(field => (
                        <React.Fragment key={field}>
                          <Grid item xs={12} md={4}>
                            <strong>{field}</strong>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            {ugcRequest.candidate[field].charAt(0) === '<' ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: request.candidate[field],
                                }}
                              />
                            ) : (
                              ugcRequest.candidate[field] || '(empty)'
                            )}
                          </Grid>
                          <Grid item xs={12} md={4}>
                            {ugcRequest.data[field].charAt(0) === '<' ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: ugcRequest.data[field],
                                }}
                              />
                            ) : (
                              ugcRequest.data[field]
                            )}
                          </Grid>
                        </React.Fragment>
                      ))}
                      <Grid item xs={12} md={8}>
                        &nbsp;
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <br />
                        <PurpleButton
                          onClick={() => rejectRequestCallback(ugcRequest.id)}
                          style={{ background: 'red', borderColor: 'red' }}
                        >
                          &nbsp;Deny Request&nbsp;
                        </PurpleButton>
                        &nbsp; &nbsp;
                        <PurpleButton
                          onClick={() => acceptRequestCallback(ugcRequest.id)}
                        >
                          &nbsp;Accept Request&nbsp;
                        </PurpleButton>
                      </Grid>
                    </Grid>
                  </>
                )}
                {issueRequest && (
                  <>
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
                  </>
                )}
              </RequestWrapper>
            );
          })}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminUpdateRequestsWrapper.propTypes = {
  topics: PropTypes.array,
  ugc: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  topIssues: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  acceptRequestCallback: PropTypes.func,
  rejectRequestCallback: PropTypes.func,
  acceptIssueRequestCallback: PropTypes.func,
  rejectIssueRequestCallback: PropTypes.func,
};

export default AdminUpdateRequestsWrapper;
