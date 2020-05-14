/**
 *
 * Heads
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SampleAvatarImg from 'images/avatar.png';

const AvatarsWrapper = styled.div`
  display: flex;
  max-width: 22rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

function Heads() {
  return (
    <AvatarsWrapper>
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
      <Avatar src={SampleAvatarImg} alt="avatar" />
    </AvatarsWrapper>
  );
}

Heads.propTypes = {};

export default Heads;
