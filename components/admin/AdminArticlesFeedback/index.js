/**
 *
 * AdminArticlesFeedback
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Link from 'next/link';

import { H3 } from '../../shared/typogrophy';
import { getArticleById } from '../../../helpers/articlesHelper';

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

function AdminArticlesFeedback({ articles, content }) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (articles) {
      const feedbackByArticle = {};
      articles.map(article => {
        if (!feedbackByArticle[article.cmsId]) {
          feedbackByArticle[article.cmsId] = {
            helpful: 0,
            notHelpful: 0,
          };
        }
        if (article.isHelpful) {
          feedbackByArticle[article.cmsId].helpful++;
        } else {
          feedbackByArticle[article.cmsId].notHelpful++;
        }
      });
      const data = [];
      const cmsArticles = content.faqArticles;
      Object.keys(feedbackByArticle).map(articleId => {
        data.push({
          id: articleId,
          title: getArticleById(cmsArticles, articleId)?.title,
          helpful: feedbackByArticle[articleId].helpful,
          notHelpful: feedbackByArticle[articleId].notHelpful,
        });
      });
      setTableData(data);
    }
  }, [articles]);

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
    },
    {
      Header: 'Title',
      filterMethod: customFilter,
      headerStyle,

      Cell: row => {
        return (
          <Link href={`?article=${row.original.id}`}>{row.original.title}</Link>
        );
      },
    },
    {
      Header: 'Helpful',
      accessor: 'helpful',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 130,
    },
    {
      Header: 'Not Helpful',
      accessor: 'notHelpful',
      headerStyle,
      filterMethod: customFilter,
      maxWidth: 130,
    },
  ];
  return (
    <Wrapper>
      <Title>Articles Feedback</Title>
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

AdminArticlesFeedback.propTypes = {
  articles: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default AdminArticlesFeedback;
