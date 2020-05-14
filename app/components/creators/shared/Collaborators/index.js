/**
 *
 * Collaborators
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SampleAvatarImg from 'images/avatar.png';

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
  font: normal bold 1.1rem/42px ${({ theme }) => theme.typography.fontFamily};
  margin-left: 2rem;
  & > span {
    color: black;
  }
`;

function Collaborators({ project }) {
  const collaborators = [SampleAvatarImg, SampleAvatarImg, SampleAvatarImg];
  return (
    <>
      {collaborators.map((collaborator, index) => (
        <CollaboratorWrapper>
          <Collaborator src={collaborator} key={index} alt="collaborator img" />
        </CollaboratorWrapper>
      ))}
      <CollaboratorsCount>
        <span>Kai Gradert</span> and <span>12 others</span>
      </CollaboratorsCount>
    </>
  );
}

Collaborators.propTypes = { project: PropTypes.object };

export default Collaborators;
