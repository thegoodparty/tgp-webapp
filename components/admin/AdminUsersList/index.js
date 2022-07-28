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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { H3 } from '../../shared/typogrophy';
import AlertDialog from '../../shared/AlertDialog';
import ENV from '/api/ENV';
import UserAvatar from '../../shared/UserAvatar';
import AdminPageWrapper from '../shared/AdminPageWrapper';
import AdminPanel from '../shared/AdminPanel';
import { formatToPhone } from '/helpers/phoneHelper';

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

const ButtonWrapper = styled.div`
  text-align: center;
  color: red;
`;

function AdminUsersList({ users, deleteUserCallback }) {
  const [tableData, setTableData] = useState([]);
  const [showDeleteAlert, toggleShowDeleteAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    if (users) {
      const data = [];

      users.map((user) => {
        const fields = {
          ...user,
          isAdmin: user.isAdmin ? 'admin' : user.candidate ? 'candidate' : 'no',
        };

        data.push(fields);
      });
      setTableData(data);
    }
  }, [users]);

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

  let columns = [
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
      Cell: (row) => (
        <Tooltip title={row.original.email}>
          <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
        </Tooltip>
      ),
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      headerStyle,
      filterMethod: customFilter,
      Cell: (row) => (
        <Tooltip title={row.original.phone}>
          <a href={`tel:${row.original.phone}`}>
            {formatToPhone(row.original.phone)}
          </a>
        </Tooltip>
      ),
    },

    {
      Header: 'Zip',
      accessor: 'zip',
      headerStyle,
      filterMethod: customFilter,
    },

    {
      Header: 'Admin?',
      accessor: 'isAdmin',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 100,
    },
  ];
  if (ENV !== 'prod') {
    columns.push({
      Header: 'Delete',
      headerStyle,
      maxWidth: 80,
      filterable: false,
      Cell: (row) => (
        <ButtonWrapper>
          <DeleteIcon onClick={() => handleOpenAlert(row.original)} />
        </ButtonWrapper>
      ),
    });
  }
  const handleDeleteUser = () => {
    deleteUserCallback(selectedUser);
    toggleShowDeleteAlert(false);
  };
  const handleOpenAlert = (user) => {
    setSelectedUser(user);
    toggleShowDeleteAlert(true);
  };
  const handleCloseAlert = () => toggleShowDeleteAlert(false);
  return (
    <AdminPageWrapper title="All Users">
      <AdminPanel>
        <ReactTable
          className="-striped -highlight"
          data={tableData}
          columns={columns}
          defaultPageSize={25}
          showPagination
          filterable
        />
        {ENV !== 'prod' && (
          <AlertDialog
            open={showDeleteAlert}
            handleClose={handleCloseAlert}
            title={'Delete User'}
            ariaLabel={'Delete User'}
            description={'Are you sure you want to delete the user?'}
            handleProceed={handleDeleteUser}
          />
        )}
      </AdminPanel>
    </AdminPageWrapper>
  );
}

AdminUsersList.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  deleteUserCallback: PropTypes.func,
};

export default AdminUsersList;
