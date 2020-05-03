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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { partyResolver } from 'helpers/electionsHelper';
import { H3 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  padding: 16px;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
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
          isAligned: candidate.isAligned,
        };
        if (chamber !== 'presidential') {
          fields.state = candidate.state
            ? candidate.state.toUpperCase()
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
      accessor: 'name', // accessor is the "key" in the data
      headerStyle,
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
      Header: 'Is Aligned',
      filterable: false,
      sortable: false,
      Cell: row => {
        return (
          <RadioGroup
            aria-label="is aligned"
            name="isAligned"
            value={row.original.isAligned}
            onChange={(e, newVal) => updateAlignment(row.original, newVal)}
          >
            <Row>
              <FormControlLabel
                value="unknown"
                control={<Radio />}
                label="Unknown"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Aligned"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="Not Aligned"
              />
            </Row>
          </RadioGroup>
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
