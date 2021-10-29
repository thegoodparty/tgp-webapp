/**
 *
 * NewCandidateList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { CSVLink } from 'react-csv/lib';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { BiLogInCircle } from 'react-icons/bi';
import Link from 'next/link';
import moment from 'moment';
import { candidateRoute, partyResolver } from 'helpers/electionsHelper';
import { H3 } from 'components/shared/typogrophy';
import AlertDialog from '../../shared/AlertDialog';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
  position: relative;
`;

const CSVLinkWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const headerStyle = {
  fontWeight: 700,
  fontSize: '1.05em',
};

function Index({
  candidates,
  deleteCandidateCallback,
  logAsCandidateCallback,
}) {
  const [tableData, setTableData] = useState([]);
  const [deleteCandidate, setDeleteCandidate] = useState(false);
  const handleDeleteCandidate = id => {
    setDeleteCandidate(id);
  };

  const handleProceedDelete = () => {
    deleteCandidateCallback(deleteCandidate);
    setDeleteCandidate(false);
  };
  useEffect(() => {
    if (candidates) {
      const data = [];
      candidates.map(candidate => {
        const fields = {
          active: candidate.isActive ? 'Yes' : 'No',
          id: candidate.id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          party: partyResolver(candidate.party),
          chamber: candidate.chamber,
          office: candidate.race,
          state: candidate.state ? candidate.state.toUpperCase() : '?',
        };
        data.push(fields);
      });
      setTableData(data);
    }
  }, [candidates]);
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
      Header: 'Active?',
      accessor: 'active',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 90,
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        const route = candidateRoute(row.original);
        const editRoute = `/admin/add-candidate/${row.original.id}`;
        const settingsRoute = `/admin/stage-settings/${row.original.id}`;
        return (
          <>
            <Link href={editRoute} target="_blank" passHref>
              <a>
                <EditIcon />
              </a>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <a
              href={route}
              target="_blank"
              style={{
                textDecoration: row.original.isHidden ? 'line-through' : '',
              }}
            >
              {row.original.firstName}
            </a>
          </>
        );
      },
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'Party',
      accessor: 'party',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'Chamber',
      accessor: 'chamber',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 120,
    },
    {
      Header: 'Office',
      accessor: 'office',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'State',
      accessor: 'state',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 120,
    },
    {
      Header: 'Log as',
      maxWidth: 80,
      accessor: 'name',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        return (
          <div className="text-center">
            {' '}
            <BiLogInCircle
              onClick={() => {
                logAsCandidateCallback(row.original.id);
              }}
              style={{ color: 'green', cursor: 'pointer' }}
            />
          </div>
        );
      },
    },
    {
      Header: 'Delete',
      maxWidth: 80,
      accessor: 'name',
      headerStyle,
      filterMethod: customFilter,
      Cell: row => {
        return (
          <div className="text-center">
            {' '}
            <DeleteIcon
              onClick={() => {
                handleDeleteCandidate(row.original.id);
              }}
              style={{ color: 'red', cursor: 'pointer' }}
            />
          </div>
        );
      },
    },
  ];

  const csvHeader = columns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));

  return (
    <AdminPageWrapper>
      <Wrapper>
        <Title>
          candidate list
          <CSVLinkWrapper>
            <Button variant="contained" color="primary">
              <CSVLink
                data={tableData}
                filename={`candidates_${moment().format('YYYY_MM_DD')}.csv`}
                headers={csvHeader}
                target="_blank"
              >
                <span style={{ color: '#FFF' }}>Download as a CSV</span>
              </CSVLink>
            </Button>
            &nbsp; &nbsp;
            <Link href="/admin/add-candidate">
              <Button variant="contained" color="secondary">
                <PersonAddIcon /> &nbsp; &nbsp; Add a candidate
              </Button>
            </Link>
          </CSVLinkWrapper>
        </Title>

        <ReactTable
          className="-striped -highlight"
          data={tableData}
          columns={columns}
          defaultPageSize={25}
          showPagination
          filterable
        />
        <AlertDialog
          title="Delete Candidate?"
          description="This can't be undone, and you will have to deal with it in your afterlife"
          open={deleteCandidate !== false}
          handleClose={() => setDeleteCandidate(false)}
          handleProceed={handleProceedDelete}
        />
      </Wrapper>
    </AdminPageWrapper>
  );
}

Index.propTypes = {
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  deleteCandidateCallback: PropTypes.func,
  logAsCandidateCallback: PropTypes.func,
};

export default Index;
