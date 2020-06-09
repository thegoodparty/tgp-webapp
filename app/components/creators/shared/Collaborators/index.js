/**
 *
 * Collaborators
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SampleAvatarImg1 from 'images/avatars/ellipse_1.png';
import SampleAvatarImg2 from 'images/avatars/ellipse_2.png';
import SampleAvatarImg3 from 'images/avatars/ellipse_3.png';

import { Hidden } from '@material-ui/core';

const CollaboratorWrapper = styled.div`
  margin-right: -10px;
  &:hover {
    z-index: 2;
  }
`;
const Collaborator = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid white;
  border-radius: 20px;
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
      theme.creators.breakpoints.creatorsMobile}) {
    font-size: 13px;
    line-height: 20px;
  }
`;

function Collaborators({ project }) {
  const collaborators = [project.creatorPhoto];
  return (
    <>
      {collaborators.map((collaborator, index) => (
        <CollaboratorWrapper key={index}>
          <Collaborator src={collaborator} alt="collaborator img" />
        </CollaboratorWrapper>
      ))}
      <CollaboratorsCount>
        <span>{project.creatorName}</span>{' '}
        {/* <Hidden smUp>
          <br />
        </Hidden>
        and <span>12 others</span> */}
      </CollaboratorsCount>
    </>
  );
}

Collaborators.propTypes = { project: PropTypes.object };

export default Collaborators;
