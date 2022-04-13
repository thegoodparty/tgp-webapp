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
const points = [
  {
    color: '#29ADE6',
    title: 'Launch',
    content:
      'We provide a platform for you to meet indie grassroots candidates and for good candidates to run free campaigns. No more big dollar donations necessary.',
  },
  {
    color: '#CA2CCD',
    title: 'Grow',
    content:
      'You can make a difference in getting good candidates elected, by simply clicking “endorse” and sharing with your friends. We will never ask you for a donation.',
  },
  {
    color: '#F6821F',
    title: 'Win',
    content:
      'With your help, our free and open technology is diversifying the political landscape in the U.S., by allowing good indie candidates to run and win elections without relying on big donations.',
  },
];
function AboutWrapper() {
  const featuredCandidates = useContext(AboutPageContext).featuredCandidates;
  return (
    <PageWrapper>
      <H1>What does Good Party do?</H1>
      <Intro>
        Hi there!
        <br />
        <br />
        Thanks for coming here to find out more.
        <br />
        <br />
        First (and most importantly) we are NOT a political party. We are a
        digital grassroots movement for political change.
        <br />
        <br />
        Our goal is to get money out of politics and allow indie candidates to
        run and win!
        <br />
        <br />
        We do this by building free and open-source technology that allows good
        people to run crowd-voting campaigns and win! Just like GoFundMe or
        change.org, but for politics!
        <br />
        <br />
        We empower people to join together, vote different and make a BIG
        impact.
      </Intro>
      <H2>How Crowd Voting Works:</H2>
      {points.map((point) => (
        <Point key={point.title}>
          <Color style={{ backgroundColor: point.color }}></Color>
          <div>
            <strong>{point.title}</strong>
            <br />
            {point.content}
          </div>
        </Point>
      ))}
      <FeaturedCampaigns featuredCandidates={featuredCandidates} />
    </PageWrapper>
  );
}

AboutWrapper.propTypes = {};

export default AboutWrapper;
