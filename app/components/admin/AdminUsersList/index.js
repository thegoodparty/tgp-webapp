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

import { H3 } from '../../shared/typogrophy';

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
    },
    {
      Header: 'Email',
      accessor: 'email',
      headerStyle,
      filterMethod: customFilter,
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
    },
    {
      Header: 'State',
      accessor: 'shortState',
      headerStyle,
      filterMethod: customFilter,
    },
    {
      Header: 'District',
      accessor: 'districtNumber',
      headerStyle,
      filterMethod: customFilter,
    },
    {
      Header: 'Is Admin?',
      accessor: 'isAdmin',
      headerStyle,
      filterMethod: customFilter,
    },
  ];
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
