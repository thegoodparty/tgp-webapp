/**
 *
 * AdminTopIssuesWrapper
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { AdminTopIssuesPageContext } from '/containers/admin/AdminTopIssuesPage';

import AdminPageWrapper from '../shared/AdminPageWrapper';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import TopIssuesList from './TopIssuesList';
import AdminPanel from '../shared/AdminPanel';

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
    <AdminPageWrapper title="Top Issues Manager">
      <AdminPanel>
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
      </AdminPanel>
    </AdminPageWrapper>
  );
}

AdminTopIssuesWrapper.propTypes = {};

export default AdminTopIssuesWrapper;
