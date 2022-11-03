/**
 *
 * CandidateButton
 *
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ResultButton = styled.div`
  display: inline-block;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: 700;
  width: 100%;
  text-align: center;
`;

const InnerResultButton = styled.div`
  padding: 16px;
`;

const labels = [
  'ENDORSE ME',
  'ADD YOUR NAME',
  'LEARN MORE',
  'SHARE THIS CAMPAIGN',
  'FOLLOW',
];
const initialState = {
  label: labels[0],
  backgroundColor: '#5c00c7',
  textColor: '#FFF',
  isOpen: false,
  colorEdit: 'button',
  copied: false,
};

function CandidateButton({ candidate }) {
  const { id, preferences } = candidate;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (preferences) {
      setState({
        ...state,
        backgroundColor: preferences.backgroundColor,
        textColor: preferences.textColor,
        label: preferences.label,
      });
    }
  }, [preferences]);

  return (
    <Link href={`/embed/redirect/${id}`}>
      <ResultButton
        style={{
          backgroundColor: state.backgroundColor,
          color: state.textColor,
        }}
      >
        <InnerResultButton>{state.label}</InnerResultButton>
      </ResultButton>
    </Link>
  );
}

export default CandidateButton;
