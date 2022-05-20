/**
 *
 * AboutWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import PageWrapper from '../shared/PageWrapper';
import { AboutPageContext } from '../../containers/AboutPage';
import FeaturedCampaigns from '../HomePageWrapper/FeaturedCampaigns';
import { CROWD_VOTING_POINTS } from '../../utils/constants';

const H1 = styled.h1`
  margin: 80px 0 40px;
  font-size: 48px;
  font-weight: 900;
`;

const Intro = styled.div`
  font-size: 20px;
  line-height: 27px;
`;

const H2 = styled.h2`
  margin: 90px 0 70px;
  font-size: 48px;
  font-weight: 900;
`;

const Point = styled.div`
  display: flex;
  margin-bottom: 100px;
  font-size: 20px;
  line-height: 27px;
  max-width: 720px;
`;

const Color = styled.div`
  width: 10px;
  margin-right: 36px;
`;
function AboutWrapper() {
  const featuredCandidates = useContext(AboutPageContext).featuredCandidates;
  return (
    <PageWrapper>
      <H1 data-cy="about-title">What does Good Party do?</H1>
      <Intro data-cy="about-description">
        Our democracy has been <strong>corrupted by a two-party system</strong>{' '}
        that serves moneyed interests. It leaves people apathetic, or having to
        choose between the lesser of two evils. Neither of which truly serve
        them. So, important issues continue to go unaddressed.
        <br />
        <br />
        Whether you’re concerned about the climate, privacy, inequality, or our
        individual freedoms, all are{' '}
        <strong>
          hampered by the dark doom-loop of dysfunctional partisan politics.
        </strong>
        <br />
        <br />
        It’s no wonder that a majority of eligible voters (over 130M Americans),
        including more than half of Millennials and Gen Z, say that{' '}
        <strong>neither Republicans, nor Democrats represent them</strong>.
        <br />
        <br />
        Good Party is <strong>not a political party</strong>. We’re building
        tools to change the rules and disrupt the corrupt, creating a brighter
        future for all!
        <br />
        <br />
        Our plan is to use the free, open-source tech we create as a lever that
        marshals the creative community and mobilizes digital natives – who will
        be the majority of voters by 2024 – to <strong>vote differently</strong>
        .
        <br />
        <br />
        As they do, we’ll be building a viral, growing movement that gives truly
        independent, grassroots candidates from across the political spectrum{' '}
        <strong>a real chance of running and winning elections</strong>, for the
        first time in modern history!
      </Intro>
      <H2 data-cy="crowd-voting-title">How Crowd Voting Works:</H2>
      {CROWD_VOTING_POINTS.map((point) => (
        <Point key={point.title} data-cy="crowd-voting-point">
          <Color style={{ backgroundColor: point.color }} data-cy="crowd-voting-point-color"></Color>
          <div data-cy="crowd-voting-point-content">
            <strong>{point.title}</strong>
            <br />
            {point.content}
          </div>
        </Point>
      ))}
      <FeaturedCampaigns featuredCandidates={featuredCandidates} removePadding />

    </PageWrapper>
  );
}

AboutWrapper.propTypes = {};

export default AboutWrapper;
