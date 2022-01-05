/**
 *
 * IssuePositionsPickerWrapper
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body, Body11 } from '../typogrophy';

const Title = styled(Body)`
  font-weight: 600;
  margin-bottom: 16px;
`;

const Position = styled(Body11)`
  font-weight: 600;
  padding: 4px 8px;
  display: inline-block;
  margin-right: 8px;
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

function IssuePositionsPickerWrapper({ topics, selectedPositions, onChange }) {
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const hash = {};
    selectedPositions.forEach(topic => {
      hash[topic.id] = topic;
    });
    setSelected(hash);
  }, [selectedPositions]);

  const handleSelect = position => {
    const updated = { ...selected };
    if (updated[position.id]) {
      // deselect
      delete updated[position.id];
    } else {
      updated[position.id] = position;
    }
    setSelected(updated);
    onChange(Object.values(updated));
  };
  return (
    <div>
      {topics.map(topic => (
        <TopicWrapper>
          <Title>{topic.topic}</Title>
          {(topic.positions || []).map(position => (
            <Position
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
};

export default IssuePositionsPickerWrapper;
