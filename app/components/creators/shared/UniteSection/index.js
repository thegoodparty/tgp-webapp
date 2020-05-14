/**
 *
 * UniteSection
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body } from '../typography';
import { JoinButton } from '../buttons';
import LogoCaps from 'images/logo.svg';
import SampleAvatarImg from 'images/avatar.png';
const SectionWrapper = styled.div`
  padding-bottom: 3rem;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    padding: 3rem 8rem 6rem;
  }
`;
const Audience = styled.p`
  text-align: center;
  margin: 3rem 0;
  color: ${({ theme }) => theme.colors.blue};
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font: normal bold 2rem normal;
  }
`;
const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  color: #000;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font: normal bold 4.5rem normal;
    margin: 0;
  }
`;
const Unite = styled.h2`
  text-transform: uppercase;
  text-align: center;
  color: #000;
  font: normal bold 10rem/10rem normal;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font: normal bold 19.5rem/18rem normal;
    margin: 0;
    margin-bottom: 4rem;
  }
`;
const Logo = styled.img`
  height: auto;
  cursor: pointer;
  margin: 0 1.5rem;
  top: -5px;
  position: relative;
`;

const CreatorsCount = styled.p`
  color: ${({ theme }) => theme.creators.colors.gray};
  font: normal 600 1.5rem normal;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 0;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;
const Description = styled.p`
  max-width: 45rem;
  margin: 0 auto;
  margin-top: 5rem;
  font: normal 500 1.6rem normal;
  color: ${({ theme }) => theme.creators.colors.gray};
`;

const AvatarsWrapper = styled.div`
  display: flex;
  max-width: 22rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;
function UniteSection() {
  return (
    <SectionWrapper>
      <Title>Creators of the World</Title>
      <Audience>
        Designers · Videographers · Podcasters · Writers <br /> Content
        Creators · Coders · Influencers · Makers
      </Audience>
      <Unite>Unite</Unite>
      <p class="text-center">
        <Body>
          Let's all build <Logo src={LogoCaps} alt="logo"/> the good party
        </Body>
      </p>
      <div class="text-center">
        <JoinButton>Join Now</JoinButton>
      </div>
      <CreatorsCount>640 Creators have joined so far</CreatorsCount>
      <AvatarsWrapper>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
        <Avatar src={SampleAvatarImg} alt="avatar"/>
      </AvatarsWrapper>
      <Description>
        The Good Party is a non-profit project with a simple plan to use good
        open-source tech to take back Democracy from big-money donors and
        crooked career politicians. We’re calling on Creators of the World to
        join us now to help create the free tech, messaging, visuals, audio, and
        stories that can organically reach and inspire millions of people. We’re
        also building the tools needed to disrupt the two-party system, and get
        good indie / grass-roots candidates elected so that we can change
        politics for Good!
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
