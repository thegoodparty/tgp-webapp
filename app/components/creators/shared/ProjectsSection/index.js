/**
 *
 * ProjectsSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExpandList from 'images/icons/expand.svg';
import { ProjectButton } from '../buttons';
import { ListProject } from '../modals';
import Project from '../Project';

const SectionWrapper = styled.div`
  padding: 6rem 8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    padding: 4rem 4.5rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 2.5rem 1rem;
  }
`;
const SectionHeader = styled.div`
  margin-bottom: 3rem;
  align-items: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    padding: 0 1rem;
  }
`;
const Title = styled.h2`
  font: normal 800 64px normal;
  font-family: unset;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    font-size: 32px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    margin-bottom: 1.5rem;
  }
`;

const TitleButtonIcon = styled.img`
  margin-right: 0.5rem;
`;
const SectionHeaderActions = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpoints.contentMax}) {
    display: flex;
    align-items: center;
  }
`;

function ProjectsSection({ projects }) {
  const [listProject, setListProject] = useState(false);
  return (
    <SectionWrapper>
      <SectionHeader>
        <Title>Projects</Title>
        <SectionHeaderActions>
          <ProjectButton
            variant="contained"
            onClick={() => setListProject(true)}
          >
            <TitleButtonIcon src={ExpandList} alt="expandlist icon" /> List your
            project
          </ProjectButton>
          <ListProject
            open={listProject}
            handleClose={() => setListProject(false)}
          />
        </SectionHeaderActions>
      </SectionHeader>
      {projects.map(project => (
        <Project project={project} key={project.id} />
      ))}
      <Project showMore />
    </SectionWrapper>
  );
}

ProjectsSection.propTypes = { projects: PropTypes.array };

export default ProjectsSection;
