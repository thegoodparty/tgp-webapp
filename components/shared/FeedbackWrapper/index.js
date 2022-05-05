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
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    position: fixed;
    bottom: 40px;
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
  }
  @media only screen and (min-width: 1380px) {
    top: 160px;
    bottom: auto;
  }

  &.mobile {
    display: inline-block;
    padding: 10px 32px;
    background-color: #000;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    @media only screen and (min-width: 1380px) {
      display: none;
    }
  }
`;

function FeedbackWrapper({
  sendFeedbackCallback,
  mode = 'desktop',
  toggleModalCallback,
  isOpen,
}) {
  return (
    <>
      <SideButton onClick={() => toggleModalCallback(true)} className={mode}>
        Feedback
      </SideButton>
      {isOpen && (
        <FeedbackForm
          closeCallback={() => toggleModalCallback(false)}
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
