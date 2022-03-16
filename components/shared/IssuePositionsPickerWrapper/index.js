/**
 *
 * IssuePositionsPickerWrapper
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body, Body11, FontH3 } from '../typogrophy';

const Title = styled(Body)`
  font-weight: 600;
  margin-bottom: 16px;
`;

const Position = styled(Body11)`
  font-weight: 600;
  padding: 4px 8px;
  display: inline-block;
  margin: 0 8px 16px 0;
  background-color: #e5e5e5;
  border-radius: 4px;
  color: #666;
  cursor: pointer;

  &.active {
    background-color: #9961d9;
    color: #fff;
  }
`;

const TopicWrapper = styled.div`
  margin-bottom: 28px;
`;

const StyledFontH3 = styled(FontH3)`
  color: ${({ theme }) => theme.colors.purple};
`;

function IssuePositionsPickerWrapper({
  topics,
  selectedPositions,
  onChange,
  disabled,
  maxSelected,
  showMaxMessage,
}) {
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const hash = {};
    selectedPositions.forEach((topic) => {
      hash[topic.id] = topic;
    });
    setSelected(hash);
  }, [selectedPositions]);

  const handleSelect = (position) => {
    if (disabled) {
      return;
    }
    const updated = { ...selected };
    if (updated[position.id]) {
      // deselect
      delete updated[position.id];
    } else {
      if (maxSelected) {
        if (maxSelected > Object.keys(updated).length) {
          updated[position.id] = position;
        } else {
          showMaxMessage(`You can only select ${maxSelected} issues`);
        }
      } else {
        updated[position.id] = position;
      }
    }
    setSelected(updated);
    onChange(Object.values(updated));
  };
  return (
    <div>
      <StyledFontH3>Filter by Issues &amp; Positions</StyledFontH3>
      {topics.map((topic, index) => (
        <TopicWrapper key={index}>
          <Title>{topic.topic}</Title>
          {(topic.positions || []).map((position, index) => (
            <Position
              key={index}
              className={selected[position.id] && 'active'}
              onClick={() => {
                handleSelect(position);
              }}
            >
              {position.name}
            </Position>
          ))}
        </TopicWrapper>
      ))}
    </div>
  );
}

IssuePositionsPickerWrapper.propTypes = {
  topics: PropTypes.array,
  selectedPositions: PropTypes.array,
  onChange: PropTypes.func,
  maxSelected: PropTypes.number,
  showMaxMessage: PropTypes.func,
};

export default IssuePositionsPickerWrapper;
