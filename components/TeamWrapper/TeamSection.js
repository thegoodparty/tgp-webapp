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
import { Body19, Font18 } from '../shared/typogrophy';
import MaxWidth from '../shared/MaxWidth';

const Wrapper = styled.section`

`;

const Members = styled.div``;

const Member = styled.div`
  cursor: pointer;
  perspective: 1000px;
  margin-bottom: 8px;
  padding: 8px;

  &.selected {
    .member-inner {
      transform: rotateY(180deg);
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-bottom: 24px;
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
  transform: rotateY(0deg);
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

const Body = styled.div`
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.1px;
`;

const Body13 = styled.div`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
`;

const Body11 = styled.div`
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
`;

const Tap = styled(Body19)`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;

const Name = styled(Body)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin: 8px 0 16px;
  font-size: 24px;
`;

const team = [
  {
    name: 'Tomer Almog',
    role: 'Chief Technology Officer',
    img: 'https://assets.goodparty.org/team/tomer-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/tomer-party.jpg',
    good: 'Building software for good.',
    perspective: 'Open source, non profit for the greater good!',
    party:
      'Father of 4, husband, pianist, former Olympic athlete (Taekwondo), surfer, painter, powered by plants.',
    partyRole: 'Peaceful Warrior',
    partyPerspective: 'The greatest illusion is the illusion of separation.',
  },
  {
    name: 'Jared Alper',
    role: 'Political Director',
    img: 'https://assets.goodparty.org/team/jared-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/jared-party.jpg',
    good: 'Give Independence a Try.',
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
    img: 'https://assets.goodparty.org/team/colton-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/colton-party.jpg',
    good: 'Let’s dare to build the future together.',
    perspective:
      'We can build a system that triumphs over the challenges of our time.',
    party: 'All the best ideas are on the brink of crazy.',
    partyRole: 'Radical Generalist',
    partyPerspective: 'There’s so much to care deeply about in the world.',
  },
  {
    name: 'Victoria Mitchell',
    role: 'Chief Mobilization Officer',
    img: 'https://assets.goodparty.org/team/victoria-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/victoria-party.jpg',
    good: 'Connection unlocks real change.',
    perspective:
      'Lived in almost every region of the US...I’m a blend of many perspectives.',
    party: 'Will instigate a party with anyone.',
    partyRole: 'Responsibly Wild Wanderer',
    partyPerspective:
      'We can strive for the good, be free, and have plenty of fun.',
  },
  {
    name: 'Farhad Mohit',
    role: 'Founder',
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
    name: 'Žak Tomich',
    role: 'Chief Operating Officer',
    img: 'https://assets.goodparty.org/team/zak-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/zak-party.jpg',
    good: 'Reinventing democracy one good day at a time.',
    perspective:
      'Dancing with red, made me feel blue; declared independence so you can too! ',
    party: 'Always laughing and learning with loved ones.',
    partyRole: 'Dad Joker',
    partyPerspective: 'It’s all invented!',
  },

  {
    name: 'Jack Nagel',
    role: 'Growth Marketer',
    img: 'https://assets.goodparty.org/team/jack-good.png',
    flipImg: 'https://assets.goodparty.org/team/jack-party.png',
    good: 'Because there is a better way.',
    perspective: 'Good people + more choices = a brighter future for all.',
    party: 'Seeking honesty in people and spaces.',
    partyRole: 'Curious Plant Dad',
    partyPerspective: "I'd rather have an opinion than be along for the ride.",
  },

  {
    name: 'Evan Scronce',
    role: 'Design',
    img: 'https://assets.goodparty.org/team/evan-good.png',
    flipImg: 'https://assets.goodparty.org/team/evan-party.png',
    good: 'Designing tools for good!',
    perspective: 'Sometimes the quietest voices have the loudest ideas.',
    party: 'Always going on adventures with family and friends.',
    partyRole: 'Dad',
    partyPerspective:
      'Trying to make a Good place for my kids with Good choices. ',
  },
];

function TeamSection() {
  const [selected, setSelected] = useState({});
  const [flipAll, setFlipAll] = useState(false);

  const handleSelected = (index) => {
    setSelected({
      ...selected,
      [index]: !selected[index],
    });
  };

  const handleFlipAll = () => {
    const all = {};
    team.forEach((member, index) => {
      all[index] = !flipAll;
    });
    setSelected(all);
    setFlipAll(!flipAll);
  };
  return (
    <Wrapper>
      <Tap onClick={handleFlipAll}>
        Tap to see our {flipAll ? 'Good' : 'Party'} side!
      </Tap>
      <Members className={flipAll && 'flipped'}>
        <Grid spacing={2} container>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Member
                onClick={() => handleSelected(index)}
                className={selected[index] ? 'selected' : 'not-selected'}
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
                    <Name>{member.name}</Name>
                    <Font18>
                      {member.role}
                    </Font18>
                    {/*<Body13 style={{ marginTop: '8px' }}>{member.good}</Body13>*/}
                    {/*<Body11 style={{ marginTop: '8px' }}>*/}
                    {/*  <i>{member.perspective}</i>*/}
                    {/*</Body11>*/}
                  </Front>
                  <Back>
                    <Img
                      src={member.flipImg}
                      className="full-image"
                      alt={member.name}
                      width={500}
                      height={500}
                    />
                    <Name>{member.name}</Name>
                    <Font18>
                      {member.partyRole}
                    </Font18>
                    {/*<Body13 style={{ marginTop: '8px' }}>{member.party}</Body13>*/}
                    {/*<Body11 style={{ marginTop: '8px' }}>*/}
                    {/*  <i>{member.partyPerspective}</i>*/}
                    {/*</Body11>*/}
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
                  <Name>{member.name}</Name>
                  <Body13>
                    {member.role}
                  </Body13>
                  {/*<Body13 style={{ marginTop: '8px' }}>*/}
                  {/*  {member.good.length > member.party.length*/}
                  {/*    ? member.good*/}
                  {/*    : member.party}*/}
                  {/*</Body13>*/}
                  {/*<Body11 style={{ marginTop: '8px' }}>*/}
                  {/*  <i>{member.perspective}</i>*/}
                  {/*</Body11>*/}
                </div>
              </Member>
            </Grid>
          ))}
        </Grid>
      </Members>
    </Wrapper>
  );
}

TeamSection.propTypes = {
  content: PropTypes.object,
};

export default TeamSection;
