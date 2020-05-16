/**
 *
 * ProjectsSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchList from 'images/icons/search.svg';
import ExpandList from 'images/icons/expand.svg';

import { ProjectButton } from '../buttons';
import { ListProject } from '../modals';
import Project from '../Project';

const SectionWrapper = styled.div`
  padding: 6rem 8rem;
  background-color: ${({ theme }) => theme.colors.blue};
`;
const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  font: normal 800 4.5rem ${({ theme }) => theme.typography.fontFamily};
  color: #fff;
  text-transform: uppercase;
  margin: 0;
`;

const TitleButtonIcon = styled.img`
  margin-right: 0.5rem;
`;
const SectionHeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

function ProjectsSection({ projects }) {
  const [listProject, setListProject] = useState(false);
  return (
    <SectionWrapper>
      <SectionHeader>
        <Title>Projects</Title>
        <SectionHeaderActions>
          <ProjectButton variant="contained">
            <TitleButtonIcon src={SearchList} alt="search icon" /> Search
          </ProjectButton>
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
