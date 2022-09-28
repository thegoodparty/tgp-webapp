/**
 *
 * PledgeWrapper
 *
 */

import React, { useState, useContext } from 'react';
import PageWrapper from '../shared/PageWrapper';
import ApplicationStep1 from '../elections/application/ApplicationStep1';
import BlackButton from '../shared/buttons/BlackButton';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PledgePageContext } from '/containers/PledgePage';

const BottomFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 24px 8px;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  display: inline-block;
`;

const Padder = styled.div`
  height: 200px;
`;

function PledgeWrapper() {
  const [canSubmit, setCanSubmit] = useState(false);
  const { pledgeCallback } = useContext(PledgePageContext);
  const tempApplication = {};
  const update = () => {};
  const canSubmitCallback = (isComplete) => {
    setCanSubmit(isComplete);
  };
  return (
    <PageWrapper isFullWidth={false} hideFooter>
      <ApplicationStep1
        updateApplicationCallback={update}
        application={tempApplication}
        step={1}
        standAlone
        standAloneCanSubmitCallback={canSubmitCallback}
      />
      <Padder />
      <BottomFixed>
        <ButtonWrapper>
          <BlackButton fullWidth disabled={!canSubmit} onClick={pledgeCallback}>
            Take the Pledge
          </BlackButton>
        </ButtonWrapper>
      </BottomFixed>
    </PageWrapper>
  );
}

PledgeWrapper.propTypes = {};

export default PledgeWrapper;
