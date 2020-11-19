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
import Link from 'next/link';

import PageWrapper from 'components/shared/PageWrapper';
import { H1, Body, Body13 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import { numberFormatter, percHelper } from 'helpers/numberHelper';
import {
  candidateCalculatedFields,
  candidateRoute,
} from 'helpers/electionsHelper';

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto 60px;
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

const CellBody13 = styled(Body13)`
  &.bold {
    font-weight: 700;
  }
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
    .-pagination {
      box-shadow: none;
      border: none;
      margin-top: 20px;
    }
  }
`;

const Colored = styled.span`
  &.orange {
    color: ${({ theme }) => theme.colors.orange};
  }
  &.green {
    color: ${({ theme }) => theme.colors.green};
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
  const [sortColumn, setSortColumn] = useState('largeDonorPerc');
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
          largeDonorPerc: percHelper(incumbent.largeDonorPerc, true),
          largeDonorPerHour: incumbent.largeDonorPerHour,
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
        <Link href={row.original.route}>
          <CellBody13 className={sortColumn === 'name' ? 'bold' : ''}>
            {row.original.name}
          </CellBody13>
        </Link>
      ),
    },
    {
      Header: 'Race',
      accessor: 'race',
      headerStyle,
      maxWidth: 100,
      Cell: row => (
        <Link href={row.original.route}>
          <CellBody13 className={sortColumn === 'race' ? 'bold' : ''}>
            {row.original.race}
          </CellBody13>
        </Link>
      ),
    },
    {
      Header: 'Total Funds Raised',
      accessor: 'totalRaised',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link href={row.original.route}>
          <CellBody13
            className={`text-right ${
              sortColumn === 'totalRaised' ? 'bold' : ''
            }`}
          >
            ${numberFormatter(row.original.totalRaised)}
          </CellBody13>
        </Link>
      ),
    },
    {
      Header: '% From Big Money',
      accessor: 'largeDonorPerc',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link href={row.original.route}>
          <CellBody13
            className={`text-right ${
              sortColumn === 'largeDonorPerc' ? 'bold' : ''
            }`}
          >
            <Colored
              className={row.original.largeDonorPerc > 50 ? 'orange' : 'green'}
            >
              {row.original.largeDonorPerc}%
            </Colored>
          </CellBody13>
        </Link>
      ),
    },
    {
      Header: 'Big Money Funding Rate',
      accessor: 'largeDonorPerHour',
      headerStyle: headerStyleRight,
      Cell: row => (
        <Link href={row.original.route}>
          <CellBody13
            className={`text-right ${
              sortColumn === 'largeDonorPerHour' ? 'bold' : ''
            }`}
          >
            <Colored
              className={row.original.largeDonorPerc > 50 ? 'orange' : ''}
            >
              ${numberFormatter(row.original.largeDonorPerHour)}/hr
            </Colored>
          </CellBody13>
        </Link>
      ),
    },
  ];

  const onSortedChange = props => {
    if (props?.length > 0) {
      setSortColumn(props[0].id);
    }
  };

  return (
    <PageWrapper isFullWidth>
      <ContentWrapper>
        <StyledH1>Big Money Funding Rates for 2020 Congress</StyledH1>
        <Body13>
          <a href="https://www.opensecrets.org/" target="_blank" rel="nofollow">
            Open Secrets
          </a>{' '}
          tracks fundraising sources using FEC filings for all 435
          Representatives and 100 Senators in Congress. We analyze this data to
          show what percentage comes from Big Money sources—like PACs, corporate
          lobbyists, and individual donations over $200. To calculate the{' '}
          <strong>Big Money Funding Rate</strong>, we use the{' '}
          <strong>
            percent of Total Funding from Big Money divided by hours in office
            this term
          </strong>
          . In other words, the Big Money Funding Rate shows how much Big Money
          pays to influence our elected representatives{' '}
          <i>for every hour they&apos;re in Congress!</i>
        </Body13>
        {loading && !incumbents && <LoadingAnimation />}
        {incumbents && (
          <TableWrapper>
            <ReactTable
              className=""
              data={tableData}
              columns={columns}
              defaultPageSize={25}
              showPagination
              defaultSorted={[
                {
                  id: 'largeDonorPerc',
                  desc: true,
                },
                {
                  id: 'totalRaised',
                  desc: true,
                },
              ]}
              resizable={false}
              onSortedChange={onSortedChange}
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
