/**
 *
 * AdminCandidateList
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
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { candidateRoute, partyResolver } from 'helpers/electionsHelper';
import { H3 } from 'components/shared/typogrophy';
import { numberFormatter } from 'helpers/numberHelper';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
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
const headerStyle = {
  fontWeight: 700,
  fontSize: '1.05em',
};

function AdminCandidateList({ candidates, updateCandidateCallback, chamber }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (candidates) {
      const data = [];
      candidates.map(candidate => {
        const fields = {
          id: candidate.id,
          name: candidate.name,
          party: partyResolver(candidate.party),
          incumbent: candidate.isIncumbent ? 'yes' : 'no',
          isIncumbent: candidate.isIncumbent,
          isAligned: candidate.isAligned,
          chamber: candidate.chamber,
          isGood:
            candidate.isGood === null
              ? 'unknown'
              : candidate.isGood
                ? 'yes'
                : 'no',
          isBigMoney: candidate.isBigMoney ? 'yes' : 'no',
          isMajor: candidate.isMajor ? 'yes' : 'no',
          isHidden: candidate.isHidden === true,
          twitterFollowers: candidate.twitterFollowers,
        };
        if (chamber !== 'presidential') {
          fields.state = candidate.state
            ? candidate.state.toLowerCase()
            : 'N/A';
        }
        if (chamber === 'house') {
          fields.district = candidate.district;
        }
        data.push(fields);
      });
      setTableData(data);
    }
  }, candidates);
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
      },
    },
    {
      Header: 'Party',
      accessor: 'party',
      filterMethod: customFilter,
      headerStyle,
    },
    {
      Header: 'Twitter Followers',
      accessor: 'twitterFollowers',
      filterMethod: customFilter,
      headerStyle,
      Cell: row => {
        return <div>{numberFormatter(row.original.twitterFollowers)}</div>;
      },
    },
    {
      Header: 'Incumbent?',
      accessor: 'incumbent',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 130,
    },
    {
      Header: 'Is Good (yes/no)',
      accessor: 'isGood',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 150,
    },
    {
      Header: 'Is Big Money (yes/no)',
      accessor: 'isBigMoney',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 150,
    },
    {
      Header: 'Is Major (yes/no)',
      accessor: 'isMajor',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 150,
    },
    {
      Header: 'isHidden',
      accessor: 'isHidden',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 120,
      Cell: row => {
        return (
          <div className="text-center">
            <Checkbox
              checked={row.original.isHidden}
              onChange={event =>
                updateHidden(row.original, event.target.checked)
              }
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
        );
      },
    },
    {
      Header: 'Aligned? (yes/no/unknown)',
      accessor: 'isAligned',
      filterMethod: customFilter,
      headerStyle,
      maxWidth: 180,
      Cell: row => {
        return (
          <FormControl variant="outlined">
            <StyledSelect
              value={row.original.isAligned}
              onChange={event =>
                updateAlignment(row.original, event.target.value)
              }
            >
              <MenuItem value="unknown">
                <em>Unknown</em>
              </MenuItem>
              <MenuItem value="yes">
                <em>Aligned</em>
              </MenuItem>
              <MenuItem value="no">
                <em>Not Aligned</em>
              </MenuItem>
            </StyledSelect>
          </FormControl>
        );
      },
    },
  ];
  if (chamber !== 'presidential') {
    columns.splice(3, 0, {
      Header: 'State',
      accessor: 'state',
      maxWidth: 100,
      headerStyle,
    });
  }
  if (chamber === 'house') {
    columns.splice(4, 0, {
      Header: 'District',
      accessor: 'district',
      maxWidth: 100,
      headerStyle,
    });
  }
  const csvHeader = columns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));
  const updateHidden = (candidate, newVal) => {
    updateCandidateCallback(
      candidate.id,
      { isHidden: newVal },
      chamber,
      candidate.incumbent === 'yes',
    );
  };

  const updateAlignment = (candidate, newVal) => {
    updateCandidateCallback(
      candidate.id,
      { isAligned: newVal },
      chamber,
      candidate.incumbent === 'yes',
    );
  };

  return (
    <Wrapper>
      <Title>
        {chamber} candidate list
        <CSVLinkWrapper variant="contained" color="primary">
          <CSVLink
            data={tableData}
            filename={`${chamber}_candidates_${moment().format(
              'YYYY_MM_DD',
            )}.csv`}
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

AdminCandidateList.propTypes = {
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  updateCandidateCallback: PropTypes.func,
  chamber: PropTypes.string,
};

export default AdminCandidateList;
