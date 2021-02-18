/**
 *
 * TooltipModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import { Body11, H2 } from '../../shared/typogrophy';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      position: relative;
      width: 100vw;
      border-radius: 8px;
      border-radius: 8px;
      padding: 24px;


      }
    }

    .MuiBackdrop-root {
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
  &.purple {
    color: #fff;
  }
`;

const topics = {
  'PUBLIC HEALTH EMERGENCY MANAGER':
    'This is the PUBLIC HEALTH EMERGENCY MANAGER tooltip data',
  'TRANSPARENT BUDGETING': 'This is the TRANSPARENT BUDGETING tooltip data',
  'OFFICE OF COMMUNITY WEALTH BUILDING':
    'This is the OFFICE OF COMMUNITY WEALTH BUILDING tooltip data',
  'UNIVERSAL HEALTHCARE': 'This is the UNIVERSAL HEALTHCARE tooltip data',
  'LEGALIZE MARIJUANA': 'This is the LEGALIZE MARIJUANA tooltip data',
  'END CASH BAIL': 'This is the END CASH BAIL tooltip data',
};

function TooltipModal({ topic, closeModalCallback }) {
  console.log('topic', topic);
  const text = topic ? topics[topic.toUpperCase()] : false;
  console.log('topic', topic, text);
  return (
    <TgpDialog onClose={closeModalCallback} open={text}>
      <TopWrapper>
        <TopClose onClick={closeModalCallback} />
      </TopWrapper>
      <H2>{topic}</H2>
      <Body11 style={{ marginTop: '20px' }}>{text}</Body11>
    </TgpDialog>
  );
}

TooltipModal.propTypes = {
  topic: PropTypes.string,
  closeModalCallback: PropTypes.func,
};

export default TooltipModal;
