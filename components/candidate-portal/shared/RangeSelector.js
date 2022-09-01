/**
 *
 * RangeSelector
 *
 */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-left: 24px;
  background-color: #e4e4e4;
  border-radius: 4px;
`;

const Range = styled.div`
  padding: 6px 25px;
  border-radius: 4px;
  color: #7a7a7a;
  font-size: 10px;
  cursor: pointer;
  &.active {
    background-color: black;
    color: #fff;
    cursor: initial;
  }
`;

function RangeSelector({ range, onChange }) {
  return (
    <Wrapper>
      <Range
        className={range === 7 && 'active'}
        onClick={() => {
          if (range !== 7) {
            onChange(7);
          }
        }}
        data-cy="week-range"
      >
        WEEK
      </Range>
      <Range
        className={range === 30 && 'active'}
        onClick={() => {
          if (range !== 30) {
            onChange(30);
          }
        }}
        data-cy="month-range"
      >
        LAST 30 DAYS
      </Range>
    </Wrapper>
  );
}

export default RangeSelector;
