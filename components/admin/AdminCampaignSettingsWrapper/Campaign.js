/**
 *
 * Campaign
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H3 } from 'components/shared/typogrophy';

const Wrapper = styled.div`
  padding: 24px;
  border: solid 1px #ccc;
  border-radius: 8px;
  display: flex;
`;

const Img = styled.div`
  height: 80px;
  width: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: solid 2px #000;
  margin-right: 24px;
`;

const Item = styled.div`
  padding: 8px 0;
`;

function Campaign({ candidate }) {
  const { firstName, lastName, image, isDraft } = candidate;
  return (
    <Wrapper>
      <Img style={{ backgroundImage: `url(${image}` }} />
      <div>
        <Item>
          <H3>
            {firstName} {lastName}
          </H3>
        </Item>
        <Item>
          Campaign Status: <strong>Signature</strong>
        </Item>
        {isDraft && <Item>Draft Candidate</Item>}
      </div>
    </Wrapper>
  );
}

Campaign.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default Campaign;
