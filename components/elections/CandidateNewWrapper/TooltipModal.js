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
import { Body, Body13, H1 } from '../../shared/typogrophy';

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

const WasHelpul = styled(Body)`
  text-align: left;
  margin: 35px 0 24px;
`;

//
// const topics = {
//   'PUBLIC HEALTH EMERGENCY MANAGER':
//     'A new position which will track public health crises such as COVID-19, the opioid crisis and future public health emergencies.',
//   'TRANSPARENT BUDGETING':
//     'Honest, transparent budgeting provides an opportunity for the community to contribute to budget conversations and ensure that money is spent wisely.',
//   'OFFICE OF COMMUNITY WEALTH BUILDING':
//     'Community Wealth Building (CWB) is a system-changing approach to community economic development that works to produce broadly shared economic prosperity, racial equity, and ecological sustainability through the reconfiguration of institutions and local economies on the basis of greater democratic ownership, participation, and control.',
//   'UNIVERSAL HEALTHCARE':
//     'Access to health services for all people regardless of economic status or any other factor.',
//   'LEGALIZE MARIJUANA':
//     'Legalizing marijuana will create more jobs, reduce incarceration rates and end racial disparities in marijuana enforcement.',
//   'END CASH BAIL':
//     'In the cash bail system, an individual has to pay a certain amount of money to be released from detention. Individuals who cannot afford to pay are detained for weeks or months before trial. Ending cash bail will save taxpayer dollars, decrease job loss and reduce incarceration rates.',
//   'NON-PARTISAN':
//     'Good Party Certified candidates pledge to caucus (meet) with all sides, but to NEVER pay dues to nor fundraise for either Republican or Democratic parties.',
//   'SMALL MONEY':
//     'Good Party Certified candidates pledge to take a majority of their funding from small money donations, or self-financing with matching rules that mimic publicly funded elections.',
//   'ANTI-CORRUPTION':
//     'Good Party Certfied candidates pledge to openly share their calendar and the content of meetings on public time. They will also abide by and work to advance the Anti-Corruption Act.',
//   TRANSPARENT:
//     'Committed to using modern technology in being accountable and transparent to all the people he represents and fostering meaningful citizen engagement.',
//   'NEW NON-PARTISAN DEFINITION':
//     'Good Party Certified candidates pledge to caucus (meet) with all sides, but to NEVER pay dues to nor fundraise for either Republican or Democratic parties.',
//   'NEW SMALL MONEY DEFINITION':
//     'Good Party Certified candidates pledge to take a majority of their funding from small money donations, or self-financing with matching rules that mimic publicly funded elections.',
//   'NEW ANTI_CORRUPTION DEFINITION':
//     'Good Party Certfied candidates pledge to openly share their calendar and the content of meetings on public time. They will also abide by and work to advance the Anti-Corruption Act',
//   CLEANLINESS:
//     'Accountability for all property owners to respect their own properties. A clean city will instill hope in Albany.',
//   'PUBLIC SAFETY':
//     'Clear communication between elected officials, police, residents and businesses to establish trust in Albany.',
//   'INCREASE HIGH SCHOOL GRADUATION RATES':
//     'Engage young people by teaching the importance of solid education and community relations.',
//   'HOMELESS PREVENTION SERVICE':
//     'Angelenos can contact the Homeless Prevention Service if they are on the verge of being homeless. ',
//   'REDUCE NOISE POLLUTION':
//     'Noise pollution contributes to hearing loss. Los Angeles has some of the highest levels of noise pollution in the world.',
//   'ACCESSIBLE FINANCIAL DATA':
//     "Allow for greater access to financial data so Angelenos can easilly understand the city's finances.",
//   'TIMELY FINANCIAL INFORMATION':
//     'Ensure that financial information such as payroll, budgets and accounting are made availiable quickly.',
//   'IDENTIFY WASTEFUL SPENDING':
//     'Results-driven financial and performance audits will showcase whether or not Los Angeles is utilizing its resources properly.',
//   INDEPENDENT: 'Never pay dues to nor fundraise for Republicans or Democrats.',
//   'PEOPLE POWERED':
//     'Good candidates only accept donations from individuals - not corporations, unions, PACs, or other non-living entities.',
// };

function TooltipModal({ topic, closeModalCallback, topics }) {
  const text = topic ? topics[topic] : false;
  return (
    <TgpDialog onClose={closeModalCallback} open={text}>
      <TopWrapper>
        <TopClose onClick={closeModalCallback} />
      </TopWrapper>
      <H1>{topic}</H1>
      <Body13 style={{ marginTop: '20px' }}>{text}</Body13>
      <WasHelpul data-cy="was-helpful">Was this helpful?</WasHelpul>
    </TgpDialog>
  );
}

TooltipModal.propTypes = {
  topic: PropTypes.string,
  closeModalCallback: PropTypes.func,
  topics: PropTypes.object,
};

export default TooltipModal;
