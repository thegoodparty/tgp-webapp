/**
 *
 * FeedbackWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

const FeedbackForm = dynamic(() => import('./FeedbackForm'));

const SideButton = styled.div`
  position: fixed;
  top: 160px;
  right: -36px;
  transform: rotate(-90deg);
  padding: 8px 16px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  height: 50px;
  transition: right 0.3s;
  font-weight: 600;
  cursor: pointer;
  z-index: 100;

  &:hover {
    right: -25px;
  }
`;

function FeedbackWrapper({ sendFeedbackCallback }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <SideButton onClick={() => setShowForm(true)}>Feedback</SideButton>
      {showForm && (
        <FeedbackForm
          closeCallback={() => setShowForm(false)}
          sendFeedbackCallback={sendFeedbackCallback}
        />
      )}
    </>
  );
}

FeedbackWrapper.propTypes = {
  sendFeedbackCallback: PropTypes.func,
};

export default FeedbackWrapper;
