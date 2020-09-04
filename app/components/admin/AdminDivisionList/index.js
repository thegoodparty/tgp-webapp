/**
 *
 * AdminDivisionList
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { CSVLink } from 'react-csv/lib';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { candidateRoute, partyResolver } from 'helpers/electionsHelper';
import { H3 } from 'components/shared/typogrophy';
import { numberFormatter } from 'helpers/numberHelper';

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

const StyledSelect = styled(Select)`
  && {
    .MuiOutlinedInput-input {
      padding: 8px 32px 8px 14px;
    }
  }
`;
const CSVLinkWrapper = styled(Button)`
  && {
    position: absolute;
    right: 0;
  }
`;
const ThresoldWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const headerStyle = {
  fontWeight: 700,
  fontSize: '1.05em',
};

function AdminDivisionList({ divisions, isUpdated, updateDivisionCallback }) {
  const [tableData, setTableData] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  useEffect(() => {
    debugger;
    if (divisions) {
      const data = [];
      divisions.map(division => {
        const fields = {
          ...division,
          chamber: division.isSenate ? 'Senate' : 'House',
        };
        data.push(fields);
      });
      setTableData(data);
    }
  }, [divisions, isUpdated]);
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
  const updateDivision = (ev, key) => {
    setSelectedDivision({
      ...selectedDivision,
      [key]: ev.target.value,
    });
  };
  const saveDivision = () => {
    updateDivisionCallback(selectedDivision);
    setSelectedDivision(null);
  };
  const renderWriteInThresold = row => {
    if (
      selectedDivision?.id === row.original.id &&
      selectedDivision?.isSenate === row.original.isSenate &&
      !selectedDivision.isThresoldWithPresident
    ) {
      return (
        <>
          <IconButton color="primary" onClick={saveDivision}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedDivision(null)}>
            <CloseIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            autoFocus
            type="number"
            value={selectedDivision.writeInThreshold}
            onChange={ev => updateDivision(ev, 'writeInThreshold')}
          />
        </>
      );
    }

    return (
      <>
        <IconButton
          onClick={() =>
            setSelectedDivision({
              ...row.original,
              isThresoldWithPresident: false,
            })
          }
        >
          <EditIcon />
        </IconButton>
        {row.original.writeInThreshold}
      </>
    );
  };

  const renderWriteInThresholdWithPresident = row => {
    if (
      selectedDivision?.id === row.original.id &&
      selectedDivision?.isSenate === row.original.isSenate &&
      selectedDivision.isThresoldWithPresident
    ) {
      return (
        <>
          <IconButton color="primary" onClick={saveDivision}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedDivision(null)}>
            <CloseIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            autoFocus
            type="number"
            value={selectedDivision.writeInThresholdWithPresident}
            onChange={ev => updateDivision(ev, 'writeInThresholdWithPresident')}
          />
        </>
      );
    }

    return (
      <>
        <IconButton
          onClick={() =>
            setSelectedDivision({
              ...row.original,
              isThresoldWithPresident: true,
            })
          }
        >
          <EditIcon />
        </IconButton>
        {row.original.writeInThresholdWithPresident}
      </>
    );
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
      Header: 'ocdDivisionId',
      accessor: 'ocdDivisionId',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'writeInThreshold',
      accessor: 'writeInThreshold',
      filterMethod: customFilter,
      headerStyle,
      Cell: renderWriteInThresold,
    },
    {
      Header: 'writeInThresholdWithPresident',
      accessor: 'writeInThresholdWithPresident',
      filterMethod: customFilter,
      headerStyle,
      Cell: renderWriteInThresholdWithPresident,
    },
    {
      Header: 'Chamber',
      accessor: 'chamber',
      filterMethod: customFilter,
      headerStyle,
    },
  ];

  const csvHeader = columns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));

  return (
    <Wrapper>
      <Title>
        division list
        <CSVLinkWrapper variant="contained" color="primary">
          <CSVLink
            data={tableData}
            filename={`Divisions_${moment().format('YYYY_MM_DD')}.csv`}
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

AdminDivisionList.propTypes = {
  divisions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  updateDivisionCallback: PropTypes.func,
  isUpdated: PropTypes.bool,
};

export default AdminDivisionList;
