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
    'A new position which will track public health crises such as COVID-19, the opioid crisis and future public health emergencies.',
  'TRANSPARENT BUDGETING':
    'Transparent budgeting provides an opportunity for the community to contribute to budget conversations and ensure that money is spent wisely.',
  'OFFICE OF COMMUNITY WEALTH BUILDING':
    'This is the OFFICE OF COMMUNITY WEALTH BUILDING tooltip data',
  'UNIVERSAL HEALTHCARE':
    'Access to health services for all people regardless of economic status or any other factor.',
  'LEGALIZE MARIJUANA':
    'Legalizing marijuana will create more jobs, reduce incarceration rates and end racial disparities in marijuana enforcement. ',
  'END CASH BAIL':
    'In the cash bail system, an individual has to pay a certain amount of money to be released from detention. Individuals who cannot afford to pay are detained for weeks or months before trial. Ending cash bail will save taxpayer dollars, decrease job loss and reduce incarceration rates.',
  'NON-PARTISAN':
    'Not republican, not democrat, but independent minded and dedicated to serving everyone.',
  'SMALL MONEY': 'Not funded by corporate PACs and big money donors.',
  'ANTI-CORRUPTION':
    'Dedicated to supporting the Anti-Corruption Act and reporting any attempts at undue influence.',
  TRANSPARENT:
    'Committed to using modern technology in being accountable and transparent to all the people he represents and fostering meaningful citizen engagement. ',
};

function TooltipModal({ topic, closeModalCallback }) {
  const text = topic ? topics[topic.toUpperCase()] : false;
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
