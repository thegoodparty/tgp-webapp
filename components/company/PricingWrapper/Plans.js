/**
 *
 * PricingWrapper
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';

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
    price: 'Free',
    subtitle: 'Free tools to grow awareness and show viability',
    features: basicFeatures,
  },
  {
    name: 'Pro',
    price: 'Coming Soon',
    subtitle: 'Helping you stay connected and serve supporters while you serve',
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
    subtitle:
      'All-inclusive tools and built to scale national, grassroots movements for large organizations doing Good! Includes strategy and consulting services.',
    features: [],
  },
];

const Plan = styled.div`
  padding: 32px;
  border-radius: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 44px;
  }

  &.active {
    background-color: #f3f3f3;
  }
`;

const H3 = styled.h3`
  font-weight: 900;
  font-size: 45px;
  letter-spacing: 0.2px;
  margin: 38px 0 40px;
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
`;
function Plans() {
  return (
    <Grid container spacing={6}>
      {plans.map((plan) => (
        <Grid item xs={12} lg={4}>
          <Plan className={plan.name === 'Starter' && 'active'}>
            <BlackButton className="pill">{plan.name}</BlackButton>
            <H3>{plan.price}</H3>
            <SubTitle>{plan.subtitle}</SubTitle>
            <BlackButton
              fullWidth
              className={plan.name !== 'Starter' && 'outline'}
            >
              GET STARTED
            </BlackButton>
            <br />
            <br />
            {plan.features.map((feature) => (
              <Feature>
                <strong>{feature.title}</strong>
                {feature.description}
              </Feature>
            ))}
          </Plan>
        </Grid>
      ))}
    </Grid>
  );
}

export default Plans;
