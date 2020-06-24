/**
 *
 * RtfEditor
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-family: Libre Franklin, sans-serif;
  span {
    font-family: Libre Franklin, sans-serif;
  }
`;

function RtfEditor({ initialText = '', onChangeCallback = () => {} }) {
  const [initialValue, setInitialValue] = useState(false);

  useEffect(() => {
    const initHtml = RichTextEditor.createValueFromString(initialText, 'html');
    setInitialValue(initHtml);
  }, [initialText]);

  const onChange = value => {
    setInitialValue(value);
    onChangeCallback(value);
  };

  return (
    <>
      {initialValue && (
        <Wrapper>
          <RichTextEditor value={initialValue} onChange={onChange} />
        </Wrapper>
      )}
    </>
  );
}

RtfEditor.propTypes = {
  initialText: PropTypes.string,
  onChangeCallback: PropTypes.func,
};

export default RtfEditor;
