/**
 *
 * Heads
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarsWrapper = styled.div`
  display: flex;
  max-width: 22rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 0 1.5rem;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    width: 24px;
    height: 24px;
    margin-right: 0.7rem;
  }
`;

function Heads() {
  return (
    <AvatarsWrapper>
      <Avatar src={require('images/avatars/Ellipse 1-13.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-1.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-2.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-3.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-4.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-5.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-6.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-7.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-8.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-9.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-10.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-11.png')} alt="avatar" />
      <Avatar src={require('images/avatars/Ellipse 1-12.png')} alt="avatar" />
    </AvatarsWrapper>
  );
}

Heads.propTypes = {};

export default Heads;
