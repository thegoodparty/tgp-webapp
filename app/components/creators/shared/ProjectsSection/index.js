/**
 *
 * ProjectsSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Mail from '@material-ui/icons/Mail';
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
      theme.creators.breakpoints.creatorsTablet}) {
    padding: 4rem 4.5rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    padding: 2.5rem 1rem;
  }
`;
const SectionHeader = styled.div`
  margin-bottom: 3rem;
  align-items: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
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
      theme.creators.breakpoints.creatorsTablet}) {
    font-size: 27px;
    margin-bottom: 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    margin-bottom: 1.5rem;
  }
`;

const SectionHeaderActions = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsMobile}) {
    display: flex;
    align-items: center;
  }
`;

function ProjectsSection({ projects, user, toggleJoin }) {
  const [listProject, setListProject] = useState(false);
  const [limit, setLimit] = useState(6);
  return (
    <SectionWrapper>
      <SectionHeader>
        <Title>Projects</Title>
        <SectionHeaderActions>
          <a
            href="https://docs.google.com/forms/d/1sFLfwwoTGOOLKXUSytTCiN3WsVAx0zRSCktUVcYEbGQ/viewform?edit_requested=true"
            target="_blank"
          >
            <ProjectButton variant="contained">
              <Mail style={{ marginRight: '0.5rem' }} /> Suggest a Project
            </ProjectButton>
            <ListProject
              open={listProject}
              handleClose={() => setListProject(false)}
            />
          </a>
        </SectionHeaderActions>
      </SectionHeader>
      {projects.slice(0, limit).map(project => (
        <Project
          project={project}
          key={project.id}
          user={user}
          toggleJoin={toggleJoin}
        />
      ))}
      {projects && limit < projects.length && (
        <Project showMore clickShowMore={() => setLimit(limit + 6)} />
      )}
    </SectionWrapper>
  );
}

ProjectsSection.propTypes = { 
  projects: PropTypes.array,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleJoin: PropTypes.func
};

export default ProjectsSection;
