/**
 *
 * AdminUsersList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Tooltip from '@material-ui/core/Tooltip';

import { H3 } from '../../shared/typogrophy';
import UserAvatar from '../../shared/UserAvatar';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
`;

const headerStyle = {
  fontWeight: 700,
  fontSize: '1.05em',
};

const NameWrapper = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function AdminUsersList({ users }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (users) {
      const data = [];

      users.map(user => {
        const fields = {
          ...user,
          isAdmin: user.isAdmin ? 'yes' : 'no',
        };

        data.push(fields);
      });
      setTableData(data);
    }
  }, users);

  let str;
  let rowVal;
  let columnName;
  const customFilter = (query, row, column) => {
    str = query.value;
    columnName = query.id || column.Header.toLocaleLowerCase();
    rowVal = row._original[columnName];
    if (typeof str !== 'string') {
      str += '';
    }
    str = str.toLocaleLowerCase();
    if (typeof rowVal !== 'string') {
      rowVal += '';
    }
    rowVal = rowVal.toLocaleLowerCase();
    return rowVal.includes(str);
  };

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 80,
    },
    {
      Header: 'Name',
      accessor: 'name',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        return (
          <NameWrapper>
            <span>{row.original.name}</span>
            {row.original.avatar && (
              <UserAvatar user={row.original} size="sm" />
            )}
          </NameWrapper>
        );
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        return (
          <Tooltip title={row.original.email}>
            <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
          </Tooltip>
        );
      },
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      headerStyle,
      filterMethod: customFilter,
    },
    {
      Header: 'Feedback',
      accessor: 'feedback',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        return (
          <div style={{ overflow: 'auto', height: '100%' }}>
            {row.original.feedback}
          </div>
        );
      },
    },
    {
      Header: 'State',
      accessor: 'shortState',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 80,
    },
    {
      Header: 'District',
      accessor: 'districtNumber',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 80,
      Cell: row => {
        let { districtNumber } = row.original;
        if (districtNumber > 0 && districtNumber < 10) {
          districtNumber = '0' + districtNumber;
        }
        return <div>{districtNumber}</div>;
      },
    },
    {
      Header: 'Admin?',
      accessor: 'isAdmin',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 80,
    },
  ];
  console.log('render admin');
  return (
    <Wrapper>
      <Title>All Users</Title>
      <ReactTable
        className="-striped -highlight"
        data={tableData}
        columns={columns}
        defaultPageSize={25}
        showPagination
        filterable
      />
    </Wrapper>
  );
}

AdminUsersList.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminUsersList;
