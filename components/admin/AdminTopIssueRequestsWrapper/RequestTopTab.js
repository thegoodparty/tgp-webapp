/**
 *
 * RequestTopTab.js
 *
 */

import React from 'react';

import Box from '@material-ui/core/Box';
import Link from 'next/link';

import { BlueButton } from '../../shared/buttons';

function RequestTopTab() {
  return (
    <Box display="flex" justifyContent="space-around" mb={3}>
      <Link href="/admin/update-requests" passHref>
        <BlueButton>Update Requests</BlueButton>
      </Link>
      <Link href="/admin/top-issue-requests" passHref>
        <BlueButton>Top Issues Requests</BlueButton>
      </Link>
    </Box>
  );
}

export default RequestTopTab;
