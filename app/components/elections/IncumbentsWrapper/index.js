/**
 *
 * IncumbentsWrapper
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

import PageWrapper from 'components/shared/PageWrapper';
import { H1, Body, Body13 } from 'components/shared/typogrophy';
import LoadingAnimation from '../../shared/LoadingAnimation';
import { numberFormatter, percHelper } from '../../../helpers/numberHelper';
import {
  candidateCalculatedFields,
  candidateRoute,
} from '../../../helpers/electionsHelper';

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  padding: 0 10px;
  overflow-x: hidden;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 60px;
  }
`;

const StyledH1 = styled(H1)`
  text-align: center;
  margin-bottom: 18px;
`;
const TableWrapper = styled.div`
  margin-top: 60px;

  .ReactTable {
    border: none;
    .rt-thead {
      .rt-th {
        text-align: left;
        border: none;
        color: ${({ theme }) => theme.colors.gray4};
        font-size: 13px;
        line-height: 18px;
        letter-spacing: 0.1px;
        @media only screen and (min-width: ${({ theme }) =>
            theme.breakpoints.md}) {
          font-size: 16px;
          line-height: 24px;
        }
      }
      &.-header {
        box-shadow: none;
        margin-bottom: 18px;
      }
    }

    .rt-tbody {
      .rt-tr-group {
        border: none;
      }
      .rt-tr {
        border: none;
        background-color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        margin: 4px 0;
      }
      .rt-td {
        border: none;
        text-align: left;
      }
    }
    .-sort-desc {
      box-shadow: none !important;
      &:before {
        content: '▼';
        float: right;
        font-size: 0.8em;
        margin-left: 10px;
      }
    }

    .-sort-asc {
      box-shadow: none !important;
      &:before {
        content: '▲';
        float: right;
        font-size: 0.8em;
        margin-left: 10px;
      }
    }
  }
`;

const Colored = styled.span`
  &.orange {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const headerStyle = {
  fontWeight: 500,
};

const headerStyleRight = {
  fontWeight: 500,
  textAlign: 'right',
};

function IncumbentsWrapper({ incumbents, loading }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (incumbents) {
      const data = [];
      incumbents.map(candidate => {
        const incumbent = candidateCalculatedFields(candidate);
        const fields = {
          name: `${incumbent.name} (${incumbent.party})`,
          race: `${incumbent.state?.toUpperCase()}-${
            incumbent.chamber === 'Senate' ? 'Senate' : incumbent.district
          }`,
          totalRaised: incumbent.totalRaised,
          largeDonorPerc: incumbent.largeDonorPerc,
          largeDonorPerHour: incumbent.largeDonorPerHour,
          isGood: incumbent.isGood,
          route: candidateRoute(incumbent),
        };

        data.push(fields);
      });
      setTableData(data);
    }
  }, [incumbents]);

  const columns = [
    {
      Header: 'Candidate Name',
      accessor: 'name',
      headerStyle,
      Cell: row => (
        <Link to={row.original.route}>
          <Body13>{row.original.name}</Body13>
        </Link>
      ),
    },
    {
      Header: 'Race',
      accessor: 'race',
      headerStyle,
      maxWidth: 100,
      Cell: row => (
        <Link to={row.original.route}>
          <Body13>{row.original.race}</Body13>
        </Link>
      ),
    },
    {
      Header: 'Total Funds Raised',
      accessor: 'totalRaised',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link to={row.original.route}>
          <Body13 className="text-right">
            ${numberFormatter(row.original.totalRaised)}
          </Body13>
        </Link>
      ),
    },
    {
      Header: 'Big Money Funding',
      accessor: 'largeDonorPerc',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link to={row.original.route}>
          <Body13 className="text-right">
            <Colored
              className={
                row.original.isGood === false ||
                row.original.largeDonorPerc > 0.5
                  ? 'orange'
                  : ''
              }
            >
              {percHelper(row.original.largeDonorPerc)}%
            </Colored>
          </Body13>
        </Link>
      ),
    },
    {
      Header: 'Big Money Funding Rate',
      accessor: 'largeDonorPerHour',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link to={row.original.route}>
          <Body13 className="text-right">
            <Colored
              className={
                row.original.isGood === false ||
                row.original.largeDonorPerc > 0.5
                  ? 'orange'
                  : ''
              }
            >
              ${numberFormatter(row.original.largeDonorPerHour)}/hr
            </Colored>
          </Body13>
        </Link>
      ),
    },
  ];

  return (
    <PageWrapper isFullWidth>
      <ContentWrapper>
        <StyledH1>Congressional Funding</StyledH1>
        <Body className="text-center">
          We tracked the funding for all 535 members of congress to see who is
          funded by normal people.
        </Body>
        {loading && !incumbents && <LoadingAnimation />}
        {incumbents && (
          <TableWrapper>
            <ReactTable
              className=""
              data={tableData}
              columns={columns}
              defaultPageSize={incumbents.length}
              showPagination={false}
              defaultSorted={[
                {
                  id: 'largeDonorPerc',
                  desc: true,
                },
              ]}
            />
          </TableWrapper>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
}

IncumbentsWrapper.propTypes = {
  incumbents: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default IncumbentsWrapper;
