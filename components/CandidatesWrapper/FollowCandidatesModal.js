/**
 *
 * FollowModal
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';

const Wrapper = styled.div`
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  width: 60vw;
  max-width: 450px;
  min-width: 300px;
  font-size: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 15px 34px;
  }
`;

const CloseWrapper = styled.div`
  display: inline-block;
  padding: 0 0 12px 12px;
  cursor: pointer;
  font-size: 18px;
`;

function FollowCandidatesModal({closeModalCallback}) {
  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between' }}>
        <FontH3>Follow indie candidates</FontH3>
        <div className="text-right">
          <CloseWrapper onClick={closeModalCallback}>
            <IoMdClose />
          </CloseWrapper>
        </div>
      </Row>
    </Wrapper>
  );
}

export default FollowCandidatesModal;
