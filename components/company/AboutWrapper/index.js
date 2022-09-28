/**
 *
 * AboutWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PageWrapper from '../../shared/PageWrapper';
import { AboutPageContext } from '../../../containers/company/AboutPage';
import FeaturedCampaigns from './FeaturedCampaigns';

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

function AboutWrapper() {
  const featuredCandidates = useContext(AboutPageContext).featuredCandidates;
  return (
    <PageWrapper>
      <H1 data-cy="about-title">What is Good Party?</H1>
      <Intro data-cy="about-description">
        Good Party is <strong>not a political party</strong>. We’re building
        tools to change the rules and a movement of people to disrupt the
        corrupt!
        <br />
        <br />
        Our work has two parts: One is building free, open-source tools to{' '}
        <strong>connect voters looking for an alternative</strong> to the
        two-party system{' '}
        <strong>with honest, independent, and people-powered candidates</strong>
        . The other is mobilizing a movement of digital natives – who will be
        the majority of voters by 2024 – to believe they can seize the memes of
        production and <strong>change politics for good!</strong>
        <br />
        <br />
        As we grow, we will show that independent, grassroots candidates from
        across the political spectrum have{' '}
        <strong>a real chance of running and winning elections</strong>, for the
        first time in modern history!{' '}
        <Link href="/register" passHref>
          <a className="underline">Join Us</a>
        </Link>
      </Intro>
      <H2>Who is Good Party?</H2>
      <Intro>
        Good Party is a group of concerned citizens, independent-minded
        activists and technologists who believe that our democracy is in peril
        and we need to do all that we can to save it. We are self-funded,
        putting our own time and money to this important cause, and stay
        independent of any political parties or associations. Meet our team{' '}
        <Link href="/register" passHref>
          <a className="underline">here</a>
        </Link>
        .
      </Intro>
      <H2>Why Good Party?</H2>
      <Intro>
        Our democracy has been <strong>corrupted by a two-party system</strong>{' '}
        that serves moneyed interests. It leaves people apathetic, or having to
        choose between the lesser of two evils, neither of which truly serve
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
        <strong>neither Republicans, nor Democrats represent them</strong>. It’s
        time to declare independence from the corrupt two-party system.
      </Intro>
      <FeaturedCampaigns
        featuredCandidates={featuredCandidates}
        removePadding
        title="Meet some Good Party Certified Candidates"
      />
    </PageWrapper>
  );
}

AboutWrapper.propTypes = {};

export default AboutWrapper;
