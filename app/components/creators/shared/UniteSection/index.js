/**
 *
 * UniteSection
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Hidden } from '@material-ui/core';

import { Body, Body15 } from '../typography';
import { JoinNowButton } from '../buttons';
import { Join } from '../modals';
import Heads from '../Heads';

import LogoCaps from 'images/logo.svg';
import UniteTitle from 'images/title--unite.svg';
import SingleLineCreatorsTitle from 'images/title--creators_of_the_world.svg';
import MultiLineCreatorsTitle from 'images/title--creators_of_the_world_2.svg';

const SectionWrapper = styled.div`
  padding-bottom: 3rem;
  padding: 3rem 8rem 6rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    padding: 4rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 2rem;
  }
`;
const Audience = styled.p`
  text-align: center;
  margin: 3rem 0;
  color: ${({ theme }) => theme.colors.blue};
  font: normal 400 32px normal;
  font-family: unset;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 17px;
    line-height: 140%;
    margin: 1.5rem 0;
  }
`;

const Logo = styled.img`
  height: auto;
  cursor: pointer;
  margin: 0 1.5rem;
  top: -5px;
  position: relative;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    width: 30px;
    height: 25px;
    top: -2px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    width: 17px;
    height: 14px;
    top: -3px;
    margin: 0 0.6rem;
  }
`;

const LogoTitle = styled(Body)`
  margin: 4rem 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 24px;
    margin: 3rem 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 15px;
    margin: 2rem 0;
  }
`;

const CreatorsCount = styled.p`
  color: ${({ theme }) => theme.creators.colors.gray};
  font: normal 600 1.5rem normal;
  font-family: unset;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 20px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
  }
`;

const Description = styled.p`
  max-width: 45rem;
  margin: 0 auto;
  margin-top: 5rem;
  font: normal 400 28px normal;
  font-family: unset;
  color: ${({ theme }) => theme.creators.colors.gray};
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    max-width: none;
    margin-top: 3rem;
    font-size: 20px;
    padding: 0 4rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    margin-top: 2.5rem;
    font-size: 15px;
    padding: 0;
  }
`;

const TitleImg = styled.img`
  width: 100%;
  height: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
  }
`;
const SmBr = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.contentMax}) {
    display: inline-block;
  }
`
const SmPunct = styled.span`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.contentMax}) {
    display: inline;
  }
`
function UniteSection() {
  const [join, setJoin] = useState(false);
  return (
    <SectionWrapper>
      <Hidden xsDown>
        <TitleImg src={SingleLineCreatorsTitle} alt="creators" />
      </Hidden>
      <Hidden smUp>
        <TitleImg src={MultiLineCreatorsTitle} alt="creators" />
      </Hidden>
      {/* <Audience>
        Designers · Videographers · Podcasters <br /> Writers · Content
        Creators · Coders <SmPunct> · </SmPunct> <SmBr /> Influencers · Makers
      </Audience> */}
      <Audience>
        Designers · Videographers · Podcasters <br /> Writers · Content
        Creators · Coders ·  Influencers · Makers
      </Audience>
      <TitleImg src={UniteTitle} alt="unite" />
      <p className="text-center">
        <LogoTitle>
          Let's all build <Logo src={LogoCaps} alt="logo" /> the good party
        </LogoTitle>
      </p>
      <div className="text-center">
        <JoinNowButton
          variant="contained"
          color="primary"
          onClick={() => setJoin(true)}
        >
          Join Now
        </JoinNowButton>
        <Join open={join} handleClose={() => setJoin(false)} />
      </div>
      <CreatorsCount>640 Creators have joined so far</CreatorsCount>
      <Heads />
      <Description>
        The Good Party is a non-profit project with a simple plan to use good
        open-source tech to take back Democracy from big-money donors and
        crooked career politicians.
        <br />
        <br />
        We’re calling on Creators of the World to join us now to help create the
        free tech, messaging, visuals, audio, and stories that can organically
        reach and inspire millions of people. We’re also building the tools
        needed to disrupt the two-party system, and get good indie / grass-roots
        candidates elected so that we can change politics for Good!
        <br />
        <br />
        Help with any project you can from the list below or add your own. All
        projects are open-source and free for Good.
      </Description>
    </SectionWrapper>
  );
}

UniteSection.propTypes = {};

export default UniteSection;
