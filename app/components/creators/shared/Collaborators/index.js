/**
 *
 * Collaborators
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SampleAvatarImg1 from 'images/avatars/Ellipse 1-1.png';
import SampleAvatarImg2 from 'images/avatars/Ellipse 1-2.png';
import SampleAvatarImg3 from 'images/avatars/Ellipse 1-3.png';

import { Hidden } from '@material-ui/core';

const CollaboratorWrapper = styled.div`
  margin-right: -10px;
  cursor: pointer;
  &:hover {
    z-index: 2;
  }
`;
const Collaborator = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const CollaboratorsCount = styled.span`
  color: ${({ theme }) => theme.creators.colors.lightGray};
  font: normal bold 16px/42px normal;
  font-family: unset;
  margin-left: 2rem;
  text-align: left;
  & > span {
    color: black;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    font-size: 13px;
    line-height: 20px;
  }
`;

function Collaborators({ project }) {
  const collaborators = [SampleAvatarImg1, SampleAvatarImg2, SampleAvatarImg3];
  return (
    <>
      {collaborators.map((collaborator, index) => (
        <CollaboratorWrapper key={index}>
          <Collaborator src={collaborator} alt="collaborator img" />
        </CollaboratorWrapper>
      ))}
      <CollaboratorsCount>
        <span>Kai Gradert</span>{' '}
        <Hidden smUp>
          <br />
        </Hidden>
        and <span>12 others</span>
      </CollaboratorsCount>
    </>
  );
}

Collaborators.propTypes = { project: PropTypes.object };

export default Collaborators;
