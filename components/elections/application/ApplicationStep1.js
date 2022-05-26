/**
 *
 * ApplicationStep1
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ApplicationWrapper from './ApplicationWrapper';
import { Body, Body13 } from '../../shared/typogrophy';
import BlackCheckbox from '../../shared/BlackCheckbox';

export const Title = styled.h1`
  font-size: 21px;
  margin: 0 0 32px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 36px;
  }
`;

const SubTitle = styled(Body)`
  margin-bottom: 24px;
  color: #000;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 36px;
  }
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
`;

const CardTitle = styled(Body)`
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CardSubtitle = styled(Body13)`
  font-weight: 500;
  margin-bottom: 28px;
`;


const Icon = styled.img`
  margin-right: 16px;
`;

const CheckboxWrapper = styled(Body13)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const IconEmoji = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

export const APPLICATION_CARDS_1 = [
  {
    title: 'Honest',
    subtitle:
      'Good Certified candidates are committed to serving with utmost integrity, and using technology to be open, transparent and responsive representatives of the people.',
    icon: (
      <IconEmoji role="img" aria-label="honest">
        😇
      </IconEmoji>
    ),
    checkboxes: [
      {
        id: 'disAffiliate',
        text: 'I pledge to serve with the highest levels of integrity and honesty and to report and disclose to appropriate authorities (constituents, law enforcement, etc.) any attempts to unfairly influence me or members of my campaign staff within 48 hours.',
      },
      {
        id: 'notJoin',
        text: `<div>
                I pledge to serve transparently and to be accountable and responsive to the people - including to the extent possible to:
                <br/>
                <ul>
                  <li>Openly share my calendar, and to have my meetings on public time be live-streamed, closed-captioned, archived and searchable.</li>
                  <li> Allocate a reasonable portion of official and campaign resources to the technology (e.g. mobile apps, phone, body cam, Youtube, Facebook Live, etc.) necessary to do so.</li>
                  <li>Push for transparency and accountability in all government spending and accounting, including the use of technologies for such purposes.</li>
                </ul>
              </div>`,
      },
      {
        id: 'noPay',
        text: `<div>
                I pledge that, if elected, I will always work to champion or support anti-corruption policies that enable more competition and choices in elections and transparency and accountability in government - including but not limited to examples such as:
                <br/>
                <ul>
                  <li>Rank-choice voting, non-partisan primaries, ending gerrymandering, proportional representation, closing the revolving door from politics to lobbying and eliminating influence of dark money.</li>
                </ul>
              </div>`,
      },
    ],
  },

  {
    title: 'Independent',
    subtitle:
      'Good Certified candidates are not Republican or Democratic politicians. They are independent-minded people from across the political spectrum, dedicated to advancing the priorities of their constituents.',
    icon: (
      <IconEmoji role="img" aria-label="Independent">
        🗽
      </IconEmoji>
    ),
    checkboxes: [
      {
        id: 'alternative',
        text: 'I pledge to disaffiliate from the Democratic or Republican Parties and declare myself an independent or alternative party candidate for office.',
      },
      {
        id: 'fundraising',
        text: 'I pledge that, if elected, I will NOT pay membership dues or otherwise engage in fundraising for either of the two major political party committees while in office.',
      },
      {
        id: 'nopartisan',
        text: 'I pledge that, if elected, I will remain independent of partisan politics and be open to working with all sides to the benefit of my constituents.',
      },
    ],
  },

  {
    title: 'People-Powered',
    subtitle:
      'Good Certified candidates run to serve people, not corporations, unions, political action committees or special interests. They run  grass-roots campaigns that depend on being connected to and promoted by the people that they’ll be serving.\n',
    icon: (
      <IconEmoji role="img" aria-label="People-Powered">
        🙌🏼
      </IconEmoji>
    ),
    checkboxes: [
      {
        id: 'honest',
        text: 'I pledge that the majority of my support will come from living people and individual donors, NOT from corporations, unions, political action committees, or other non-living entities.',
      },
      {
        id: 'transparent',
        text: 'I pledge to run a grass-roots campaign, centered on ideas, earned media and word-of-mouth promotion, so that I’m dependent on the people, not on big-money and special interests.',
      },
      {
        id: 'choices',
        text: 'I pledge that after I’m elected I will stay connected to my constituency using technology and tools that ensure my decisions on important issues and legislation are informed by their best ideas and interests. ',
      },
    ],
  },
];


function ApplicationStep1({
  step,
  application,
  updateApplicationCallback,
  reviewMode,
}) {
  const [state, setState] = useState({
    disAffiliate: false,
    notJoin: false,
    noPay: false,

    alternative: false,
    fundraising: false,
    nopartisan: false,

    honest: false,
    transparent: false,
    choices: false,
  });

  useEffect(() => {
    if (application?.pledge) {
      setState({
        ...application.pledge,
      });
    }
  }, [application]);

  const onChangeField = (key, value) => {
    const updatedState = {
      ...state,
      [key]: value,
    };
    setState(updatedState);
    const isCompleted =
      updatedState.disAffiliate &&
      updatedState.notJoin &&
      updatedState.noPay &&
      updatedState.alternative &&
      updatedState.fundraising &&
      updatedState.nopartisan &&
      updatedState.honest &&
      updatedState.transparent &&
      updatedState.choices;

    updateApplicationCallback(application.id, {
      ...application,
      pledge: {
        ...updatedState,
        isCompleted,
      },
    });
  };
  
  const canSubmit = () =>
    state.disAffiliate &&
    state.notJoin &&
    state.noPay &&
    state.alternative &&
    state.fundraising &&
    state.nopartisan &&
    state.honest &&
    state.transparent &&
    state.choices;
  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
      reviewMode={reviewMode}
    >
      <Title data-cy="step-title">Step 1: Take the Good Party Pledge to get started</Title>
      <SubTitle data-cy="step-subtitle">
        Good Party candidates take a pledge to be{' '}
        <strong>Honest, Independent and People-Powered</strong>.
      </SubTitle>
      {APPLICATION_CARDS_1.map((card) => (
        <Card key={card.title} data-cy="step-card">
          <CardTitle data-cy="step-card-title">
            {card.icon}
            {card.title}
          </CardTitle>
          <CardSubtitle data-cy="step-card-subtitle">{card.subtitle}</CardSubtitle>
          {card.checkboxes.map((item) => (
            <CheckboxWrapper key={item.id} data-cy="card-checkbox">
              <BlackCheckbox
                value={state[item.id]}
                onChange={(e) => onChangeField(item.id, e.target.checked)}
                disabled={reviewMode}
                data-cy="card-check-box"
              />
              <div dangerouslySetInnerHTML={{ __html: item.text }} />
            </CheckboxWrapper>
          ))}
        </Card>
      ))}
    </ApplicationWrapper>
  );
}

ApplicationStep1.propTypes = {
  step: PropTypes.number,
  application: PropTypes.object,
  updateApplicationCallback: PropTypes.func,
};

export default ApplicationStep1;
