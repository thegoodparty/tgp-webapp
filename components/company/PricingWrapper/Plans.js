/**
 *
 * PricingWrapper
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Link from 'next/link';
import BlackButton from '../../shared/buttons/BlackButton';
import GrayButton from '../../shared/buttons/GrayButton';

const basicFeatures = [
  { title: 'Campaign Page', description: 'Introduce yourself to users' },
  {
    title: 'Milestone Tracker',
    description: 'To help you track your progress',
  },
  {
    title: 'Viability Meter',
    description: 'Give supporters hope by showing your campaign can win',
  },
  {
    title: 'The Feed',
    description:
      'Aggregate your social content in one convenient, easy to share place',
  },
  {
    title: 'Issues / Endorsers',
    description: 'Let people know where you stand and who stands with you',
  },
  {
    title: 'Campaign Updates & Notifications',
    description: 'Let followers know how they can get involved',
  },
  {
    title: 'Analytics',
    description: 'See how your page and content are performing',
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'Free Trial*',
    link: '/run',
    subtitle: (
      <div>
        <i>*$5.99/mo. starting in 2024</i>
        <br />
        <br />
        Free tools to grow awareness and show viability
      </div>
    ),
    features: basicFeatures,
    buttonLabel: 'GET STARTED',
  },
  {
    name: 'Pro',
    price: '$19.99/mo',
    link: '/run',
    subtitle: 'Helping you stay connected and serve supporters while you serve',
    buttonLabel: 'COMING SOON',
    features: [
      ...basicFeatures,
      {
        title: 'Transparency Toolkit',
        description: 'Shared public calendar, meetings, documents and media',
      },
      {
        title: 'Crowd-voting',
        description:
          'Meaningful connection with constituents on issues that matter',
      },
      {
        title: 'Follower Follow-up',
        description:
          'Citizen relationship management tools for continued engagement',
      },
      {
        title: 'Data Insights',
        description: 'Deeper dive into your district and diverse constituency',
      },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    link: '/contact',
    subtitle:
      'All-inclusive tools and built to scale national, grassroots movements for large organizations doing Good! Includes strategy and consulting services.',
    features: [],
    buttonLabel: 'CONTACT US',
  },
];

const Plan = styled.div`
  padding: 32px;
  border-radius: 24px;
  display: none;
  &.mobile-active {
    display: block;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 44px;
    display: block;
    margin: 0 12px;
    &.gray {
      background-color: #f3f3f3;
    }
  }
`;

const H3 = styled.h3`
  font-weight: 900;
  font-size: 45px;
  letter-spacing: 0.2px;
  margin: 0 0 40px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 60px;
  }
`;

const SubTitle = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0.2px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    min-height: 120px;
  }
`;

const Feature = styled.div`
  margin-top: 24px;
  line-height: 20px;
  font-size: 14px;
  color: #868686;
  strong {
    color: #000;
    margin-bottom: 8px;
    display: block;
  }
  &.black {
    color: #000;
  }
`;

const Tabs = styled.div`
  background-color: #d3d3d3;
  margin-bottom: 40px;
  font-size: 15px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tab = styled.div`
  padding: 12px 19px;
  border-radius: 32px;
  text-transform: uppercase;
  cursor: pointer;
  &.active {
    color: #fff;
    background-color: #000;
    cursor: initial;
  }
`;

function Plans() {
  const [active, setActive] = useState('Starter');
  return (
    <>
      <Hidden mdUp>
        <Tabs>
          {plans.map((plan) => (
            <React.Fragment key={plan.name}>
              <Tab
                className={active === plan.name && 'active'}
                onClick={() => setActive(plan.name)}
              >
                {plan.name}
              </Tab>
            </React.Fragment>
          ))}
        </Tabs>
      </Hidden>
      <Grid container spacing={0}>
        {plans.map((plan) => (
          <Grid item xs={12} lg={4} key={plan.name}>
            <Plan
              className={`${plan.name === 'Starter' && 'gray'} ${
                active === plan.name && 'mobile-active'
              }`}
            >
              <Hidden lgDown>
                <BlackButton
                  className={`pill black-disabled ${
                    plan.name !== 'Starter' && 'outlined'
                  }`}
                  disabled
                >
                  {plan.name}
                </BlackButton>
              </Hidden>
              <H3>{plan.price}</H3>
              <SubTitle>{plan.subtitle}</SubTitle>
              <Link
                href={plan.link}
                id={`pricing-get-started-${plan.name}`}
                className="no-underline"
              >
                {plan.name === 'Starter' ? (
                  <BlackButton fullWidth>{plan.buttonLabel}</BlackButton>
                ) : (
                  <GrayButton fullWidth>{plan.buttonLabel}</GrayButton>
                )}
              </Link>

              <br />
              <br />
              {plan.features.map((feature, index) => (
                <Feature
                  key={feature.title}
                  className={index > basicFeatures.length - 1 && 'black'}
                >
                  <strong>{feature.title}</strong>
                  {feature.description}
                </Feature>
              ))}
            </Plan>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Plans;
