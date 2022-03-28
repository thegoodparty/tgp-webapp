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

function RangeSelector({}) {
  return (
    <Wrapper>
      <Range className="active">WEEK</Range>
      <Range>ALL TIME</Range>
    </Wrapper>
  );
}

export default RangeSelector;
