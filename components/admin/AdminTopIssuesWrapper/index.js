/**
 *
 * AdminTopIssuesWrapper
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { AdminTopIssuesPageContext } from '/containers/admin/AdminTopIssuesPage';

import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { FontH1 } from '../../shared/typogrophy';
import RequestTopTab from '../AdminTopIssueRequestsWrapper/RequestTopTab';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import TopIssuesList from './TopIssuesList';

const Wrapper = styled.div`
  min-height: calc(100vh - 80px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function AdminTopIssuesWrapper() {
  const { createTopIssueCallback } = useContext(AdminTopIssuesPageContext);
  const [addNewIssue, setAddNewIssue] = useState(false);
  const [topIssueName, setTopIssueName] = useState('');
  const handleCreate = () => {
    createTopIssueCallback(topIssueName);
    setAddNewIssue(false);
    setTopIssueName('');
  };
  return (
    <AdminPageWrapper>
      <Wrapper>
        <RequestTopTab activeTab="Top Issues Manager" />
        <FontH1>Top Issues Manager</FontH1>
        <br />
        <br />
        <BlackButton
          onClick={() => {
            setAddNewIssue(true);
          }}
        >
          <InnerButton>Add a Top Issue</InnerButton>
        </BlackButton>
        {addNewIssue && (
          <div>
            <br />
            <br />
            <TextField
              fullWidth
              primary
              label="Top Issue Name"
              variant="outlined"
              value={topIssueName}
              onChange={(e) => setTopIssueName(e.target.value)}
            />
            <br />
            <br />
            <div className="text-right">
              <BlackButton
                disabled={topIssueName === ''}
                onClick={handleCreate}
              >
                <InnerButton>Save New Top Issue</InnerButton>
              </BlackButton>
            </div>
          </div>
        )}
        <br />
        <br />
        <br />
        <TopIssuesList />
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminTopIssuesWrapper.propTypes = {};

export default AdminTopIssuesWrapper;
