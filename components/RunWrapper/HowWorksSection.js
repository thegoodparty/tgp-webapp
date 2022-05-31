/**
 *
 * HowWorksSection
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Element } from 'react-scroll';

import { Font16, Font18, FontH2 } from '../shared/typogrophy';

const Section = styled.section`
  margin-top: 90px;
`;
const Line = styled.div`
  border-bottom: 1px solid #b6b6b6;
  width: 120px;
  margin: 12px auto 42px;
`;

const Box = styled.div`
  padding: 40px 20px 20px;
  border: 1px solid #e0dcdc;
  border-radius: 5px;
  text-align: left;
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  cursor: pointer;
  &.expanded {
    .content {
      display: block;
    }
  }

  .content {
    display: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  font-size: 45px;
  width: 100%;
  left: 0;
  text-align: center;
  top: -30px;
`;

const Title = styled(Font18)`
  font-weight: 900;
  margin-bottom: 24px;
  text-align: center;
`;

const Point = styled(Font16)`
  margin-bottom: 16px;
`;

const PointTitle = styled.div`
  margin: 16px 0;

  &.expanded {
    margin: 36px 0 16px;
    font-weight: 900;
  }
`;

export const HOW_WORKS_SECTIONS = [
  {
    title: 'Step 1: Pre-Launch',
    icon: '🚀',
    points: [
      {
        title: 'Launch Social Media',
        content:
          'Newsflash: the town square has moved online. To represent people, you have to meet them where they are. As a candidate, you have to get your story out to the community. Social media is the community. But you don’t have to wait until you launch a campaign to share your vision and engage with others. Don’t worry about mastering them all. Just pick a platform that works for you and get started! Then you can repurpose content across other platforms.',
      },
      {
        title: 'Know Your District Information',
        content:
          'Know your people! If you’re going to represent others, you need to know (and care) about them. We already have elected officials who don’t. Know what district you want to represent; what cities and towns are included; who lives there; what matters to them. Do they vote? How many? Who are you running against? If you don’t care, this isn’t for you.',
      },
      {
        title: 'Candidate Filing Requirements',
        content:
          'Once you know your people, you need to know the rules. The political establishment has stacked the deck against you, but it’s not impossible. But you have to know the rules of what makes you eligible to run and serve. Age and residency requirements, signatures to get on the ballot and fees.',
      },
      {
        title: 'Voter deep dive',
        content:
          'The two major parties purposely claim Independents or Third Parties can’t win. They don’t want voters to have other choices. But they get elected by less than a majority of their district. That means many millions of people are not represented and don’t have choices. Your job is to know how many of them there are and find them!',
      },
      {
        title: 'Develop a Campaign Plan',
        content:
          'Once you’ve done the above work, it’s time to create a plan. The most successful campaigns find their key message, stick to it and relentlessly pursue their key objectives. We can help you with that!',
      },
    ],
  },
  {
    title: 'Step 2: Running',
    icon: '🏃',
    points: [
      {
        title: 'Announce Your Campaign With A Launch Event',
        content:
          'Ready for launch! Launches come in many forms but the goal is the same: Make an attention-grabbing statement from the start. This is your first chance to put it all together - early supporters, event planning, local press, social media - and get people excited. If you don’t tell them about you, they’ll never know.',
      },
      {
        title: 'Grow Your Following',
        content:
          'To defeat the two-party duopoly credibility is key. People need evidence that your campaign is viable. That’s why Good Party allows you to show and share progress toward key campaign goals. Social media lets you grow awareness for free. Activate your early supporters and volunteers to use Good Party to spread the word and grow your following!',
      },
      {
        title: 'Get Your Name On The Ballot',
        content:
          'People can’t vote for you if you aren’t on the ballot. This is where your early research about your district, voters, and the rules are key. It’s also a great first opportunity for volunteers to get involved and help you gather signatures. Every state has different requirements and deadlines, so find out about yours ASAP!',
      },
      {
        title: 'Raise the Money You Need',
        content:
          'Unfortunately, raising money is still a necessary evil in order to run a competitive campaign. Fundraising can be overwhelming so it’s critical to set up good systems to manage the process. We can provide you with tips and best practices on how to run a strong, people-powered fundraising operation.',
      },
    ],
  },
  {
    title: 'Step 3: Winning',
    icon: '🗳️',
    points: [
      {
        title: 'Mobilize Volunteers',
        content:
          'A government for the people and of the people is powered by people. An energized base of volunteers is the backbone of a successful campaign - and democracy! Texting, sharing memes and GIFs are just as much a part of campaigns as phone banking and knocking on doors. The majority of Americans feel unrepresented by Red and Blue incumbents and are ready to unite around your campaign to defeat the duopoly.',
      },
      {
        title: 'Register Voters',
        content:
          'While people everywhere can spread the word about your campaign, only certain people can vote for you. But first, they have to register to vote. By attracting followers to endorse your campaign on Good Party, we help you find out who and how many of your supporters can do just that!',
      },
      {
        title: 'Get Out The Vote (GOTV)',
        content:
          'While you should expect to work like never before from the day you announce you’re running, once the home stretch of your election rolls around it’s GO Time! As in, Get Out The Vote (GOTV) time. In the final few weeks before Election Day, your focus has to shift to making sure ALL those supporters you’ve attracted along the way actually vote! Good Party tools will help you make sure your supporters know how and where to request their ballots, where to mail them in or drop them off, or where their polling location is so they can vote for you. We make it easy for them to spread the word and encourage others to do the same!',
      },
    ],
  },
];
function HowWorksSection() {
  const [expanded, setExpanded] = useState([false, false, false]);
  const expandCollapse = (index) => {
    const updated = [...expanded];
    updated[index] = !expanded[index];
    setExpanded(updated);
  };

  return (
    <Section>
      <Element name="questions">
        <FontH2 id="how" data-cy="howworks-title">
          How a campaign works
          <Line />
        </FontH2>
      </Element>
      <Grid container spacing={6}>
        {HOW_WORKS_SECTIONS.map((box, index) => (
          <Grid item xs={12} key={box.title} data-cy="howworks-box">
            <Box
              onClick={() => {
                expandCollapse(index);
              }}
              className={expanded[index] && 'expanded'}
            >
              <Icon>{box.icon}</Icon>
              <Title data-cy="howworks-box-title">{box.title}</Title>

              {box.points.map((point) => (
                <Point key={point.title} data-cy="howworks-box-point">
                  <PointTitle
                    className={expanded[index] && 'expanded'}
                    data-cy="howworks-box-point-title"
                  >
                    {point.title}
                  </PointTitle>
                  <div className="content" data-cy="howworks-box-point-content">
                    {point.content}
                  </div>
                </Point>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

HowWorksSection.propTypes = {};

export default HowWorksSection;
