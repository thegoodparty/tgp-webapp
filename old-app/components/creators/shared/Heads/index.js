/**
 *
 * Heads
 *
 */

import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SampleAvatarImg1 from 'images/avatars/ellipse_1.png';
import SampleAvatarImg2 from 'images/avatars/ellipse_5.png';
import SampleAvatarImg3 from 'images/avatars/ellipse_8.png';
import SampleAvatarImg4 from 'images/avatars/ellipse_7.png';
import SampleAvatarImg5 from 'images/avatars/ellipse_2.png';
import SampleAvatarImg6 from 'images/avatars/ellipse_6.png';
import SampleAvatarImg7 from 'images/avatars/ellipse_4.png';
import SampleAvatarImg8 from 'images/avatars/ellipse_3.png';
import SampleAvatarImg9 from 'images/avatars/ellipse_9.png';
import SampleAvatarImg10 from 'images/avatars/ellipse_10.png';
import SampleAvatarImg11 from 'images/avatars/ellipse_11.png';

const AvatarsWrapper = styled.div`
  display: flex;
  max-width: 20rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-top: 4rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const Avatar = styled(LazyLoadImage)`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    width: 24px;
    height: 24px;
    margin-right: 0.7rem;
  }
`;

function Heads() {
  return (
    <AvatarsWrapper>
      <Avatar src={SampleAvatarImg1} alt="avatar" />
      <Avatar src={SampleAvatarImg2} alt="avatar" />
      <Avatar src={SampleAvatarImg3} alt="avatar" />
      <Avatar src={SampleAvatarImg4} alt="avatar" />
      <Avatar src={SampleAvatarImg5} alt="avatar" />
      <Avatar src={SampleAvatarImg6} alt="avatar" />
      <Avatar src={SampleAvatarImg7} alt="avatar" />
      <Avatar src={SampleAvatarImg8} alt="avatar" />
      <Avatar src={SampleAvatarImg9} alt="avatar" />
      <Avatar src={SampleAvatarImg10} alt="avatar" />
      <Avatar src={SampleAvatarImg11} alt="avatar" />
    </AvatarsWrapper>
  );
}

Heads.propTypes = {};

export default Heads;
