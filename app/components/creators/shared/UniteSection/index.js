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
import Heads from '../Heads';

import LogoCaps from 'images/logo.svg';
import UniteTitle from 'images/title--unite.svg';
import SingleLineCreatorsTitle from 'images/title--creators_of_the_world.svg';
import MultiLineCreatorsTitle from 'images/title--creators_of_the_world_2.svg';

const SectionWrapper = styled.div`
  padding-bottom: 3rem;
  padding: 3rem 8rem 6rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    padding: 4rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    padding: 2rem;
  }
`;
const Audience = styled.p`
  text-align: center;
  margin: 3rem 0;
  color: ${({ theme }) => theme.colors.blue};
  font: normal 500 32px normal;
  font-family: unset;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    font-size: 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
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
      theme.creators.breakpoints.creatorsTablet}) {
    width: 30px;
    height: 25px;
    top: -2px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    width: 17px;
    height: 14px;
    top: -3px;
    margin: 0 0.6rem;
  }
`;

const LogoTitle = styled(Body)`
  margin: 4rem 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    font-size: 24px;
    margin: 3rem 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    font-size: 15px;
    margin: 2rem 0;
  }
`;

const CreatorsCount = styled.p`
  color: black;
  font: normal 500 18px normal;
  font-family: unset;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    font-size: 15px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    font-size: 13px;
  }
`;

const Description = styled.p`
  max-width: 45rem;
  margin: 0 auto;
  margin-top: 5rem;
  font: normal 400 24px normal;
  line-height: 1.5;
  font-family: unset;
  color: ${({ theme }) => theme.creators.colors.darkGray};
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
    max-width: none;
    margin-top: 3rem;
    font-size: 20px;
    padding: 0 4rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    margin-top: 2.5rem;
    line-height: 1.3;
    font-size: 15px;
    padding: 0;
  }
`;

const TitleImg = styled.img`
  width: 100%;
  height: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsTablet}) {
  }
`;
const SmBr = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    display: inline-block;
  }
`;
const SmPunct = styled.span`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    display: inline;
  }
`;
function UniteSection({ user, toggleJoin }) {
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
        Designers · Videographers · Podcasters · Writers · Content
        Creators · Coders ·  Influencers · Makers
      </Audience>
      <TitleImg src={UniteTitle} alt="unite" />
      <p className="text-center">
        <LogoTitle>
          Let's all build <Logo src={LogoCaps} alt="logo" /> the good party
        </LogoTitle>
      </p>
      {!user && (
        <>
          <div className="text-center">
            <JoinNowButton
              variant="contained"
              color="primary"
              onClick={() => toggleJoin(true)}
            >
              Join Now
            </JoinNowButton>
          </div>
          <CreatorsCount>640 Creators have joined so far</CreatorsCount>
          <Heads />
        </>
      )}
      <Description>
        The Good Party is a non-profit project with a simple plan to use
        open-source technology to take back democracy from big-money donors and
        crooked career politicians.
        <br />
        <br />
        We’re calling on creators of the world to help us create the technology,
        messaging, visuals, audio, and stories that can reach and inspire
        millions of people.
        <br />
        <br />
        We’re also building the tools needed to disrupt the two-party system,
        and get good indie/grass-roots candidates elected so that we can change
        politics for Good.
        <br />
        <br />
        Help with any project you can from the list below or add your own. All
        projects are open-source and free for good.
      </Description>
    </SectionWrapper>
  );
}

UniteSection.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleJoin: PropTypes.func,
};

export default UniteSection;
