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
import { Body19, Font18 } from '../../shared/typogrophy';

const Wrapper = styled.section``;

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

  .hide {
    opacity: 0;
    pointer-events: none;
  }
`;

const Img = styled(Image)`
  display: block;
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

export const TEAM_MEMBERS = [
  {
    name: 'Tomer Almog',
    role: 'Chief Technology Officer',
    img: 'https://assets.goodparty.org/team/tomer-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/tomer-party.jpg',
    partyRole: 'Peaceful Warrior',
  },
  {
    name: 'Jared Alper',
    role: 'Political Director',
    img: 'https://assets.goodparty.org/team/jared-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/jared-party.jpg',
    partyRole: 'Improviser',
  },
  {
    name: 'Gabby Coll',
    role: 'Jr. Product Designer',
    img: 'https://assets.goodparty.org/team/gabby-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/gabby-party.jpg',
    partyRole: 'Community+based curator+creative',
  },
  {
    name: 'Martha Gakunju',
    role: 'People & Culture Coordinator',
    img: 'https://assets.goodparty.org/team/martha-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/martha-party.jpg',
    partyRole: 'Safari-er',
  },
  {
    name: 'Colton Hess ',
    role: 'Creator Community Lead',
    img: 'https://assets.goodparty.org/team/colton-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/colton-party.jpg',
    partyRole: 'Radical Generalist',
  },
  {
    name: 'Victoria Mitchell',
    role: 'Chief Mobilization Officer',
    img: 'https://assets.goodparty.org/team/victoria-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/victoria-party.jpg',
    partyRole: 'Responsibly Wild Wanderer',
  },
  {
    name: 'Farhad Mohit',
    role: 'Founder',
    img: 'https://assets.goodparty.org/team/farhad-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/farhad-party.jpg',
    partyRole: 'Burner',
  },

  {
    name: 'Jack Nagel',
    role: 'Marketing Manager',
    img: 'https://assets.goodparty.org/team/jack-good.png',
    flipImg: 'https://assets.goodparty.org/team/jack-party.png',
    partyRole: 'Curious Plant Dad',
  },

  {
    name: 'Evan Scronce',
    role: 'Design',
    img: 'https://assets.goodparty.org/team/evan-good.png',
    flipImg: 'https://assets.goodparty.org/team/evan-party.png',
    partyRole: 'Dad',
  },

  {
    name: 'Žak Tomich',
    role: 'Chief Operating Officer',
    img: 'https://assets.goodparty.org/team/zak-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/zak-party.jpg',
    partyRole: 'Dad Joker',
  },

  {
    name: 'Bo Triplett',
    role: 'Director of Partnerships and Innovation',
    img: 'https://assets.goodparty.org/team/bo-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/bo-party.jpg',
    partyRole: 'The Record Man',
  },

  {
    name: 'Matthew Wardenaar',
    role: 'Director of Product Management',
    img: 'https://assets.goodparty.org/team/matthew-good.jpg',
    flipImg: 'https://assets.goodparty.org/team/matthew-party.jpg',
    partyRole: 'Social Storyteller',
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
    TEAM_MEMBERS.forEach((member, index) => {
      all[index] = !flipAll;
    });
    setSelected(all);
    setFlipAll(!flipAll);
  };
  return (
    <Wrapper>
      <Tap onClick={handleFlipAll} data-cy="team-section-tap">
        Tap to see our {flipAll ? 'Good' : 'Party'} side!
      </Tap>
      <Members className={flipAll && 'flipped'}>
        <Grid spacing={2} container>
          {TEAM_MEMBERS.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              data-cy="team-member"
            >
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
                      data-cy="member-avatar"
                    />
                    <Name data-cy="member-name">{member.name}</Name>
                    <Font18 data-cy="member-role">{member.role}</Font18>
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
                      data-cy="member-flip-avatar"
                    />
                    <Name>{member.name}</Name>
                    <Font18 data-cy="member-party-role">
                      {member.partyRole}
                    </Font18>
                    {/*<Body13 style={{ marginTop: '8px' }}>{member.party}</Body13>*/}
                    {/*<Body11 style={{ marginTop: '8px' }}>*/}
                    {/*  <i>{member.partyPerspective}</i>*/}
                    {/*</Body11>*/}
                  </Back>
                </MemberInner>
                <div className="hide">
                  <Img
                    src={member.img}
                    className="full-image"
                    width={500}
                    height={500}
                    alt={member.name}
                  />
                  <Name>{member.name}</Name>
                  <Body13>{member.role}</Body13>
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
