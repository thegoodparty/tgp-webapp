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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import { candidateRoute, partyResolver } from 'helpers/electionsHelper';
import { H3 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
`;

const ColoredText = styled.span`
  color: ${({ theme }) => theme.colors.gray4};
  &.green {
    color: ${({ theme }) => theme.colors.green};
  }

  &.red {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const StyledSelect = styled(Select)`
  && {
    .MuiOutlinedInput-input {
      padding: 8px 32px 8px 14px;
    }
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
          isGood: candidate.isGood,
          isBigMoney: candidate.isBigMoney,
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

  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
      headerStyle,
      maxWidth: 80,
    },
    {
      Header: 'Name',
      headerStyle,
      Cell: row => {
        const route = candidateRoute(row.original);
        return <Link to={route}>{row.original.name}</Link>;
      },
    },
    {
      Header: 'Party',
      accessor: 'party',
      headerStyle,
    },
    {
      Header: 'Incumbent?',
      accessor: 'incumbent',
      headerStyle,
      maxWidth: 130,
    },
    {
      Header: 'FTM($)',
      accessor: 'ftm',
      headerStyle,
      maxWidth: 130,
      Cell: row => {
        const { isGood, isBigMoney } = row.original;
        let type;
        let color;
        if (isGood && isBigMoney) {
          type = 'Major';
          color = 'green';
        } else if (isGood && !isBigMoney) {
          type = 'Minor';
          color = 'green';
        } else if (!isGood && isBigMoney) {
          type = 'Bad';
          color = 'red';
        } else {
          type = 'Unknown';
          color = 'gray';
        }
        return <ColoredText className={color}>{type}</ColoredText>;
      },
    },
    {
      Header: 'Is Aligned',
      accessor: 'isAligned',
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
      <Title>{chamber} candidate list</Title>
      <ReactTable
        className="-striped -highlight"
        data={tableData}
        columns={columns}
        defaultPageSize={100}
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
