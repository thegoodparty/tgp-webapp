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

const Title = styled.h1`
  font-size: 21px;
  margin: 0 0 16px;
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
  margin-bottom: 22px;
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
    title: 'Independence',
    icon: 'independence.svg',
    checkboxes: [
      {
        id: 'disAffiliate',
        text:
          'I am willing to dis-affiliate from any past affiliation with the Democratic or Republican Parties and declare myself an independent or 3rd party candidate for office.',
      },
      {
        id: 'notJoin',
        text:
          'If elected, I agree NOT to join the caucuses or conferences of either of the two-major parties (e.g. the House Republican Conference, Senate Republican Conference, House Democratic Caucus, or Senate Democratic Caucus).',
      },
      {
        id: 'noPay',
        text:
          'If elected, I will not pay membership dues or otherwise engage in fundraising for either of the two major political party committees while in office.',
      },
      {
        id: 'noNominee',
        text:
          'If elected, I will not run for re-election as the nominee of either major political party.',
      },
    ],
  },

  {
    title: 'People Powered',
    icon: 'people-powered.svg',
    checkboxes: [
      {
        id: 'peoplePowered',
        text:
          'I commit only to accept campaign contributions from individuals - not corporations, unions, political action committees, or other non-living entities - and follow all (federal, state, or local) contribution limits.',
      },
    ],
  },

  {
    title: 'Anti-Corruption',
    icon: 'anti-corruption.svg',
    checkboxes: [
      {
        id: 'antiCorruption',
        text: `<div>
            To eliminate corruption, Good Party candidates must be willing to
            abide by the American Anti-Corruption Act as a candidate and enact
            it as an elected official. Its four core elements are:
            <br />
            <ol>
              <li>Stop political bribery</li>
              <li>End secret money</li>
              <li>Fix our broken elections</li>
              <li>Enforce the rules</li>
            </ol>
            <br />
            Learn more:
            <a href="https://anticorruptionact.org/whats-in-the-act/" target="_blank" rel="noopener noreferrer nofollow">
              https://anticorruptionact.org/whats-in-the-act/
            </a>
          </div>`,
      },
    ],
  },
];

function ApplicationStep1({ step, application, updateApplicationCallback }) {
  const [state, setState] = useState({
    disAffiliate: false,
    notJoin: false,
    noPay: false,
    noNominee: false,
    peoplePowered: false,
    antiCorruption: false,
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
      updatedState.noNominee &&
      updatedState.peoplePowered &&
      updatedState.antiCorruption;

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
    state.noNominee &&
    state.peoplePowered &&
    state.antiCorruption;
  return (
    <ApplicationWrapper
      step={step}
      canContinue={canSubmit()}
      id={application.id}
    >
      <Title>
        Take the Good Party Pledge to get started{' '}
        <span role="img" aria-label="victory">
          ✌️
        </span>
        ️
      </Title>
      <SubTitle>
        Good Party candidates take a pledge to be{' '}
        <strong>Independent, People Powered</strong> and Anti-Corruption. Learn
        more about our pledge.
      </SubTitle>
      {cards.map(card => (
        <PurpleCard key={card.title}>
          <CardTitle>
            <Icon src={`/images/application/${card.icon}`} alt="" />
            {card.title}
          </CardTitle>
          {card.checkboxes.map(item => (
            <CheckboxWrapper key={item.id}>
              <PurpleCheckbox
                value={state[item.id]}
                onChange={e => onChangeField(item.id, e.target.checked)}
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
