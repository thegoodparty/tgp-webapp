/**
 *
 * AdminVoterizeList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { CSVLink } from 'react-csv/lib';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { candidateRoute, partyResolver } from 'helpers/electionsHelper';
import { H3 } from 'components/shared/typogrophy';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
  .rt-td {
    display: flex;
    align-items: center;
  }
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
  position: relative;
`;

const CSVLinkWrapper = styled(Button)`
  && {
    position: absolute;
    right: 0;
  }
`;

const headerStyle = {
  fontWeight: 700,
  fontSize: '1.05em',
};

function AdminVoterizeList({
  voterizeList,
  isUpdated,
  updateVoterizeCallback,
}) {
  const [tableData, setTableData] = useState([]);
  const [selectedVoterize, setSelectedVoterize] = useState(null);
  const [originalVoterize, setOriginalVoterize] = useState(null);
  useEffect(() => {
    if (voterizeList) {
      setTableData(
        voterizeList.map(candidate => ({
          ...candidate,
          incumbent: candidate.isIncumbent ? 'yes' : 'no',
          resolvedParty: partyResolver(candidate.party),
        })),
      );
    }
  }, [voterizeList, isUpdated]);
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
  const updateVoterize = (ev, key) => {
    let val = ev.target.value;
    if (key === 'likelyVoters') {
      val = parseInt(val, 10);
    }
    setSelectedVoterize({
      ...selectedVoterize,
      [key]: val,
    });
  };
  const saveVoterize = key => {
    updateVoterizeCallback({
      candidate: originalVoterize,
      [key]: selectedVoterize[key],
    });
    setSelectedVoterize(null);
  };
  const renderLikelyVoters = row => {
    if (
      selectedVoterize?.name === row.original.name &&
      selectedVoterize?.id === row.original.id &&
      selectedVoterize?.chamber === row.original.chamber &&
      selectedVoterize?.isLikeyVoters
    ) {
      return (
        <>
          <IconButton
            color="primary"
            onClick={() => saveVoterize('likelyVoters')}
          >
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedVoterize(null)}>
            <CloseIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            autoFocus
            type="number"
            value={selectedVoterize.likelyVoters}
            onChange={ev => updateVoterize(ev, 'likelyVoters')}
          />
        </>
      );
    }

    return (
      <>
        <IconButton
          onClick={() => {
            setSelectedVoterize({ ...row.original, isLikeyVoters: true });
            setOriginalVoterize(row.original);
          }}
        >
          <EditIcon />
        </IconButton>
        {row.original.likelyVoters}
      </>
    );
  };

  const renderVotesNeeded = row => {
    if (
      selectedVoterize?.name === row.original.name &&
      selectedVoterize?.id === row.original.id &&
      selectedVoterize?.chamber === row.original.chamber &&
      selectedVoterize?.isVotesNeeded
    ) {
      return (
        <>
          <IconButton
            color="primary"
            onClick={() => saveVoterize('votesNeeded')}
          >
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedVoterize(null)}>
            <CloseIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            autoFocus
            type="number"
            value={selectedVoterize.votesNeeded}
            onChange={ev => updateVoterize(ev, 'votesNeeded')}
          />
        </>
      );
    }

    return (
      <>
        {row.original.chamber !== 'Presidential' && (
          <IconButton
            onClick={() => {
              setSelectedVoterize({ ...row.original, isVotesNeeded: true });
              setOriginalVoterize(row.original);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        {row.original.votesNeeded}
      </>
    );
  };

  const renderCandidateName = row => {
    const chamberLower = row.original.chamber
      ? row.original.chamber.toLowerCase()
      : 'presidential';

    const route = candidateRoute(row.original);
    const editRoute = `/admin/edit-candidate/${chamberLower}${row.original.isIncumbent ? '-i' : ''
      }/${row.original.id}`;
    return (
      <>
        <a href={editRoute} target="_blank">
          <EditIcon />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a
          href={route}
          target="_blank"
          style={{
            textDecoration: row.original.isHidden ? 'line-through' : '',
          }}
        >
          {row.original.name}
        </a>
      </>
    );
  };
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      filterMethod: customFilter,
      headerStyle,
      Cell: renderCandidateName,
    },
    {
      Header: 'Chamber',
      accessor: 'chamber',
      headerStyle,
      filterMethod: customFilter,
    },
    {
      Header: 'Party',
      accessor: 'resolvedParty',
      headerStyle,
      filterMethod: customFilter,
    },
    {
      Header: 'State',
      accessor: 'state',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'District',
      accessor: 'district',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'Incumbent?',
      accessor: 'incumbent',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'LikelyVoters',
      accessor: 'likelyVoters',
      filterMethod: customFilter,
      headerStyle,
      Cell: renderLikelyVoters,
    },
    {
      Header: 'VotesNeeded',
      accessor: 'votesNeeded',
      filterMethod: customFilter,
      headerStyle,
      Cell: renderVotesNeeded,
    },
  ];

  const csvHeader = columns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));

  return (
    <Wrapper>
      <Title>
        Voterize List
        <CSVLinkWrapper variant="contained" color="primary">
          <CSVLink
            data={tableData}
            filename={`voterizeList_${moment().format('YYYY_MM_DD')}.csv`}
            headers={csvHeader}
            target="_blank"
          >
            <span style={{ color: '#FFF' }}>Download as a CSV</span>
          </CSVLink>
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
    </Wrapper>
  );
}

AdminVoterizeList.propTypes = {
  voterizeList: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  updateVoterizeCallback: PropTypes.func,
  isUpdated: PropTypes.bool,
};

export default AdminVoterizeList;
