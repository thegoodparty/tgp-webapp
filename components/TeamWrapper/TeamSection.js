/**
 *
 * TeamSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { Body11, Body13, H1, H2 } from '../shared/typogrophy';
import { MaxContent } from './index';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.grayE};
  padding: 48px 0;
`;

const Members = styled.div`
  width: 600px;
  margin: 24px auto;
`;

const Member = styled.div`
  cursor: pointer;

  &.selected {
    animation: flip-vertical-right 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      both;
  }

  @keyframes flip-vertical-right {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(180deg);
    }
  }

  .member {
    display: none;
  }

  &.straight .straight {
    display: block;
  }

  &.left .left {
    display: block;
  }

  &.right .right {
    display: block;
  }

  &.up .up {
    display: block;
  }

  &.down .down {
    display: block;
  }

  &.top-left .top-left {
    display: block;
  }

  &.top-right .top-right {
    display: block;
  }

  &.bottom-left .bottom-left {
    display: block;
  }

  &.bottom-right .bottom-right {
    display: block;
  }

  &.selected .selected {
    display: block;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const team = [
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },

  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },

  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
  { name: 'Tomer Almog', role: 'CTO', folder: 'tomer-almog' },
];

function TeamSection() {
  const [hovered, setHovered] = useState(false);

  const imgDirection = index => {
    if (hovered === false) {
      return 'straight';
    }
    if (index === hovered) {
      return 'selected';
    }
    const row = parseInt(index / 3, 10);
    const hoveredRow = parseInt(hovered / 3, 10);
    if (row === hoveredRow) {
      if (index > hovered) {
        return 'left';
      }
      if (index === hovered) {
        return 'straing';
      }
      if (index < hovered) {
        return 'right';
      }
    }

    const column = index % 3;
    const hoveredColumn = hovered % 3;
    if (column === hoveredColumn) {
      if (index > hovered) {
        return 'up';
      }
      if (index === hovered) {
        return 'straing';
      }
      if (index < hovered) {
        return 'down';
      }
    }

    // diagonals
    if (row > hoveredRow && column > hoveredColumn) {
      return 'top-left';
    }
    if (row < hoveredRow && column > hoveredColumn) {
      return 'bottom-left';
    }
    if (row > hoveredRow && column < hoveredColumn) {
      return 'top-right';
    }
    if (row < hoveredRow && column < hoveredColumn) {
      return 'bottom-right';
    }

    return `straight- ${row} ${column}`;
  };
  return (
    <Wrapper>
      <MaxContent className="text-center">
        <H2>Meet our team</H2>
        <br />
        <Hidden smDown>
          <Members onMouseLeave={() => setHovered(false)}>
            <Grid spacing={2} container alignItems="center" justify="enter">
              {team.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Member
                    onMouseEnter={() => {
                      setHovered(index);
                    }}
                    className={`${imgDirection(index)} ${
                      hovered === index ? 'selected' : ''
                    }`}
                  >
                    <Img
                      src={`images/team/${member.folder}/straight.jpg`}
                      className="member straight"
                    />
                    <Img
                      src={`images/team/${member.folder}/left.jpg`}
                      className="member left"
                    />
                    <Img
                      src={`images/team/${member.folder}/right.jpg`}
                      className="member right"
                    />
                    <Img
                      src={`images/team/${member.folder}/up.jpg`}
                      className="member up"
                    />
                    <Img
                      src={`images/team/${member.folder}/down.jpg`}
                      className="member down"
                    />
                    <Img
                      src={`images/team/${member.folder}/top-left.jpg`}
                      className="member top-left"
                    />
                    <Img
                      src={`images/team/${member.folder}/top-right.jpg`}
                      className="member top-right"
                    />
                    <Img
                      src={`images/team/${member.folder}/bottom-left.jpg`}
                      className="member bottom-left"
                    />
                    <Img
                      src={`images/team/${member.folder}/bottom-right.jpg`}
                      className="member bottom-right"
                    />
                    <Img
                      src={`images/team/${member.folder}/party.jpg`}
                      className="member selected"
                    />
                    <br/>
                    <Body11>{member.name}</Body11>
                    <Body11>{member.role}</Body11>
                  </Member>
                </Grid>
              ))}
            </Grid>
          </Members>
        </Hidden>

        <Hidden mdUp>
          <Members>
            <Grid spacing={2} container alignItems="center" justify="enter">
              {team.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Member>
                    <Img
                      src={`images/team/${member.folder}/straight.jpg`}
                    />
                    <Body11>{member.name}</Body11>
                  </Member>
                </Grid>
              ))}
            </Grid>
          </Members>
        </Hidden>
      </MaxContent>
    </Wrapper>
  );
}

TeamSection.propTypes = {
  content: PropTypes.object,
};

export default TeamSection;
