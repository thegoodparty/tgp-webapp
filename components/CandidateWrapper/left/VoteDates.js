/**
 *
 * VoteDate
 *
 */

import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { BiMinusCircle } from 'react-icons/bi';

import { dateWithMonthName } from '/helpers/dateHelper';
import Row from '../../shared/Row';

const DateWrapper = styled(Row)`
  padding-top: 24px;
  &.past {
    color: #919191;
  }
`;

const DateFormat = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  font-weight: 600;
`;

const Icon = styled.div`
  margin-right: 12px;
  font-size: 40px;
`;

function VoteDate({ date, title, showPast }) {
  if (!date) {
    return <></>;
  }

  const datePassed = new Date(date) - new Date() > 0;
  if (showPast && !datePassed) {
    return <></>;
  }
  if (!showPast && datePassed) {
    return <></>;
  }

  return (
    <DateWrapper className={datePassed && 'past'}>
      <Icon>
        {datePassed ? (
          <BiMinusCircle style={{ color: '#919191' }} />
        ) : (
          <IoMdCheckmarkCircle />
        )}
      </Icon>
      <div>
        <div>
          <strong>{title}</strong>
        </div>
        <DateFormat>{dateWithMonthName(date)}</DateFormat>
      </div>
    </DateWrapper>
  );
}

export default VoteDate;
