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
import PurpleCheckbox from '../../shared/PurpleCheckbox';

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
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 36px;
  }
`;

const PurpleCard = styled.div`
  background-color: #f9f7fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
`;

const CardTitle = styled(Body)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
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

const cards = [
  {
    title: 'Independent',
    subtitle:
      'Good Certified candidates are not Republicans or Democrats, beholden to either corrupt party. They’re real people from across the political spectrum, running grassroots campaigns to serve us for a change.',
    icon: 'independence.svg',
    checkboxes: [
      {
        id: 'disAffiliate',
        text: 'I pledge to disaffiliate from the Democratic or Republican Parties and declare myself an independent or alternative party candidate for office.',
      },
      {
        id: 'notJoin',
        text: 'I pledge that, if elected, I will NOT join the conferences or caucuses of either of the two major parties (e.g. the House Republican Conference, Senate Republican Conference, House Democratic Caucus, or Senate Democratic Caucus).',
      },
      {
        id: 'noPay',
        text: 'I pledge that, if elected, I will NOT pay membership dues or otherwise engage in fundraising for either of the two major political party committees while in office.',
      },
    ],
  },

  {
    title: 'People Powered',
    subtitle:
      'Good Certified candidates run to serve real living people. So, the majority of money raised for their campaign must come from people -- not from corporations, unions, PACs, or other non-living entities.',
    icon: 'people-powered.svg',
    checkboxes: [
      {
        id: 'peoplePowered',
        text: 'I pledge to raise a majority of my campaign funding from individuals. To this end, I will ensure that donations to my campaign by corporations, unions, political action committees, or other non-living entities, will not exceed 49% of the total funds raised.',
      },
    ],
  },

  {
    title: 'Anti-Corruption',
    subtitle:
      'Good Certified candidates are committed to serving as honest, transparent, and responsive representatives of the people.',
    icon: 'anti-corruption.svg',
    checkboxes: [
      {
        id: 'honest',
        text: `<div>
            I pledge to serve with the highest levels of integrity and honesty.
            <br />
            <ol>
              <li>I pledge to report and disclose any attempts to unfairly influence me or members of my campaign staff immediately to appropriate authorities (constituents, law enforcement, etc.) </li>
            </ol>
          </div>`,
      },
      {
        id: 'transparent',
        text: `<div>
            I pledge to serve transparently and to be accountable and responsive to the people. That means that to the fullest extent possible:
            <br />
            <ol>
              <li>I pledge to openly share my official and campaign meeting calendars for my constituents to be able to see all my activity on their behalf.</li>
              <li>I pledge to pursue and implement innovations in communication technology that allow me to interact with, inform and be informed by my constituents (e.g. live-streaming, closed-captioning, recording and searchable-archiving every possible meeting occurring on public time).</li>
              <li>I pledge to allocate a reasonable portion of official and campaign resources to the technology (mobile apps, phone, body cam, Youtube, Facebook Live, etc.) necessary to serve transparently</li>
            </ol>
          </div>`,
      },
      {
        id: 'choices',
        text: `<div>
            I pledge that, if elected, I will always work to champion or support policies that enable more competition and choices in elections - including but not limited to:
            <br />
            <ol>
              <li>Support for rank choice voting initiatives, non-partisan primaries, ending gerrymandering, proportional representation, closing the revolving door from politics to lobbying, eliminating the influence of dark money. </li>
            </ol>
          </div>`,
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
    peoplePowered: false,
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
      updatedState.peoplePowered &&
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
    state.peoplePowered &&
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
      <Title>Step 1: Take the Good Party Pledge to get started</Title>
      <SubTitle>
        Good Party candidates take a pledge to be{' '}
        <strong>Independent, People Powered and Anti-Corruption</strong>.
      </SubTitle>
      {cards.map((card) => (
        <PurpleCard key={card.title}>
          <CardTitle>
            <Icon src={`/images/application/${card.icon}`} alt="" />
            {card.title}
          </CardTitle>
          <CardSubtitle>{card.subtitle}</CardSubtitle>
          {card.checkboxes.map((item) => (
            <CheckboxWrapper key={item.id}>
              <PurpleCheckbox
                value={state[item.id]}
                onChange={(e) => onChangeField(item.id, e.target.checked)}
                disabled={reviewMode}
              />

              <div dangerouslySetInnerHTML={{ __html: item.text }} />
            </CheckboxWrapper>
          ))}
        </PurpleCard>
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
