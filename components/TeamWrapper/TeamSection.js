/**
 *
 * TeamSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

import { Body, Body13, Body11 } from '../shared/typogrophy';

const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.grayE};
  padding: 32px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 64px 0;
  }
`;

const Members = styled.div``;

const StyledH2 = styled.h2`
  font-size: 27px;
  line-height: 35px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 40px;
    line-height: 48px;
  }
`;

const Member = styled.div`
  cursor: pointer;
  perspective: 1000px;
  margin-bottom: 24px;
  padding: 8px;

  &.selected {
    .member-inner {
      transform: rotateY(180deg);
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    &:hover {
      .member-inner {
        transform: rotateY(180deg);
      }
    }
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const Img = styled(Image)`
  display: block;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const MemberInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const team = [
  {
    name: 'Farhad Mohit',
    role: 'Founder',
    link: 'http://www.farhadmohit.com',
    img: 'https://assets.goodparty.org/team/farhad-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/farhad-party.jpg',
    good: 'Working on a Good Party for all!',
    perspective:
      '(AI + Robotics) x Moore’s Law, means that with the right rules, material concerns (food, shelter, health, safety) can all be sustainably provided for everyone!',
    party:
      'I camp at YOUniversal at Burning Man; come by for exotic desert treats and artisan elixirs.',
    partyRole: 'Burner',
    partyPerspective:
      'Immortal until proven otherwise; I love people and create things!',
  },

  {
    name: 'Victoria Mitchell',
    role: 'Chief Mobilization Officer',
    link: 'http://www.victoriapmitchell.com',
    img: 'https://assets.goodparty.org/team/victoria-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/victoria-party.jpg',
    good: 'Connection unlocks real change',
    perspective:
      'Lived in almost every region of the US...I’m a blend of many perspectives',
    party: 'Will instigate a party with anyone',
    partyRole: 'Responsibly Wild Wanderer',
    partyPerspective:
      'We can strive for the good, be free, and have plenty of fun',
  },

  {
    name: 'Žak Tomich',
    role: 'Chief Operating Officer',
    link: 'https://www.linkedin.com/in/zaktomich/',
    img: 'https://assets.goodparty.org/team/zak-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/zak-party.jpg',
    good: 'Reinventing democracy one good day at a time.',
    perspective:
      'Dancing with red, made me feel blue; declared independence so you can too! ',
    party: 'Always laughing, learning and with loved ones.',
    partyRole: 'Dad Joker',
    partyPerspective: 'It’s all invented!',
  },

  {
    name: 'Tomer Almog',
    role: 'Chief Technology Officer',
    link: 'https://www.facebook.com/tomer.almog.7',
    img: 'https://assets.goodparty.org/team/tomer-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/tomer-party.jpg',
    good: 'Building software for good.',
    perspective: 'Open source, non profit for the greater good!',
    party:
      'Father of 4, husband, pianist, former Olympic athlete (Taekwondo), surfer, painter, vegan.',
    partyRole: 'Inner Warrior',
    partyPerspective: 'The greatest illusion is the illusion of separation',
  },

  {
    name: 'Jed Wheeler',
    role: 'Product Guy',
    link: 'https://jedwheeler.com',
    img: 'https://assets.goodparty.org/team/jed-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/jed-party.jpg',
    good: 'Building tools for Democracy',
    perspective: 'For the self-emancipation of humanity',
    party: 'Activist, organizer, maker, gardener',
    partyRole: 'Dad',
    partyPerspective: 'I just want a habitable planet for my kids',
  },

  {
    name: 'Jared Alper',
    role: 'Political Director',
    link: 'https://www.facebook.com/tomer.almog.7',
    img: 'https://assets.goodparty.org/team/jared-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/jared-party.jpg',
    good: 'Give Independence a Try',
    perspective:
      'Never doubt that a small group of thoughtful, committed, citizens can change the world.',
    party: 'Time is our most precious resource. Spend it well.',
    partyRole: 'Improviser',
    partyPerspective:
      'I’d rather laugh with the sinners than cry with the saints.',
  },

  {
    name: 'Colton Hess ',
    role: 'Content Strategist',
    link: '#',
    img: 'https://assets.goodparty.org/team/colton-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/colton-party.jpg',
    good: 'Let’s dare to build the future together.',
    perspective:
      'We can build a system that triumphs over the challenges of our time.',
    party: 'All the best ideas are on the brink of crazy.',
    partyRole: 'Radical Generalist',
    partyPerspective: 'There’s so much to care deeply about in the world.',
  },
];

function TeamSection() {
  const [selected, setSelected] = useState(false);

  const handleSelected = index => {
    console.log(index, selected);
    if (selected === index) {
      setSelected(false);
    } else {
      setSelected(index);
    }
  };
  return (
    <Wrapper>
      <MaxContent>
        <StyledH2 className="text-center">Core team</StyledH2>
        <br />
        <Members>
          <Grid spacing={2} container>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Member
                  onClick={() => handleSelected(index)}
                  className={index === selected && 'selected'}
                >
                  <MemberInner className="member-inner">
                    <Front>
                      <Img
                        src={member.img}
                        className="full-image"
                        alt={member.name}
                        width={500}
                        height={500}
                      />
                      <Body>
                        <strong>
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            {member.name}
                          </a>
                        </strong>
                      </Body>
                      <Body13>
                        <strong>{member.role}</strong>
                      </Body13>
                      <Body13 style={{ marginTop: '8px' }}>
                        {member.good}
                      </Body13>
                      <Body11 style={{ marginTop: '8px' }}>
                        <i>{member.perspective}</i>
                      </Body11>
                    </Front>
                    <Back>
                      <Img
                        src={member.flipImg}
                        className="full-image"
                        alt={member.name}
                        width={500}
                        height={500}
                      />
                      <Body>
                        <strong>
                          <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                          >
                            {member.name}
                          </a>
                        </strong>
                      </Body>
                      <Body13>
                        <strong>{member.partyRole}</strong>
                      </Body13>
                      <Body13 style={{ marginTop: '8px' }}>
                        {member.party}
                      </Body13>
                      <Body11 style={{ marginTop: '8px' }}>
                        <i>{member.partyPerspective}</i>
                      </Body11>
                    </Back>
                  </MemberInner>
                  <div className="hidden">
                    <Img
                      src={member.img}
                      className="full-image"
                      width={500}
                      height={500}
                      alt={member.name}
                    />
                    <Body13>
                      <strong>{member.role}</strong>
                    </Body13>
                    <Body13 style={{ marginTop: '8px' }}>
                      {member.good.length > member.party.length
                        ? member.good
                        : member.party}
                    </Body13>
                    <Body11 style={{ marginTop: '8px' }}>
                      <i>{member.perspective}</i>
                    </Body11>
                  </div>
                </Member>
              </Grid>
            ))}
          </Grid>
        </Members>
      </MaxContent>
    </Wrapper>
  );
}

TeamSection.propTypes = {
  content: PropTypes.object,
};

export default TeamSection;
